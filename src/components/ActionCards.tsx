import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ActionCards = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="action-cards" className="py-16 md:py-24 overflow-hidden" style={{ backgroundColor: "#204F2D" }}>
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12"
        >
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-[0.95] tracking-tight mb-4 text-white flex items-center gap-4">
            <img src="/icons/takeaction.svg" alt="Take Action" className="w-16 h-16" />
            Want to Take Action?
          </h2>
          <p className="text-lg md:text-xl font-bold uppercase tracking-wider text-white">Here is what you can do:</p>
        </motion.div>

        {/* First Row - 3 Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Card 1: View stories */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-white border border-gray-200 p-6 hover:bg-gray-50 transition-colors duration-300 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <img src="/icons/viewstories.svg" alt="View stories" className="w-8 h-8" />
              <h3 className="headline-medium text-lg text-black">View stories</h3>
            </div>
            <p className="font-semibold text-black/80 mb-6 text-sm flex-grow">
              Explore real stories shared by people who have accessed public mental health institutions in Maharashtra. Learn from their experiences and understand what to expect.
            </p>
            <button onClick={() => scrollToSection("map")} className="cta-primary text-sm w-full bg-pink-500 text-white hover:bg-pink-600 mt-auto">
              View Stories
            </button>
          </motion.div>

          {/* Card 2: Tell your story */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-white border border-gray-200 p-6 hover:bg-gray-50 transition-colors duration-300 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <img src="/icons/shareyourstory.svg" alt="Share Your Story" className="w-8 h-8" />
              <h3 className="headline-medium text-lg text-black">Share your story</h3>
            </div>
            <p className="font-semibold text-black/80 mb-6 text-sm flex-grow">
              Use our living map of Maharashtra to document your experience accessing a public mental health institution across the state, so that others know what to expect.
            </p>
            <button onClick={() => scrollToSection("narrative-form")} className="cta-primary text-sm w-full bg-pink-500 text-white hover:bg-pink-600 mt-auto">
              Share Your Story
            </button>
          </motion.div>

          {/* Card 3: White paper */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-white border border-gray-200 p-6 hover:bg-gray-50 transition-colors duration-300 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <img src="/icons/whitepaper.svg" alt="White Paper" className="w-8 h-8" />
              <h3 className="headline-medium text-lg text-black">White paper</h3>
            </div>
            <p className="font-semibold text-black/80 mb-6 text-sm flex-grow">
              Read our comprehensive white paper mapping and analyzing evidence on quality status, access to rights, and gender-sensitivity within public mental healthcare infrastructure across Maharashtra.
            </p>
            <a href="/White_Paper_CareNotCustody_OFC.pdf" target="_blank" rel="noopener noreferrer" className="cta-primary text-sm w-full bg-pink-500 text-white hover:bg-pink-600 text-center block mt-auto">
              View White Paper
            </a>
          </motion.div>
        </div>

        {/* Second Row - 2 Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Card 4: Know your rights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-white border border-gray-200 p-6 hover:bg-gray-50 transition-colors duration-300 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <img src="/icons/knowyourrights.svg" alt="Know Your Rights" className="w-8 h-8" />
              <h3 className="headline-medium text-lg text-black">Know your rights</h3>
            </div>
            <p className="font-semibold text-black/80 mb-6 text-sm flex-grow">
              Use our patients' rights education resources to learn about your rights and responsibility as a patient or caregiver, as well as a human rights defender working with those accessing Maharashtra's public mental healthcare system.
            </p>
            <button className="cta-secondary text-sm w-full text-black border-black hover:bg-black hover:text-white mt-auto">
              Coming Soon
            </button>
          </motion.div>

          {/* Card 5: Watch documentary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-white border border-gray-200 p-6 hover:bg-gray-50 transition-colors duration-300 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <img src="/icons/documentary.svg" alt="Watch documentary" className="w-8 h-8" />
              <h3 className="headline-medium text-lg text-black">Watch documentary</h3>
            </div>
            <p className="font-semibold text-black/80 mb-6 text-sm flex-grow">
              This documentary explores real life experiences of mental health service users, their caregivers and loved ones to understand experiences of accessing public mental health institutions in Maharashtra.
            </p>
            <button className="cta-secondary text-sm w-full text-black border-black hover:bg-black hover:text-white mt-auto">
              Coming Soon
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ActionCards;
