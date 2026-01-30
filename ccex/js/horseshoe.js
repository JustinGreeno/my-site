// Horseshoe Physics - Pendulum swing effect
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const horseshoes = document.querySelectorAll('.horseshoe');

        horseshoes.forEach(horseshoe => {
            let angle = 0;
            let velocity = 0;
            let isSwinging = false;
            let animationId = null;

            // Physics constants
            const gravity = 0.3;      // How fast it swings
            const damping = 0.98;     // Friction (closer to 1 = slower stop)
            const minVelocity = 0.01; // When to stop the animation

            function swing() {
                // Apply gravity (pendulum physics)
                velocity += -gravity * Math.sin(angle * Math.PI / 180);

                // Apply damping (friction)
                velocity *= damping;

                // Update angle
                angle += velocity;

                // Apply the rotation
                horseshoe.style.transform = `rotate(${angle}deg)`;

                // Continue animation if still moving
                if (Math.abs(velocity) > minVelocity || Math.abs(angle) > 0.5) {
                    animationId = requestAnimationFrame(swing);
                } else {
                    // Come to rest
                    angle = 0;
                    velocity = 0;
                    horseshoe.style.transform = 'rotate(0deg)';
                    isSwinging = false;
                    animationId = null;
                }
            }

            function bump(strength) {
                // Add velocity in a random direction or based on current state
                const direction = angle >= 0 ? -1 : 1;
                velocity += strength * direction;

                // Cap maximum velocity
                velocity = Math.max(-15, Math.min(15, velocity));

                // Start animation if not already running
                if (!isSwinging) {
                    isSwinging = true;
                    swing();
                }
            }

            // Bump on mouse enter
            horseshoe.addEventListener('mouseenter', function() {
                bump(3 + Math.random() * 2); // Random bump strength 3-5
            });

            // Bump on click for extra swing
            horseshoe.addEventListener('click', function() {
                bump(5 + Math.random() * 3); // Stronger bump 5-8
            });

            // Bump when mouse moves over it
            horseshoe.addEventListener('mousemove', function(e) {
                // Only bump occasionally during mousemove to avoid too much
                if (Math.random() < 0.1) {
                    bump(1 + Math.random());
                }
            });
        });
    });
})();
