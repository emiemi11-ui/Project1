'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Stethoscope, Brain, Dumbbell, X, ArrowRight } from 'lucide-react';

const specialists = [
  { icon: Stethoscope, label: 'Doctor', color: 'text-signal', bg: 'bg-signal/10', border: 'border-signal/20' },
  { icon: Brain, label: 'Psychologist', color: 'text-violet', bg: 'bg-violet/10', border: 'border-violet/20' },
  { icon: Dumbbell, label: 'Trainer', color: 'text-amber', bg: 'bg-amber/10', border: 'border-amber/20' },
];

export default function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-200px' });
  const [transitioned, setTransitioned] = useState(false);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setTransitioned(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <section ref={ref} className="py-32 bg-ink2 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <span className="text-xs font-mono tracking-[4px] text-cyan uppercase">THE PROBLEM</span>
          <h2 className="font-syne text-4xl md:text-5xl font-bold text-white mt-4">
            Healthcare in Silos
          </h2>
        </motion.div>

        {/* Silo visualization */}
        <div className="relative h-[400px] flex items-center justify-center">
          {!transitioned ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="flex items-center gap-8 md:gap-16"
            >
              {specialists.map((spec, i) => (
                <div key={spec.label} className="flex items-center gap-4 md:gap-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: i * 0.2 }}
                    className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl ${spec.bg} border ${spec.border} flex flex-col items-center justify-center gap-2`}
                  >
                    <spec.icon className={`w-8 h-8 ${spec.color}`} />
                    <span className={`text-xs font-mono ${spec.color}`}>{spec.label}</span>
                  </motion.div>
                  {i < specialists.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.8 }}
                      className="flex items-center gap-2 text-red"
                    >
                      <X size={16} />
                      <span className="text-[10px] font-mono tracking-wider whitespace-nowrap">NO CONNECTION</span>
                      <X size={16} />
                    </motion.div>
                  )}
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center gap-8"
            >
              <div className="relative">
                {/* Center hub */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-cyan/20 to-signal/20 border border-cyan/30 flex flex-col items-center justify-center"
                >
                  <span className="font-syne font-bold text-cyan text-sm">VITANOVA</span>
                  <span className="text-[10px] font-mono text-ice3 mt-1">HUB</span>
                </motion.div>

                {/* Connected specialists */}
                {specialists.map((spec, i) => {
                  const angle = -90 + i * 120;
                  const rad = (angle * Math.PI) / 180;
                  const radius = 140;
                  const x = Math.cos(rad) * radius;
                  const y = Math.sin(rad) * radius;

                  return (
                    <motion.div
                      key={spec.label}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.15 }}
                      className={`absolute w-20 h-20 rounded-xl ${spec.bg} border ${spec.border} flex flex-col items-center justify-center gap-1`}
                      style={{
                        left: `calc(50% + ${x}px - 40px)`,
                        top: `calc(50% + ${y}px - 40px)`,
                      }}
                    >
                      <spec.icon className={`w-5 h-5 ${spec.color}`} />
                      <span className={`text-[9px] font-mono ${spec.color}`}>{spec.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>

        {/* Text transition */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center mt-12"
        >
          <div className="flex items-center justify-center gap-4">
            <span className={`font-syne text-xl md:text-2xl transition-all duration-700 ${
              transitioned ? 'line-through text-ice3/30' : 'text-ice3'
            }`}>
              A photograph, not a film.
            </span>
            {transitioned && (
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                <ArrowRight className="text-signal" size={20} />
                <span className="font-syne text-xl md:text-2xl text-signal font-bold">
                  A film, not a photograph.
                </span>
              </motion.span>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
