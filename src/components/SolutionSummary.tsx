import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const SolutionSummary = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="solution-summary" className="py-24 md:py-32 overflow-hidden" style={{ backgroundColor: "#EC4899" }}>
      <div className="container mx-auto px-6 md:px-12">
        {/* About Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <img src="/icons/ourinitiative.svg" alt="Our Initiative" className="w-14 h-14" />
            <p className="inline-block text-2xl md:text-3xl font-bold uppercase tracking-wider text-white bg-[#02A9EA] px-4 py-2">
              Our Initiative
            </p>
          </div>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold uppercase leading-[0.95] tracking-tight max-w-5xl mb-4 text-white">
            Care not Custody
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed font-semibold mb-6">
            <span className="text-2xl mr-2">→</span>
            Care Not Custody is an advocacy campaign by One Future Collective responding to ongoing rights violations 
            within Maharashtra's public mental healthcare system. The campaign provides accessible patients' rights 
            education to reduce the risk of exploitation and builds comprehensive, community-generated evidence to 
            document the impact of these violations; equipping patients, caregivers, and human rights advocates with 
            the information needed to demand accountability and systemic reform.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSummary;
