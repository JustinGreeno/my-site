// Shared global leaderboard for all games on this site.
// Backend: Firebase Firestore (modular SDK loaded via ESM dynamic import).
// Falls back to per-browser localStorage if config is missing or Firebase fails.

(function () {
  'use strict';

  // ── PASTE YOUR FIREBASE WEB APP CONFIG HERE ─────────────────
  // Firebase console > Project settings > Your apps > Web app > "Config"
  const FIREBASE_CONFIG = {
    apiKey:            "REPLACE_ME",
    authDomain:        "REPLACE_ME.firebaseapp.com",
    projectId:         "REPLACE_ME",
    storageBucket:     "REPLACE_ME.appspot.com",
    messagingSenderId: "REPLACE_ME",
    appId:             "REPLACE_ME"
  };
  // ────────────────────────────────────────────────────────────

  const SDK = '10.13.2';
  const APP_URL = 'https://www.gstatic.com/firebasejs/' + SDK + '/firebase-app.js';
  const FS_URL  = 'https://www.gstatic.com/firebasejs/' + SDK + '/firebase-firestore.js';

  const HAS_CONFIG = !!FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.apiKey !== 'REPLACE_ME';

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

  async function submit(game, name, score) {
    const g = cleanGame(game);
    const n = cleanName(name);
    const s = cleanScore(score);
    if (!g || s <= 0) return false;

    const ctx = await getCtx();
    if (!ctx) {
      submitLocal(g, n, s);
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
      console.warn('Leaderboard: submit failed, saving locally', err);
      submitLocal(g, n, s);
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
      return snap.docs.map(function (d) {
        const data = d.data();
        return { name: data.name, score: data.score };
      });
    } catch (err) {
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
            try { onUpdate(rows); } catch (e) {}
          },
          function (err) {
            console.warn('Leaderboard: snapshot error, reading locally', err);
            try { onUpdate(topLocal(g, limit)); } catch (e) {}
          }
        );
      } catch (err) {
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

  function paintList(el, rows, statusEl) {
    if (!el) return;
    if (!rows || !rows.length) {
      el.innerHTML = '<li class="lb-empty">No scores yet. Be the first.</li>';
    } else {
      el.innerHTML = rows.map(function (r, i) {
        return '<li>' +
          '<span class="lb-rank">' + String(i + 1).padStart(2, '0') + '</span>' +
          '<span class="lb-name">' + escapeHtml(r.name || '???') + '</span>' +
          '<span class="lb-score">' + formatScore(r.score) + '</span>' +
          '</li>';
      }).join('');
    }
    if (statusEl) statusEl.textContent = HAS_CONFIG ? 'Live' : 'Local';
  }

  // Convenience: bind a leaderboard to a list element + game id.
  // Returns { isPB(score), submit(name, score), top(), unsubscribe() }.
  function bind(game, listEl, lim, statusEl) {
    const limit = Math.max(1, Math.min(50, Math.floor(lim || 10)));
    let current = [];
    const unsub = subscribe(game, function (rows) {
      current = rows || [];
      paintList(listEl, current, statusEl);
    }, limit);

    if (statusEl) statusEl.textContent = HAS_CONFIG ? 'Live' : 'Local';

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
    hasConfig: HAS_CONFIG
  };
})();
