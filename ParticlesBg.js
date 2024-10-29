import React, { useEffect, useRef } from 'react';

const ParticlesBg = ({
  backgroundColors = 'linear-gradient(135deg, #3990e6 0%, #149f7c 100%)',
  density = 150,
  dotColor = '#666666',
  lineColor = '#666666',
  particleRadius = 7,
  lineWidth = 1,
  proximity = 150,
  maxSpeedX = 0.4,
  maxSpeedY = 0.4,
}) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationFrameId = useRef(null);
  const resizeTimeoutId = useRef(null);

  const options = {
    density,
    dotColor,
    lineColor,
    particleRadius,
    lineWidth,
    proximity,
    maxSpeedX,
    maxSpeedY,
  };

  const createParticles = (canvas) => {
    particles.current = [];
    for (let i = 0; i < options.density; i++) {
      particles.current.push(new Particle(canvas, options));
    }
  };

  const initCanvas = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Cancel any existing animation frame
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
      particle.update();
      particle.draw(ctx, particles.current, options);
    });
    
    animationFrameId.current = requestAnimationFrame(() => draw(ctx));
  };

  const handleResize = () => {
    // Clear the previous timeout
    if (resizeTimeoutId.current) {
      clearTimeout(resizeTimeoutId.current);
    }

    // Debounce resize event
    resizeTimeoutId.current = setTimeout(() => {
      initCanvas();
    }, 250); // Wait for 250ms after last resize event
  };

  useEffect(() => {
    initCanvas();
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (resizeTimeoutId.current) {
        clearTimeout(resizeTimeoutId.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        zIndex: -1, 
        background: backgroundColors 
      }} 
    />
  );
};

class Particle {
  constructor(canvas, options) {
    this.canvas = canvas;
    this.options = options;
    this.initializePosition();
  }

  initializePosition() {
    this.position = {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
    };
    this.speed = {
      x: (Math.random() * this.options.maxSpeedX) - (this.options.maxSpeedX / 2),
      y: (Math.random() * this.options.maxSpeedY) - (this.options.maxSpeedY / 2),
    };
  }

  update() {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // Bounce off edges
    if (this.position.x > this.canvas.width) {
      this.position.x = this.canvas.width;
      this.speed.x = -this.speed.x;
    } else if (this.position.x < 0) {
      this.position.x = 0;
      this.speed.x = -this.speed.x;
    }

    if (this.position.y > this.canvas.height) {
      this.position.y = this.canvas.height;
      this.speed.y = -this.speed.y;
    } else if (this.position.y < 0) {
      this.position.y = 0;
      this.speed.y = -this.speed.y;
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
      
      const distance = Math.sqrt(
        (this.position.x - other.position.x) ** 2 +
        (this.position.y - other.position.y) ** 2
      );

      if (distance < options.proximity) {
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(other.position.x, other.position.y);
        ctx.stroke();
      }
    }
  }
}

export default ParticlesBg;

/*
 * ParticlesBg
 * Author : Simo Hakim (me@simohakim.com)
 * -----------
 * This component creates an animated particle background using HTML5 Canvas.
 * It renders particles that move, bounce off canvas edges, and connect via lines when they are within a set proximity.
 * 
 * Component Props:
 * - backgroundColors (string): Sets the background color or gradient of the canvas.
 * - density (number): Controls the number of particles. Higher values increase the number of particles.
 * - dotColor (string): The color of each particle dot.
 * - lineColor (string): The color of the lines that connect particles within the proximity range.
 * - particleRadius (number): Radius of each particle dot.
 * - lineWidth (number): Width of lines connecting particles.
 * - proximity (number): Maximum distance between particles to form connecting lines.
 * - maxSpeedX (number): Maximum speed in the X direction for each particle.
 * - maxSpeedY (number): Maximum speed in the Y direction for each particle.
 * 
 * Usage:
 * - To use this component, render <ParticlesBg /> inside your React app.
 * - Adjust props as desired to control the appearance and behavior of the particle system.
 * 
 * This component is inspired by the "Particleground" library by Jonathan Nicol, 
 * with added customization and a React-oriented design.
 */
