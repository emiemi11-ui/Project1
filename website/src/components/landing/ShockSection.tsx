'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedNumber from '@/components/ui/AnimatedNumber';

interface ScenarioCardProps {
  number: string;
  numberValue?: number;
  numberSuffix?: string;
  numberColor: string;
  label: string;
  prepared?: { action: string; result: string; resultColor: string };
  unprepared: { action: string; result: string };
  quote: string;
  vitanovaLine: string;
  isSpine?: boolean;
}

function ScenarioCard({
  number, numberValue, numberSuffix, numberColor,
  label, prepared, unprepared, quote, vitanovaLine, isSpine,
}: ScenarioCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className={`relative rounded-2xl border overflow-hidden transition-all duration-1000 ${
        isSpine && inView
          ? 'bg-white border-gray-200 col-span-1 md:col-span-2'
          : 'bg-panel border-white/5 hover:border-red/20'
      }`}
    >
      <div className="p-8">
        {/* Big number */}
        <div className={`font-mono text-5xl font-bold mb-2 ${numberColor}`}>
          {numberValue ? (
            <AnimatedNumber value={numberValue} suffix={numberSuffix} duration={1500} />
          ) : (
            number
          )}
        </div>
        <div className={`text-sm font-mono mb-6 ${isSpine && inView ? 'text-gray-500' : 'text-ice3'}`}>
          {label}
        </div>

        {/* Split comparison */}
        {prepared && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-signal/5 border border-signal/10">
              <div className="text-xs font-mono text-signal mb-2 tracking-wider">PREPARED</div>
              <div className={`text-sm ${isSpine && inView ? 'text-gray-700' : 'text-ice2'}`}>{prepared.action}</div>
              <div className={`text-xs font-bold mt-2 ${prepared.resultColor}`}>{prepared.result}</div>
            </div>
            <div className="p-4 rounded-xl bg-red/5 border border-red/10">
              <div className="text-xs font-mono text-red mb-2 tracking-wider">UNPREPARED</div>
              <div className={`text-sm ${isSpine && inView ? 'text-gray-700' : 'text-ice2'}`}>{unprepared.action}</div>
              <div className="text-xs font-bold mt-2 text-red">{unprepared.result}</div>
            </div>
          </div>
        )}

        {!prepared && (
          <div className="mb-6">
            <div className="p-4 rounded-xl bg-red/5 border border-red/10">
              <div className="text-xs font-mono text-red mb-2 tracking-wider">UNPREPARED</div>
              <div className={`text-sm ${isSpine && inView ? 'text-gray-700' : 'text-ice2'}`}>{unprepared.action}</div>
              <div className="text-xs font-bold mt-2 text-red">{unprepared.result}</div>
            </div>
          </div>
        )}

        {/* Quote */}
        <div className={`italic text-sm mb-4 ${isSpine && inView ? 'text-gray-500' : 'text-ice3'}`}>
          &ldquo;{quote}&rdquo;
        </div>

        {/* VitaNova line */}
        <div className={`text-xs font-mono p-3 rounded-lg ${
          isSpine && inView
            ? 'bg-gray-100 text-gray-600'
            : 'bg-cyan/5 text-cyan/80 border border-cyan/10'
        }`}>
          {vitanovaLine}
        </div>

        {isSpine && inView && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 text-center"
          >
            <p className="text-2xl md:text-3xl font-syne font-bold text-ink leading-tight">
              Crezi ca atunci o sa poti?<br />
              <span className="text-red">Daca acum nu poti?</span>
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function ShockSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="relative py-32 md:py-40 bg-ink">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs font-mono tracking-[4px] text-red uppercase">THE REALITY</span>
          <h2 className="font-syne text-4xl md:text-6xl font-bold text-white mt-4">
            WHEN IT MATTERS
          </h2>
          <p className="text-ice3 mt-4 max-w-2xl text-lg">
            Real scenarios. Real consequences. The difference between readiness and catastrophe
            is measured in data nobody had.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScenarioCard
            number="4.2s"
            numberValue={4.2}
            numberSuffix="s"
            numberColor="text-red"
            label="M67 — time to detonation"
            prepared={{
              action: 'Sprint 15m, find cover',
              result: 'ALIVE',
              resultColor: 'text-signal',
            }}
            unprepared={{
              action: 'Sprint 6m, still in kill zone',
              result: 'KILLED IN ACTION',
            }}
            quote="Nu pot sa alerg din fata unei grenade. Ma doare splina."
            vitanovaLine="Readiness Score: 34/100. The app would have flagged HIGH RISK."
          />

          <ScenarioCard
            number="95kg"
            numberValue={95}
            numberSuffix="kg"
            numberColor="text-red"
            label="Weight of equipped partner"
            prepared={{
              action: '200m carry in 3 minutes',
              result: 'EXTRACTED',
              resultColor: 'text-signal',
            }}
            unprepared={{
              action: '30m then collapse',
              result: 'LEFT ON FIELD',
            }}
            quote="Nu pot sa-mi car partenerul ranit spre ajutor."
            vitanovaLine="He didn't die from the bullet. He died because of the 170 meters."
          />

          <ScenarioCard
            number="6m"
            numberValue={6}
            numberSuffix="m"
            numberColor="text-red"
            label="NATO vertical rope"
            prepared={{
              action: '18 seconds, fluid climb',
              result: 'COMPLETED',
              resultColor: 'text-signal',
            }}
            unprepared={{
              action: '2m up, then arms fail',
              result: 'FAILED',
            }}
            quote="Nu pot sa ma catar pe o franghie. Nu am forta in brate."
            vitanovaLine="ACWR was 1.85. The trainer had no data."
          />

          <ScenarioCard
            number="140kg"
            numberValue={140}
            numberSuffix="kg"
            numberColor="text-red"
            label="Attempted lift"
            unprepared={{
              action: 'L4-L5 vertebral fracture → Spinal cord compression → Paraplegia',
              result: 'PERMANENT DISABILITY',
            }}
            quote="O sa ma descurc. O sa pot atunci."
            vitanovaLine="His trainer didn't know he slept 3.5 hours. His doctor didn't know. Nobody told him not to lift. VitaNova would have."
            isSpine
          />
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <h3 className="font-syne text-3xl md:text-5xl font-bold text-white">
            The system failed. Not the person.
          </h3>
          <p className="text-ice3 mt-4 text-lg">
            VitaNova doesn&apos;t judge. It informs.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
