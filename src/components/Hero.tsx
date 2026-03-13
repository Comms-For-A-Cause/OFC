import { motion } from "framer-motion";

const Hero = () => {
  const scrollToProblem = () => {
    document.getElementById("problem-statement")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden" 
      style={{ backgroundColor: "#F0B83F" }}
    >

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 md:px-8 py-24 text-center flex justify-center pt-32 md:pt-40">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main headline */}
          <motion.h1
            className="headline-massive mb-8 text-black"
            initial={{ opacity: 0, y: 60, rotateX: -40 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            Care Not Custody
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto mb-6 text-black/90 font-semibold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Good public mental healthcare is your right.
          </motion.p>

          <motion.p
            className="text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto mb-12 text-black/80 font-semibold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Let's make sure you can access it across Maharashtra.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <button onClick={scrollToProblem} className="cta-primary bg-black text-white hover:bg-black/80">
              Learn More
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-black" />
      </motion.div>
    </section>
  );
};

export default Hero;
