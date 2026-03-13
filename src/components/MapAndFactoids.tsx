import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { USHAHIDI_BASE_URL } from "@/config/ushahidi";
import { useCountUp } from "@/hooks/useCountUp";

interface FactoidData {
  number: string;
  label: string;
  detail: string;
  countValue: number;
  suffix: string;
  isCountUp: boolean;
}

const factoids: FactoidData[] = [
  {
    number: "150M+",
    label: "People in India affected by mental health conditions",
    detail: "Yet less than 1% receive adequate care.",
    countValue: 150,
    suffix: "M+",
    isCountUp: true,
  },
  {
    number: "43",
    label: "Government-run mental health institutions",
    detail: "Many lacking basic infrastructure and accountability mechanisms.",
    countValue: 43,
    suffix: "",
    isCountUp: true,
  },
  {
    number: "0",
    label: "National frameworks for patient narrative documentation",
    detail: "This campaign is building what the system refuses to create.",
    countValue: 0,
    suffix: "",
    isCountUp: false,
  },
];

const AnimatedNumber = ({ fact, inView }: { fact: FactoidData; inView: boolean }) => {
  const animatedValue = useCountUp({
    end: fact.countValue,
    duration: 2000,
    suffix: fact.suffix,
    enabled: inView && fact.isCountUp,
  });

  return <>{fact.isCountUp && inView ? animatedValue : fact.number}</>;
};

export const MapSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      id="map-section"
      className="py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "#3b3c40" }}
    >
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12"
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold uppercase leading-[0.95] tracking-tight mb-6 text-white text-center">
            <span className="flex items-center justify-center gap-4">
              <img src="/icons/livingmap.svg" alt="Living Map" className="w-20 h-20 -mt-4 self-start" />
              LIVING MAP OF<br className="md:hidden" /> MAHARASHTRA
            </span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed font-semibold max-w-2xl text-center mx-auto">
            Explore submitted narratives and patterns across regions. See where stories are coming from and identify areas needing attention.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-white/5 border-2 border-white/20 p-2"
        >
          <div className="bg-white/5 p-4 mb-2">
            <h3 className="headline-medium text-lg mb-2 text-white">
              Live Data Map
            </h3>
            <p className="body-regular text-sm text-white/70">
              Explore submitted narratives and patterns across regions
            </p>
          </div>
          <iframe
            src={`${USHAHIDI_BASE_URL}/views/map`}
            width="100%"
            height="600"
            frameBorder="0"
            allowFullScreen
            title="Ushahidi Data Map"
            className="w-full"
            sandbox="allow-same-origin allow-scripts allow-popups"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center text-lg md:text-xl text-white/60 mt-8"
        >
          Data updates in real-time as new submissions are received
        </motion.p>
      </div>
    </section>
  );
};

const FactoidsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.15 });

  return (
    <section ref={ref} className="section-teal py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {factoids.map((fact, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-center md:text-left"
            >
              <p 
                className="font-bold bg-secondary text-secondary-foreground px-3 py-1 leading-none mb-4"
                style={{ 
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: "clamp(3rem, 6vw, 5rem)" 
                }}
              >
                <AnimatedNumber fact={fact} inView={inView} />
              </p>
              <p 
                className="text-lg md:text-xl font-semibold uppercase tracking-wide mb-3"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                {fact.label}
              </p>
              <p className="body-regular opacity-60">
                {fact.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MapAndFactoids = () => {
  return (
    <>
      <MapSection />
    </>
  );
};

export default MapAndFactoids;
