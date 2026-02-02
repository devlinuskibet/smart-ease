/* confetti.js - Canvas-based confetti explosion with custom shapes */

const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let animationId;

// Resize canvas to full screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 10 + 5;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * -15 - 5; // Initial upward burst
        this.color = this.getRandomColor();
        this.gravity = 0.2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
        this.type = Math.random() > 0.7 ? 'heart' : 'rect'; // 30% hearts
    }

    getRandomColor() {
        const colors = ['#d32f2f', '#ff1744', '#f8bbd0', '#e5b3a8', '#FFD700', '#ffffff'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.speedY += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.size > 0.1) this.size -= 0.05; // Fade out slowly
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);

        ctx.fillStyle = this.color;

        if (this.type === 'heart') {
            // Draw Heart Shape
            ctx.beginPath();
            const topCurveHeight = this.size * 0.3;
            ctx.moveTo(0, topCurveHeight);
            ctx.bezierCurveTo(0, 0, -this.size / 2, 0, -this.size / 2, topCurveHeight);
            ctx.bezierCurveTo(-this.size / 2, this.size / 2, 0, this.size * 0.8, 0, this.size);
            ctx.bezierCurveTo(0, this.size * 0.8, this.size / 2, this.size / 2, this.size / 2, topCurveHeight);
            ctx.bezierCurveTo(this.size / 2, 0, 0, 0, 0, topCurveHeight);
            ctx.fill();
            ctx.closePath();
        } else {
            // Draw Rect
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        }

        ctx.restore();
    }
}

function fireConfetti() {
    // Burst from center-bottom or multiple places
    const centerX = canvas.width / 2;
    const centerY = canvas.height * 0.8;

    for (let i = 0; i < 300; i++) {
        particles.push(new Particle(centerX, centerY));
    }

    if (!animationId) {
        animateConfetti();
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // Remove small particles
        if (particle.size <= 0.1 || particle.y > canvas.height) {
            particles.splice(index, 1);
        }
    });

    if (particles.length > 0) {
        animationId = requestAnimationFrame(animateConfetti);
    } else {
        animationId = null;
    }
}
