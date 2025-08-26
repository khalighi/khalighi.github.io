const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
 

class Circles {
    constructor(max_radius, num_circles, width, height) {
        this.circles = []
        for (let i = 0; i < num_circles; i++) {
            this.circles.push(
                {
                    x: Math.floor(Math.random() * width), 
                    y: Math.floor(Math.random() * height), 
                    radius: Math.floor(Math.random() * max_radius),
                    color: this.#getRandomRGBColor()
                }
            )
        }
    }
    #getRandomRGBColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }
    #drawCircle(circle_, ctx_) {
        ctx_.beginPath();
        ctx_.arc(circle_.x, circle_.y, circle_.radius, 0, Math.PI * 2); // Draw circle
        ctx_.fillStyle = circle_.color;
        ctx_.fill();
        ctx_.closePath();
    }
    draw(ctx_) {
        this.circles.forEach( (circle) => {
            this.#drawCircle(circle, ctx_)
        })
    }
}

let circles = null

function resizeCanvas() {
    // Match the canvas internal resolution to the viewport size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (!circles) {
        circles = new Circles(20, 200, canvas.width * 2, canvas.height * 2);
    }
    circles.draw(ctx)
}

// Set initial size and listen for window resize events
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
