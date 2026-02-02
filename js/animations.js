/* animations.js - Background effects */

document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
});

let roseInterval;
let heartInterval;

function initAnimations() {
    startRoses();
    startFloatingHearts();

    // Simple parallax effect for gallery
    document.addEventListener('mousemove', (e) => {
        const frames = document.querySelectorAll('.photo-frame');
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;

        frames.forEach((frame, index) => {
            const speed = (index + 1) * 0.5;
            // Apply slight transition to avoid jitter
            frame.style.transform = `rotate(${(index === 1 ? 2 : index === 2 ? -4 : -3)}deg) translate(${x * speed}px, ${y * speed}px)`;
        });
    });
}

// --- ROSES ---

function startRoses() {
    const container = document.getElementById('roses-container');

    // Create a new rose every 800ms (slower start)
    roseInterval = setInterval(() => {
        createRose(container);
    }, 800);
}

function createRose(container) {
    const rose = document.createElement('div');
    rose.classList.add('rose');
    rose.innerHTML = '🌹';

    // Random position and size
    rose.style.left = Math.random() * 100 + 'vw';

    const size = Math.random() * 1.5 + 0.8;
    rose.style.fontSize = (24 * size) + 'px';
    rose.style.opacity = Math.random() * 0.5 + 0.5;

    // Random duration
    const duration = Math.random() * 5 + 4; // 4-9s
    rose.style.animationDuration = duration + 's';

    container.appendChild(rose);

    // Remove after animation
    setTimeout(() => {
        rose.remove();
    }, duration * 1000);
}

function intensifyRoses() {
    const container = document.getElementById('roses-container');

    // Speed up creation
    clearInterval(roseInterval);
    roseInterval = setInterval(() => {
        createRose(container);
    }, 200); // 4x faster
}

// --- FLOATING HEARTS (BACKGROUND) ---

function startFloatingHearts() {
    const container = document.getElementById('hearts-background');

    heartInterval = setInterval(() => {
        createFloatingHeart(container);
    }, 10000);
}

function createFloatingHeart(container) {
    const heart = document.createElement('div');
    heart.innerHTML = Math.random() > 0.5 ? '❤️' : '💖';

    // Style directly here for randomness
    heart.style.position = 'absolute';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.bottom = '-50px';
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    heart.style.opacity = Math.random() * 0.3 + 0.1; // Subtle
    heart.style.zIndex = '0';
    heart.style.pointerEvents = 'none';

    const duration = Math.random() * 10 + 10; // Slow float 10-20s
    heart.style.transition = `bottom ${duration}s linear, opacity ${duration}s ease-in`;

    container.appendChild(heart);

    // Trigger animation
    requestAnimationFrame(() => {
        heart.style.bottom = '110vh';
        heart.style.opacity = '0';
    });

    // Cleanup
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}
