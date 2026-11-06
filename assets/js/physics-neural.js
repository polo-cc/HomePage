/**
 * DrToB Systems — 60 FPS Interactive Neural Physics Mesh
 * Features:
 * - Fluid cursor repulsion
 * - Global window-level shockwave clicks (fires anywhere on the screen)
 * - Pipeline Gravitational Implosion Hook (particles converge when executing)
 */

class NeuralMesh {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.particles = [];
    this.numParticles = 52;
    this.maxDistance = 145;
    this.mouse = { x: -1000, y: -1000, radius: 190 };
    this.shockwaves = [];
    this.isConverging = false;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Generate agent nodes
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.75,
        vy: (Math.random() - 0.5) * 0.75,
        radius: Math.random() * 2 + 2,
        color: Math.random() > 0.85 ? '#FF5500' : (Math.random() > 0.7 ? '#D4FF00' : '#B8B2A8')
      });
    }

    // Global Pointer Tracking (smooth fluid repulsion)
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY + window.scrollY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });

    // GLOBAL Click Listener: Fires shockwave anywhere on screen (unless clicking a form control)
    window.addEventListener('click', (e) => {
      // Don't trigger shockwave if user is interacting with form controls or terminal buttons
      if (e.target.closest('input, textarea, select, button, .modal-card, .cli-btn')) {
        return;
      }

      const x = e.clientX;
      const y = e.clientY + window.scrollY;
      if (y < this.height) {
        this.triggerShockwave(x, y);

        if (window.playHapticBlip) {
          window.playHapticBlip(580, 0.08);
        }
      }
    });

    // Expose pipeline convergence hook globally
    window.triggerParticleImplosion = () => this.convergeToCenter();

    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = Math.max(980, window.innerHeight);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  triggerShockwave(x, y) {
    this.shockwaves.push({ x, y, radius: 10, maxRadius: 280, alpha: 0.9 });

    this.particles.forEach(p => {
      const dx = p.x - x;
      const dy = p.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200 && dist > 0) {
        const force = (200 - dist) / 10;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }
    });
  }

  convergeToCenter() {
    const targetX = this.width / 2;
    const targetY = 560;

    this.particles.forEach(p => {
      const dx = targetX - p.x;
      const dy = targetY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 0) {
        p.vx += (dx / dist) * 4.5;
        p.vy += (dy / dist) * 4.5;
      }
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw Shockwave Ripples
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const sw = this.shockwaves[i];
      sw.radius += 8;
      sw.alpha -= 0.024;

      this.ctx.beginPath();
      this.ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(255, 85, 0, ${Math.max(0, sw.alpha)})`;
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
        this.shockwaves.splice(i, 1);
      }
    }

    // 2. Connect Edges Between Nodes
    for (let a = 0; a < this.particles.length; a++) {
      for (let b = a + 1; b < this.particles.length; b++) {
        const dx = this.particles[a].x - this.particles[b].x;
        const dy = this.particles[a].y - this.particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.maxDistance) {
          const alpha = (1 - dist / this.maxDistance) * 0.2;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[a].x, this.particles[a].y);
          this.ctx.lineTo(this.particles[b].x, this.particles[b].y);
          this.ctx.strokeStyle = `rgba(255, 140, 50, ${alpha})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    }

    // 3. Update & Draw Nodes
    this.particles.forEach(p => {
      // Fluid repulsion from cursor
      const mdx = this.mouse.x - p.x;
      const mdy = this.mouse.y - p.y;
      const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

      if (mDist < this.mouse.radius && mDist > 0) {
        const forceDirectionX = mdx / mDist;
        const forceDirectionY = mdy / mDist;
        const force = (this.mouse.radius - mDist) / this.mouse.radius;
        p.vx -= forceDirectionX * force * 1.6;
        p.vy -= forceDirectionY * force * 1.6;
      }

      // Air resistance
      p.vx *= 0.95;
      p.vy *= 0.95;

      p.x += p.vx + 0.12;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = p.color === '#FF5500' ? 8 : 0;
      this.ctx.shadowColor = '#FF5500';
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    });

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new NeuralMesh('neural-canvas');
});
