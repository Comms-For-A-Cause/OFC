import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FileText, Download, ExternalLink } from "lucide-react";

const WhitePaper = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="white-paper" className="section-dark py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="form-label-campaign text-secondary mb-4">Research & Evidence</p>
            <h2 className="headline-large mb-8">
              THE WHITE PAPER
            </h2>
            <p className="body-large opacity-80 mb-6">
              Our comprehensive research document examines the state of mental health 
              institutions, documents systemic failures, and presents a framework for 
              accountability rooted in the lived experiences of those most affected.
            </p>
            <p className="body-regular opacity-60 mb-10">
              This paper combines data analysis, legal frameworks, and personal narratives 
              to build an irrefutable case for institutional reform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/ofc.pdf" target="_blank" rel="noopener noreferrer" className="cta-primary gap-2">
                <ExternalLink className="w-4 h-4" />
                View White Paper
              </a>
              <a href="/ofc.pdf" download className="cta-secondary gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </a>
            </div>
          </motion.div>

          {/* Visual card */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotate: 2 }}
            animate={inView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <a 
              href="/ofc.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-muted aspect-[4/5] md:aspect-[3/4] relative group cursor-pointer transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden block"
            >
            <iframe
              src="/ofc.pdf#page=1&view=FitH&toolbar=0&navpanes=0&scrollbar=0"
              className="w-full h-full border-0"
              title="OFC White Paper Preview"
            />
              {/* Decorative element */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary opacity-80" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhitePaper;
