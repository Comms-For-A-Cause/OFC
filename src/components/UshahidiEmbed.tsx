import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { USHAHIDI_BASE_URL, USHAHIDI_FORM_ID } from "@/config/ushahidi";

export const UshahidiForm = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [accepted, setAccepted] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showCrisisModal, setShowCrisisModal] = useState(false);

  return (
    <section
      ref={ref}
      id="narrative-form"
      className="py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "#266173" }}
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
              <img src="/icons/shareyourstory.svg" alt="Share Your Story" className="w-20 h-20 -mt-4 self-start" />
              SHARE YOUR <br className="md:hidden" /><span className="bg-secondary text-secondary-foreground px-2">STORY</span>
            </span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed font-semibold max-w-2xl text-center mx-auto">
            Use the form below to share your experience with mental health institutions. Your story helps build accountability and drives systemic change.
          </p>
        </motion.div>

        <div className="relative">
          {/* Form always visible in background */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`bg-white/10 backdrop-blur-sm border-2 border-white/20 p-2 ${!accepted ? 'opacity-30 pointer-events-none' : ''}`}
          >
            <div className="bg-white/5 p-4 mb-2">
              <h3 className="font-display text-xl font-bold uppercase mb-2 text-white">
                Submission Form
              </h3>
              <p className="text-sm text-white/70">
                Submit your experience securely through our partner platform
              </p>
            </div>
            <iframe
              src={`${USHAHIDI_BASE_URL}/post/create/${USHAHIDI_FORM_ID}`}
              width="100%"
              height="700"
              frameBorder="0"
              allowFullScreen
              title="Ushahidi Survey Form"
              className="w-full bg-white"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />
          </motion.div>

          {/* Compact Disclaimer Overlay */}
          {!accepted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              <div className="bg-[#266173] border-2 border-white/30 rounded-lg p-6 md:p-8 max-w-2xl w-full mx-4 shadow-2xl">
                <h3 className="font-display text-xl md:text-2xl font-bold uppercase mb-4 text-white text-center">
                  Important Disclaimer & Guidelines
                </h3>
                <div className={`overflow-y-auto mb-4 pr-2 ${showMore ? 'max-h-[350px]' : 'max-h-[200px]'}`}>
                  <div className="space-y-3 text-white/90 text-sm md:text-base leading-relaxed">
                    <p>
                      <strong className="text-white">Using this microsite to submit stories:</strong> By submitting your story, you agree to have an anonymised version of it shared publicly on our living map, as well as part of any other campaign-related marketing and advocacy material by One Future Collective. You are free to withdraw consent for such publication at any time by emailing <a href="mailto:info@onefuturecollective.org" target="_blank" rel="noopener noreferrer" className="text-[#EC4899] hover:underline font-bold">info@onefuturecollective.org</a>, after which point your story will not be included in any fresh publications.
                    </p>
                    <p>
                      By using this website, you acknowledge and agree that you are solely responsible for the truth of the content you submit.
                    </p>
                    
                    {showMore && (
                      <>
                        <p>
                          <strong className="text-white">Excluding identifying information:</strong> The submissions made through this microsite must not include any identifying information relating to current or former, living or deceased patients, residents, clients, or visitors of any institution, facility, or clinic. Identifying information refers to names (full or partial), dates of birth, address or contact information, medical details, identification numbers, photographs or videos, case specific details that could reasonably identify a patient, or any other information that could in/directly reveal the identity of patients or visitors.
                        </p>
                        <p>
                          All submissions are vetted and completely anonymised before publication, and any submission containing identifiable information will be discarded and ineligible for publication. One Future Collective retains the right to delete, amend, and discard any publication or part of publication. Should you require any further information, please contact <a href="mailto:info@onefuturecollective.org" target="_blank" rel="noopener noreferrer" className="text-[#EC4899] hover:underline font-bold">info@onefuturecollective.org</a>.
                        </p>
                      </>
                    )}
                  </div>
                </div>
                
                {!showMore && (
                  <div className="flex justify-center mb-4">
                    <button
                      onClick={() => setShowMore(true)}
                      className="font-bold hover:underline transition-colors"
                      style={{ color: "#22272e" }}
                    >
                      Read more →
                    </button>
                  </div>
                )}
                
                <div className="flex justify-center">
                  <button
                    onClick={() => setAccepted(true)}
                    className="cta-primary bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-3 text-base md:text-lg font-bold"
                  >
                    I Understand & Agree
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center text-lg md:text-xl text-white/60 mt-8"
        >
          Your Story Matters.<br></br>Click on 'Add New Post' to Share Your Story
        </motion.p>
        
        {/* Floating Crisis Support Button */}
      {/* Floating Crisis Support Button */}
<div className="fixed bottom-5 right-5 z-50">
  <button
    onClick={() => setShowCrisisModal(true)}
    aria-label="Open Crisis Support"
    className="flex items-center gap-2 bg-[#f0f1f5] hover:bg-gray-200 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-full shadow-lg transition-all duration-200 active:scale-95"
  >
    <img src="/Helpline.svg" alt="" className="w-8 h-8" />
    <span className="hidden sm:inline text-sm font-semibold">
      Crisis Support
    </span>
  </button>
</div>

{/* Crisis Support Modal */}
{showCrisisModal && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    onClick={() => setShowCrisisModal(false)}
  >
    <motion.div
      initial={{ scale: 0.95, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.95, y: 20 }}
      onClick={(e) => e.stopPropagation()}
      className="bg-white rounded-xl w-full max-w-md p-6 sm:p-7 shadow-xl max-h-[90vh] overflow-y-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <img src="/Helpline.svg" alt="" className="w-7 h-7" />
          <h3 className="text-lg font-semibold text-gray-900">
            Crisis Support
          </h3>
        </div>

        <button
          onClick={() => setShowCrisisModal(false)}
          className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
        >
          ×
        </button>
      </div>

      {/* Text */}
      <p className="text-gray-600 text-sm leading-relaxed mb-5">
        This site discusses experiences related to mental health institutions.
        If you feel distressed or need immediate help, please reach out to a
        trusted support service.
      </p>

      {/* Helplines */}
      <div className="space-y-3">

        {/* Emergency */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-red-700">
            Emergency Services
          </p>
          <p className="text-red-800 font-bold text-lg mt-1">
            Call 108
          </p>
          <p className="text-xs text-red-600">
            Immediate assistance in Maharashtra
          </p>
        </div>

        {/* iCALL */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-blue-700">
            iCALL Psychosocial Helpline
          </p>
          <p className="text-blue-800 font-bold mt-1">
            +91 91529 87821
          </p>
          <p className="text-xs text-blue-600">
            Mon–Sat · 10 AM – 8 PM
          </p>
        </div>

      </div>
    </motion.div>
  </motion.div>
)}
      </div>
    </section>
  );
};

const UshahidiEmbed = () => {
  return (
    <>
      <UshahidiForm />
    </>
  );
};

export default UshahidiEmbed;
