import { useState, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Upload, Check } from "lucide-react";
import { toast } from "sonner";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const YEARS = Array.from({ length: 6 }, (_, i) => 2020 + i);

const NarrativeForm = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    age: "",
    gender: "",
    sexuality: "",
    capacity: "",
    accessMonth: "",
    accessYear: "",
    institutionName: "",
    institutionType: "",
    careType: "",
    district: "",
    photo: null as File | null,
    narrative: "",
  });

  const update = (key: string, value: string | File | null) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const canProceed = () => {
    if (step === 1) return form.capacity.trim() !== "";
    if (step === 2)
      return (
        form.accessMonth !== "" &&
        form.accessYear !== "" &&
        form.institutionName.trim() !== "" &&
        form.institutionType.trim() !== "" &&
        form.careType.trim() !== "" &&
        form.district.trim() !== ""
      );
    if (step === 3) return form.narrative.trim() !== "";
    return false;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canProceed()) return;
    setSubmitted(true);
    toast.success("Thank you. Your narrative has been recorded.", {
      description: "Your story matters and will contribute to meaningful change.",
    });
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  const [direction, setDirection] = useState(1);

  const goNext = () => {
    if (!canProceed()) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, 3));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  if (submitted) {
    return (
      <section id="narrative-form" className="section-teal py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-8">
              <Check className="w-10 h-10 text-secondary-foreground" />
            </div>
            <h2 className="headline-large mb-6">THANK YOU.</h2>
            <p className="body-large max-w-xl mx-auto opacity-80">
              Your narrative has been submitted. Every story shared strengthens the call 
              for accountability and brings us closer to systemic change.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="narrative-form" className="section-teal py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="headline-large mb-4">
              SHARE YOUR <span className="text-secondary">STORY</span>
            </h2>
            <p className="body-large opacity-80">
              Your lived experience is evidence. Help us document the truth.
            </p>
          </motion.div>

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 flex items-center justify-center font-display font-bold text-sm transition-colors duration-300 ${
                    s === step
                      ? "bg-secondary text-secondary-foreground"
                      : s < step
                      ? "bg-primary-foreground text-primary"
                      : "border-2 border-primary-foreground/30 text-primary-foreground/50"
                  }`}
                >
                  {s < step ? <Check className="w-4 h-4" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-12 md:w-20 h-0.5 transition-colors duration-300 ${
                      s < step ? "bg-primary-foreground" : "bg-primary-foreground/20"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step labels */}
          <div className="flex justify-between mb-8 text-xs font-display uppercase tracking-wider opacity-60">
            <span>About You</span>
            <span>Institution</span>
            <span>Your Narrative</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="relative min-h-[420px]">
              <AnimatePresence custom={direction} mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="space-y-8"
                  >
                    <div>
                      <label className="form-label-campaign">Age (Optional)</label>
                      <input
                        type="number"
                        min={18}
                        max={99}
                        placeholder="e.g. 28"
                        value={form.age}
                        onChange={(e) => update("age", e.target.value)}
                        className="form-input-campaign text-primary-foreground placeholder:text-primary-foreground/40"
                      />
                    </div>
                    <div>
                      <label className="form-label-campaign">Gender (Optional)</label>
                      <input
                        type="text"
                        placeholder="How do you identify?"
                        value={form.gender}
                        onChange={(e) => update("gender", e.target.value)}
                        className="form-input-campaign text-primary-foreground placeholder:text-primary-foreground/40"
                      />
                    </div>
                    <div>
                      <label className="form-label-campaign">Sexuality / Sexual Orientation (Optional)</label>
                      <input
                        type="text"
                        placeholder="How do you identify?"
                        value={form.sexuality}
                        onChange={(e) => update("sexuality", e.target.value)}
                        className="form-input-campaign text-primary-foreground placeholder:text-primary-foreground/40"
                      />
                    </div>
                    <div>
                      <label className="form-label-campaign">
                        I am a… <span className="text-secondary">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="In what capacity are you providing this narrative?"
                        value={form.capacity}
                        onChange={(e) => update("capacity", e.target.value)}
                        className="form-input-campaign text-primary-foreground placeholder:text-primary-foreground/40"
                        required
                      />
                      <p className="form-instruction text-primary-foreground">
                        In what capacity are you providing this narrative?
                      </p>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="space-y-8"
                  >
                    <div>
                      <label className="form-label-campaign">
                        When did you access this institution? <span className="text-secondary">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <select
                          value={form.accessMonth}
                          onChange={(e) => update("accessMonth", e.target.value)}
                          className="form-input-campaign text-primary-foreground bg-transparent"
                          required
                        >
                          <option value="" className="text-dark-grey">Month</option>
                          {MONTHS.map((m) => (
                            <option key={m} value={m} className="text-dark-grey">{m}</option>
                          ))}
                        </select>
                        <select
                          value={form.accessYear}
                          onChange={(e) => update("accessYear", e.target.value)}
                          className="form-input-campaign text-primary-foreground bg-transparent"
                          required
                        >
                          <option value="" className="text-dark-grey">Year</option>
                          {YEARS.map((y) => (
                            <option key={y} value={y} className="text-dark-grey">{y}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="form-label-campaign">
                        Name of Institution <span className="text-secondary">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Full name of the institution"
                        value={form.institutionName}
                        onChange={(e) => update("institutionName", e.target.value)}
                        className="form-input-campaign text-primary-foreground placeholder:text-primary-foreground/40"
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label-campaign">
                        Type of Institution <span className="text-secondary">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Government Hospital, Private Clinic"
                        value={form.institutionType}
                        onChange={(e) => update("institutionType", e.target.value)}
                        className="form-input-campaign text-primary-foreground placeholder:text-primary-foreground/40"
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label-campaign">
                        Type of Care <span className="text-secondary">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Inpatient, Outpatient, Emergency"
                        value={form.careType}
                        onChange={(e) => update("careType", e.target.value)}
                        className="form-input-campaign text-primary-foreground placeholder:text-primary-foreground/40"
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label-campaign">
                        District <span className="text-secondary">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Name the district where the institution is based"
                        value={form.district}
                        onChange={(e) => update("district", e.target.value)}
                        className="form-input-campaign text-primary-foreground placeholder:text-primary-foreground/40"
                        required
                      />
                      <p className="form-instruction text-primary-foreground">
                        Name the district in which the institution is based.
                      </p>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="space-y-8"
                  >
                    <div>
                      <label className="form-label-campaign">Photo Upload (Optional)</label>
                      <div
                        onClick={() => fileRef.current?.click()}
                        className="border-2 border-dashed border-primary-foreground/30 p-8 text-center cursor-pointer 
                                   hover:border-secondary transition-colors duration-300"
                      >
                        <Upload className="w-8 h-8 mx-auto mb-3 opacity-50" />
                        <p className="body-regular opacity-70">
                          {fileName || "Click to upload an image (.png, .jpg, .jpeg)"}
                        </p>
                      </div>
                      <input
                        ref={fileRef}
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          update("photo", file);
                          setFileName(file?.name || null);
                        }}
                      />
                      <p className="form-instruction text-secondary mt-2 not-italic font-semibold">
                        ⚠ Please do not add any photos that include faces or other identifying 
                        information of current or past visitors or patients.
                      </p>
                    </div>
                    <div>
                      <label className="form-label-campaign">
                        Your Narrative <span className="text-secondary">*</span>
                      </label>
                      <textarea
                        rows={8}
                        placeholder="Tell us about your experience..."
                        value={form.narrative}
                        onChange={(e) => update("narrative", e.target.value)}
                        className="form-input-campaign text-primary-foreground placeholder:text-primary-foreground/40 border-2 border-primary-foreground/20 resize-y"
                        required
                      />
                      <p className="form-instruction text-primary-foreground">
                        Tell us about your experience of accessing this institution: physical accessibility, 
                        conduct of staff and medical professionals, respect of patients' rights, etc.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-12">
              {step > 1 ? (
                <button type="button" onClick={goBack} className="cta-secondary gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canProceed()}
                  className="cta-primary gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!canProceed()}
                  className="cta-primary gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Submit Your Narrative
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NarrativeForm;
