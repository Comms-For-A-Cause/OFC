import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Download, ExternalLink, Play, Shield, MapPin } from "lucide-react";

const WantToTakeAction = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="want-to-take-action" className="py-24 md:py-32 overflow-hidden" style={{ backgroundColor: "#F0B83F" }}>
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12"
        >
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-[0.95] tracking-tight mb-4 text-black flex items-center gap-4">
            <img src="/icons/whitepaper.svg" alt="White Paper" className="w-20 h-20 -mt-4" />
            Read our white paper
          </h2>
        </motion.div>

        {/* White Paper Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid md:grid-cols-2 gap-12 items-center mb-16"
        >
          <div>
            <p className="body-large text-black font-bold mb-6">
              In our white paper, we map and analyze existing evidence (or gaps in evidence) to surface 
              trends in quality status, access to rights, and gender-sensitivity within public mental 
              healthcare infrastructure across Maharashtra.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="White-Paper.pdf" target="_blank" rel="noopener noreferrer" className="cta-primary gap-2 bg-white text-black hover:bg-white/90">
                <ExternalLink className="w-4 h-4" />
                View White Paper
              </a>
              <a href="White-Paper.pdf" download className="cta-secondary gap-2 text-black border-black hover:bg-black hover:text-white">
                <Download className="w-4 h-4" />
                Download PDF
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 60, rotate: 2 }}
            animate={inView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <a 
              href="White-Paper.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-muted aspect-[4/5] md:aspect-[3/4] relative group cursor-pointer transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden block"
            >
              <iframe
                src="White-Paper.pdf#page=1&view=FitH&toolbar=0&navpanes=0&scrollbar=0"
                className="w-full h-full border-0"
                title="OFC White Paper Preview"
              />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary opacity-80" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WantToTakeAction;
