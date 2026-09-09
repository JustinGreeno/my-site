// Shared global leaderboard for all games on this site.
// Backend: Firebase Firestore (modular SDK loaded via ESM dynamic import).
// Falls back to per-browser localStorage if config is missing or Firebase fails.
//
// The apiKey below is a public project identifier, not a credential. Every
// Firebase web app ships it in client JS. Access is governed by
// firestore.rules in this repo, which allow public reads and append-only
// creates in exactly the shape this file writes.

(function () {
  'use strict';

  // Firebase console > Project settings > Your apps > Web app > "Config"
  const FIREBASE_CONFIG = {
    apiKey:            "AIzaSyDLg6KUWWVa60-Mpc2fFCB8NF0J_Q1PQjs",
    authDomain:        "justingreenoscores.firebaseapp.com",
    projectId:         "justingreenoscores",
    storageBucket:     "justingreenoscores.firebasestorage.app",
    messagingSenderId: "831264375119",
    appId:             "1:831264375119:web:c1a77804531edee703453a",
    measurementId:     "G-M4KHM67FFB"
  };

  const SDK = '10.13.2';
  const APP_URL = 'https://www.gstatic.com/firebasejs/' + SDK + '/firebase-app.js';
  const FS_URL  = 'https://www.gstatic.com/firebasejs/' + SDK + '/firebase-firestore.js';

  const HAS_CONFIG = !!FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.apiKey !== 'REPLACE_ME';

  /* Whether Firestore is actually answering, as opposed to merely being
     configured. A present config proves nothing: the database may not exist
     yet, rules may reject, or the network may be down, and every one of those
     paths silently falls back to localStorage. Anything user facing that says
     "global" keys off this, so the page can never claim to be shared when it
     is not. */
  let isLive = false;
  function setMode(live) {
    if (live === isLive) return;
    isLive = live;
    try { document.documentElement.dataset.lbMode = live ? 'live' : 'local'; } catch (e) {}
  }
  try { document.documentElement.dataset.lbMode = 'local'; } catch (e) {}

  let ctxPromise = null;
  function getCtx() {
    if (!HAS_CONFIG) return Promise.resolve(null);
    if (ctxPromise) return ctxPromise;
    ctxPromise = (async () => {
      try {
        const appMod = await import(APP_URL);
        const fsMod  = await import(FS_URL);
        const app = appMod.initializeApp(FIREBASE_CONFIG);
        const db  = fsMod.getFirestore(app);
        return { db: db, fs: fsMod };
      } catch (err) {
        console.warn('Leaderboard: Firebase failed to load, using localStorage', err);
        return null;
      }
    })();
    return ctxPromise;
  }

  function cleanGame(game) {
    return String(game || '').toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 32);
  }
  function cleanName(name) {
    let n = String(name || '???').toUpperCase().replace(/[^A-Z0-9?]/g, '');
    if (n.length === 0) n = '???';
    return (n + '???').slice(0, 3);
  }
  function cleanScore(score) {
    const n = Math.floor(Number(score));
    if (!isFinite(n) || n < 0) return 0;
    return Math.min(n, 9999999);
  }

  function lkey(game) { return 'lb_' + game; }
  function topLocal(game, lim) {
    try {
      const list = JSON.parse(localStorage.getItem(lkey(game)) || '[]');
      return list.slice(0, lim);
    } catch (e) { return []; }
  }
  function submitLocal(game, name, score) {
    try {
      const list = topLocal(game, 200);
      list.push({ name: name, score: score });
      list.sort(function (a, b) { return b.score - a.score; });
      localStorage.setItem(lkey(game), JSON.stringify(list.slice(0, 100)));
    } catch (e) {}
  }

  // Local-mode pub/sub so submit() can refresh open lists in fallback mode.
  const localSubs = {};
  function notifyLocal(game) {
    const arr = localSubs[game];
    if (!arr) return;
    arr.slice().forEach(function (entry) {
      try { entry.cb(topLocal(game, entry.limit)); } catch (e) {}
    });
  }
  // Cross-tab refresh: another tab submitted a score, this tab repaints.
  window.addEventListener('storage', function (e) {
    if (!e.key || e.key.indexOf('lb_') !== 0) return;
    notifyLocal(e.key.slice(3));
  });

  async function submit(game, name, score) {
    const g = cleanGame(game);
    const n = cleanName(name);
    const s = cleanScore(score);
    if (!g || s <= 0) return false;

    const ctx = await getCtx();
    if (!ctx) {
      submitLocal(g, n, s);
      notifyLocal(g);
      return true;
    }
    try {
      const fs = ctx.fs;
      await fs.addDoc(fs.collection(ctx.db, 'leaderboard'), {
        game: g, name: n, score: s,
        createdAt: fs.serverTimestamp()
      });
      return true;
    } catch (err) {
      setMode(false);
      console.warn('Leaderboard: submit failed, saving locally', err);
      submitLocal(g, n, s);
      notifyLocal(g);
      return false;
    }
  }

  async function top(game, lim) {
    const g = cleanGame(game);
    const limit = Math.max(1, Math.min(50, Math.floor(lim || 10)));

    const ctx = await getCtx();
    if (!ctx) return topLocal(g, limit);
    try {
      const fs = ctx.fs;
      const q = fs.query(
        fs.collection(ctx.db, 'leaderboard'),
        fs.where('game', '==', g),
        fs.orderBy('score', 'desc'),
        fs.limit(limit)
      );
      const snap = await fs.getDocs(q);
      setMode(true);
      return snap.docs.map(function (d) {
        const data = d.data();
        return { name: data.name, score: data.score };
      });
    } catch (err) {
      setMode(false);
      console.warn('Leaderboard: top failed, reading locally', err);
      return topLocal(g, limit);
    }
  }

  function subscribe(game, onUpdate, lim) {
    const g = cleanGame(game);
    const limit = Math.max(1, Math.min(50, Math.floor(lim || 10)));

    let unsub = function () {};
    let cancelled = false;

    (async function () {
      const ctx = await getCtx();
      if (cancelled) return;
      if (!ctx) {
        const entry = { cb: onUpdate, limit: limit };
        if (!localSubs[g]) localSubs[g] = [];
        localSubs[g].push(entry);
        unsub = function () {
          const arr = localSubs[g];
          if (!arr) return;
          const i = arr.indexOf(entry);
          if (i >= 0) arr.splice(i, 1);
        };
        try { onUpdate(topLocal(g, limit)); } catch (e) {}
        return;
      }
      try {
        const fs = ctx.fs;
        const q = fs.query(
          fs.collection(ctx.db, 'leaderboard'),
          fs.where('game', '==', g),
          fs.orderBy('score', 'desc'),
          fs.limit(limit)
        );
        unsub = fs.onSnapshot(q,
          function (snap) {
            const rows = snap.docs.map(function (d) {
              const data = d.data();
              return { name: data.name, score: data.score };
            });
            setMode(true);
            try { onUpdate(rows); } catch (e) {}
          },
          function (err) {
            setMode(false);
            console.warn('Leaderboard: snapshot error, reading locally', err);
            try { onUpdate(topLocal(g, limit)); } catch (e) {}
          }
        );
      } catch (err) {
        setMode(false);
        console.warn('Leaderboard: subscribe failed, reading locally', err);
        try { onUpdate(topLocal(g, limit)); } catch (e) {}
      }
    })();

    return function () {
      cancelled = true;
      try { unsub(); } catch (e) {}
    };
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }
  function formatScore(s) {
    return Number(s || 0).toLocaleString('en-US');
  }

  function paintList(el, rows, statusEl, fmt) {
    if (!el) return;
    if (!rows || !rows.length) {
      el.innerHTML = '<li class="lb-empty">No scores yet. Be the first.</li>';
    } else {
      el.innerHTML = rows.map(function (r, i) {
        return '<li>' +
          '<span class="lb-rank">' + String(i + 1).padStart(2, '0') + '</span>' +
          '<span class="lb-name">' + escapeHtml(r.name || '???') + '</span>' +
          '<span class="lb-score">' + escapeHtml(fmt ? fmt(r.score) : formatScore(r.score)) + '</span>' +
          '</li>';
      }).join('');
    }
    if (statusEl) statusEl.textContent = isLive ? 'Live' : 'Local';
  }

  // Convenience: bind a leaderboard to a list element + game id.
  // Returns { isPB(score), submit(name, score), top(), unsubscribe() }.
  function bind(game, listEl, lim, statusEl, opts) {
    const limit = Math.max(1, Math.min(50, Math.floor(lim || 10)));
    /* Optional display formatter. A time-based board stores an inverted
       score so that bigger still means better, and hands back a clock here. */
    const fmt = opts && typeof opts.format === 'function' ? opts.format : null;
    let current = [];
    const unsub = subscribe(game, function (rows) {
      current = rows || [];
      paintList(listEl, current, statusEl, fmt);
    }, limit);

    if (statusEl) statusEl.textContent = isLive ? 'Live' : 'Local';

    return {
      isPB: function (score) {
        const s = cleanScore(score);
        if (s <= 0) return false;
        if (current.length < limit) return true;
        return s > (current[current.length - 1].score || 0);
      },
      submit: function (name, score) {
        return submit(game, name, score);
      },
      top: function () { return current.slice(); },
      unsubscribe: function () { unsub(); }
    };
  }

  window.LB = {
    submit: submit,
    top: top,
    subscribe: subscribe,
    bind: bind,
    cleanName: cleanName,
    hasConfig: HAS_CONFIG,
    isLive: function () { return isLive; }
  };
})();
