import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const scrollToForm = () => {
    document.getElementById("narrative-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToWhitePaper = () => {
    document.getElementById("white-paper")?.scrollIntoView({ behavior: "smooth" });
  };

  const words = ["DOCUMENTING", "EXPERIENCES.", "DEMANDING", "ACCOUNTABILITY."];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-dark">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <motion.img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-30"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
      </div>

      {/* Logo */}
      <motion.div
        className="absolute top-6 left-6 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <img src="/ofc.svg" alt="OFC Logo" className="h-10 md:h-12 w-auto" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 py-24">
        <div className="max-w-2xl">
          {/* Staggered headline */}
          <h1 className="headline-massive mb-8">
          {words.map((word, i) => (
              <motion.span
                key={word}
                className={`inline-block mr-1 md:mr-2 ${i >= 2 ? "text-secondary" : ""}`}
                initial={{ opacity: 0, y: 60, rotateX: -40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + i * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="body-large max-w-2xl mb-12 opacity-80"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            A campaign by One Future Collective to collect and amplify lived-experience 
            narratives from mental health institutions across India. Your story is evidence. 
            Your voice is power.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <button onClick={scrollToForm} className="cta-primary">
              Share Your Story
            </button>
            <button onClick={scrollToWhitePaper} className="cta-secondary">
              Read the White Paper
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-secondary" />
      </motion.div>
    </section>
  );
};

export default Hero;
