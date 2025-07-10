document.addEventListener("DOMContentLoaded", function() {
        const canvas = document.getElementById('fairy-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: window.innerWidth, y: window.innerHeight };

    function resizeCanvas() {
        // Utilise la taille réelle du document, pas seulement la fenêtre visible
        const width = Math.max(
            document.documentElement.scrollWidth,
            document.body.scrollWidth,
            document.documentElement.clientWidth,
            window.innerWidth
        );
        const height = Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight,
            document.documentElement.clientHeight,
            window.innerHeight
        );
        canvas.width = width;
        canvas.height = height;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    document.addEventListener('mousemove', e => {
        // Calcule la position relative au canvas, même si le canvas est redimensionné
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (canvas.height / rect.height);
        mouse.x = x;
        mouse.y = y;
        for (let i = 0; i < 2; i++) {
            particles.push({
                x: x,
                y: y,
                vx: (Math.random()-0.5)*0.8,
                vy: (Math.random()-0.5)*0.8,
                alpha: 1,
                size: 4 + Math.random()*3,
                hue: 170 + Math.random()*40
            });
        }
    });

    function drawParticles() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for (let i = particles.length-1; i >= 0; i--) {
            let p = particles[i];
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, 2*Math.PI);
            ctx.fillStyle = `hsl(${p.hue}, 90%, 70%)`;
            ctx.shadowColor = `hsl(${p.hue}, 100%, 80%)`;
            ctx.shadowBlur = 16;
            ctx.fill();
            ctx.restore();

            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.001;
            p.size *= 0.99;
            if (p.alpha <= 0.02 || p.size < 1) particles.splice(i,1);
        }
        requestAnimationFrame(drawParticles);
    }
    drawParticles();
});