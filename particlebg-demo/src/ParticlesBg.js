import React, { useEffect, useRef } from 'react';

const ParticlesBg = ({
  backgroundColors = 'linear-gradient(135deg, #3990e6 0%, #149f7c 100%)',
  density = 150,
  dotColor = '#5cbdaa',
  lineColor = '#5cbdaa',
  particleRadius = 3,
  lineWidth = 0.7,
  proximity = 150,
  minSpeed = 0.6,
  maxSpeed = 0.6,
  createOnClick = 0,
  repulse = 0,
}) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationFrameId = useRef(null);
  const resizeTimeoutId = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  
  const optionsRef = useRef({
    density,
    dotColor,
    lineColor,
    particleRadius,
    lineWidth,
    proximity,
    minSpeed,
    maxSpeed,
    createOnClick,
    repulse,
  });

  useEffect(() => {
    optionsRef.current = {
      density,
      dotColor,
      lineColor,
      particleRadius,
      lineWidth,
      proximity,
      minSpeed,
      maxSpeed,
      createOnClick,
      repulse,
    };
  }, [density, dotColor, lineColor, particleRadius, lineWidth, proximity, minSpeed, maxSpeed, createOnClick, repulse]);

  const createParticles = (canvas) => {
    particles.current = [];
    for (let i = 0; i < optionsRef.current.density; i++) {
      particles.current.push(new Particle(canvas, optionsRef.current));
    }
  };

  const createParticlesAtPoint = (x, y) => {
    if (!optionsRef.current.createOnClick || !canvasRef.current) return;
    
    for (let i = 0; i < optionsRef.current.createOnClick; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 50; // Create particles in a 50px radius
      const newX = x + radius * Math.cos(angle);
      const newY = y + radius * Math.sin(angle);
      
      particles.current.push(
        new Particle(canvasRef.current, optionsRef.current, newX, newY)
      );
    }
  };

  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mousePosition.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleClick = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    createParticlesAtPoint(x, y);
  };

  const initCanvas = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    createParticles(canvas);
    draw(ctx);
  };

  const draw = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    particles.current.forEach((particle) => {
      particle.update(mousePosition.current);
      particle.draw(ctx, particles.current, optionsRef.current);
    });
    
    animationFrameId.current = requestAnimationFrame(() => draw(ctx));
  };

  const handleResize = () => {
    if (resizeTimeoutId.current) {
      clearTimeout(resizeTimeoutId.current);
    }

    resizeTimeoutId.current = setTimeout(() => {
      initCanvas();
    }, 250);
  };

  useEffect(() => {
    initCanvas();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (resizeTimeoutId.current) {
        clearTimeout(resizeTimeoutId.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    initCanvas();
  }, [
    density,
    dotColor,
    lineColor,
    particleRadius,
    lineWidth,
    proximity,
    minSpeed,
    maxSpeed,
    createOnClick,
    repulse,
  ]);

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%',
      pointerEvents: 'none'
    }}>
      <canvas 
        ref={canvasRef} 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0,
          width: '100%',
          height: '100%',
          background: backgroundColors 
        }} 
      />
    </div>
  );
};

class Particle {
  constructor(canvas, options, x, y) {
    this.canvas = canvas;
    this.options = options;
    if (x !== undefined && y !== undefined) {
      this.position = { x, y };
      const speed = this.options.minSpeed + Math.random() * (this.options.maxSpeed - this.options.minSpeed);
      const angle = Math.random() * Math.PI * 2;
      this.speed = {
        x: Math.cos(angle) * speed * 2,
        y: Math.sin(angle) * speed * 2,
      };
    } else {
      this.initializePosition();
    }
  }

  initializePosition() {
    this.position = {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
    };
    const speed = this.options.minSpeed + Math.random() * (this.options.maxSpeed - this.options.minSpeed);
    const angle = Math.random() * Math.PI * 2;
    this.speed = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
    };
  }

  update(mousePos) {
    // Apply repulsion if enabled
    if (this.options.repulse > 0 && mousePos) {
      const dx = this.position.x - mousePos.x;
      const dy = this.position.y - mousePos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < this.options.repulse) {
        const force = (this.options.repulse - distance) / this.options.repulse;
        const angle = Math.atan2(dy, dx);
        
        this.speed.x += Math.cos(angle) * force * 5;
        this.speed.y += Math.sin(angle) * force * 5;
      }
    }

    // Check current speed and adjust if needed
    const currentSpeed = Math.sqrt(this.speed.x * this.speed.x + this.speed.y * this.speed.y);
    
    // Apply speed limits
    if (currentSpeed > this.options.maxSpeed) {
      const ratio = this.options.maxSpeed / currentSpeed;
      this.speed.x *= ratio;
      this.speed.y *= ratio;
    } else if (currentSpeed < this.options.minSpeed) {
      // Only apply minimum speed if particle is moving
      if (currentSpeed > 0.01) {
        const ratio = this.options.minSpeed / currentSpeed;
        this.speed.x *= ratio;
        this.speed.y *= ratio;
      }
    }

    // Update position
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // Apply friction
    this.speed.x *= 0.99;
    this.speed.y *= 0.99;

    // Handle wall collisions
    if (this.position.x > this.canvas.width) {
      this.position.x = this.canvas.width;
      this.speed.x = -Math.abs(this.speed.x); // Ensure proper bounce direction
    } else if (this.position.x < 0) {
      this.position.x = 0;
      this.speed.x = Math.abs(this.speed.x); // Ensure proper bounce direction
    }

    if (this.position.y > this.canvas.height) {
      this.position.y = this.canvas.height;
      this.speed.y = -Math.abs(this.speed.y); // Ensure proper bounce direction
    } else if (this.position.y < 0) {
      this.position.y = 0;
      this.speed.y = Math.abs(this.speed.y); // Ensure proper bounce direction
    }

    // After collision, ensure speed is within bounds
    const speedAfterCollision = Math.sqrt(this.speed.x * this.speed.x + this.speed.y * this.speed.y);
    if (speedAfterCollision > this.options.maxSpeed) {
      const ratio = this.options.maxSpeed / speedAfterCollision;
      this.speed.x *= ratio;
      this.speed.y *= ratio;
    }
  }

  draw(ctx, particles, options) {
    // Draw particle
    ctx.fillStyle = options.dotColor;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, options.particleRadius, 0, Math.PI * 2);
    ctx.fill();

    // Draw connections
    ctx.strokeStyle = options.lineColor;
    ctx.lineWidth = options.lineWidth;
    
    for (let i = 0; i < particles.length; i++) {
      const other = particles[i];
      if (other === this) continue;
      
      const dx = this.position.x - other.position.x;
      const dy = this.position.y - other.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < options.proximity) {
        // Adjust line opacity based on distance
        const opacity = 1 - (distance / options.proximity);
        ctx.globalAlpha = opacity;
        
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(other.position.x, other.position.y);
        ctx.stroke();
        
        ctx.globalAlpha = 1; // Reset opacity
      }
    }
  }
}

export default ParticlesBg;