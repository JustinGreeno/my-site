(function() {
    const pacman = document.getElementById('pacman');
    const gameBox = document.getElementById('gameBox');
    const speed = 3;
    let currentState = "stop"; // possible values: stop, up, down, left, right
    let dx = 0, dy = 0;
    let x = 0, y = 0;
    let animationFrameId = null;
  
    // Update visual highlight of active control
    function updateControlHighlight() {
      const controls = ["up", "down", "left", "right", "stop"];
      controls.forEach(direction => {
        const el = document.getElementById("key-" + direction);
        if (el) {
          el.classList.toggle("active", direction === currentState);
        }
      });
    }
  
    // Set movement direction and update image/rotation
    function setDirection(newDirection) {
      if (currentState === newDirection) return; // Avoid repeated key presses from speeding up animation
      currentState = newDirection;
      switch(newDirection) {
        case 'up':
          dx = 0;
          dy = -speed;
          pacman.src = "../images/pacman/pac-man-fast.gif";
          pacman.style.transform = "rotate(-90deg)";
          break;
        case 'down':
          dx = 0;
          dy = speed;
          pacman.src = "../images/pacman/pac-man-fast.gif";
          pacman.style.transform = "rotate(90deg)";
          break;
        case 'left':
          dx = -speed;
          dy = 0;
          pacman.src = "../images/pacman/pac-man-fast.gif";
          pacman.style.transform = "rotate(180deg)";
          break;
        case 'right':
          dx = speed;
          dy = 0;
          pacman.src = "../images/pacman/pac-man-fast.gif";
          pacman.style.transform = "rotate(0deg)";
          break;
        case 'stop':
        default:
          dx = 0;
          dy = 0;
          pacman.src = "../images/pacman/pac-man-static.gif";
          pacman.style.transform = "rotate(0deg)";
          break;
      }
      updateControlHighlight();
    }
  
    // Game loop: update Pac-Man's position and bounce off edges
    function gameLoop() {
      if (currentState !== "stop") {
        x += dx;
        y += dy;
        const boxWidth = gameBox.clientWidth;
        const boxHeight = gameBox.clientHeight;
        const pacWidth = pacman.offsetWidth;
        const pacHeight = pacman.offsetHeight;
  
        // Horizontal boundary check
        if (x < 0) {
          x = 0;
          dx = -dx;
          if (currentState === "left") setDirection("right");
        } else if (x + pacWidth > boxWidth) {
          x = boxWidth - pacWidth;
          dx = -dx;
          if (currentState === "right") setDirection("left");
        }
  
        // Vertical boundary check
        if (y < 0) {
          y = 0;
          dy = -dy;
          if (currentState === "up") setDirection("down");
        } else if (y + pacHeight > boxHeight) {
          y = boxHeight - pacHeight;
          dy = -dy;
          if (currentState === "down") setDirection("up");
        }
  
        pacman.style.left = x + "px";
        pacman.style.top = y + "px";
      }
      animationFrameId = requestAnimationFrame(gameLoop);
    }
  
    // Keyboard event listener for WASDX controls
    document.addEventListener('keydown', function(e) {
      switch(e.key.toLowerCase()) {
        case "w":
          setDirection("up");
          break;
        case "s":
          setDirection("down");
          break;
        case "a":
          setDirection("left");
          break;
        case "d":
          setDirection("right");
          break;
        case "x":
          setDirection("stop");
          break;
      }
    });
  
    // Initialize active control and start game loop
    updateControlHighlight();
    gameLoop();
  })();
  