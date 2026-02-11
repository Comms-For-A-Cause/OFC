import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const factoids = [
  {
    number: "150M+",
    label: "People in India affected by mental health conditions",
    detail: "Yet less than 1% receive adequate care.",
  },
  {
    number: "43",
    label: "Government-run mental health institutions",
    detail: "Many lacking basic infrastructure and accountability mechanisms.",
  },
  {
    number: "0",
    label: "National frameworks for patient narrative documentation",
    detail: "This campaign is building what the system refuses to create.",
  },
];

const Factoids = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section ref={ref} className="section-dark py-24 md:py-32 overflow-hidden">
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
              <p className="font-display font-extrabold bg-secondary text-secondary-foreground px-3 py-1 leading-none mb-4"
                 style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
              >
                {fact.number}
              </p>
              <p className="font-display text-lg md:text-xl font-bold uppercase tracking-wide mb-3">
                {fact.label}
              </p>
              <p className="body-regular opacity-50">
                {fact.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Factoids;
