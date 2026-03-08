'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import AnimatedNumber from '@/components/ui/AnimatedNumber';
import Link from 'next/link';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 229, 160, 0.3)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 229, 160, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#0D1220_0%,_#03050A_70%)]" />

      {/* Neural network canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Scan line */}
      <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-signal/30 to-transparent animate-scan z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-syne font-bold uppercase leading-[0.95]" style={{ fontSize: 'clamp(48px, 8vw, 120px)' }}>
            <span className="block text-white">MISSION</span>
            <span className="block text-outline">READINESS</span>
            <span className="block text-signal text-glow-green">QUANTIFIED</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-lg text-ice3 max-w-3xl mx-auto leading-relaxed font-dm"
        >
          The first integrated platform that transforms passive biometric data into actionable
          intelligence for military readiness, medical oversight, and human performance optimization.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#features">
            <Button variant="ghost" size="lg">EXPLORE PLATFORM</Button>
          </a>
          <Link href="/auth/register">
            <Button variant="fill" size="lg">REQUEST DEMO</Button>
          </Link>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="absolute bottom-12 left-0 right-0 z-20"
      >
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          <div className="text-center">
            <div className="font-mono text-3xl font-bold text-signal">
              <AnimatedNumber value={0} suffix="" />
            </div>
            <div className="text-xs text-ice3 mt-1 font-mono tracking-wider">MANUAL INPUTS</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-white/10" />
          <div className="text-center">
            <div className="font-mono text-3xl font-bold text-cyan">
              <AnimatedNumber value={0} prefix="$" />
            </div>
            <div className="text-xs text-ice3 mt-1 font-mono tracking-wider">DATA SHARED BETWEEN SPECIALISTS</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-white/10" />
          <div className="text-center">
            <div className="font-mono text-3xl font-bold text-violet">24/7</div>
            <div className="text-xs text-ice3 mt-1 font-mono tracking-wider">CONTINUOUS MONITORING</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
