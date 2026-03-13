import ScrollReveal from "./ScrollReveal";

const ProblemStatement = () => {
  return (
    <section id="problem-statement" className="py-24 md:py-32 overflow-hidden" style={{ backgroundColor: "#02A9EA" }}>
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Label */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-4">
            <img src="/icons/theproblem.svg" alt="The Problem" className="w-14 h-14" />
            <p className="inline-block text-2xl md:text-3xl font-bold uppercase tracking-wider text-white bg-secondary px-4 py-2">The Problem</p>
          </div>
        </ScrollReveal>

        {/* Big editorial statement */}
        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-[0.95] tracking-tight max-w-5xl mb-12 text-white">
            Violations of the human rights of persons with mental illness
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          <ScrollReveal delay={0.2}>
            <div className="space-y-6">
              <p className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed font-semibold">
                <span className="text-2xl mr-2">→</span>
                The Mental Healthcare Act (MHCA) 2017, outlines and protects the rights of people with mental illness in India and mandates individualised care plans and trauma-informed, gender-sensitive services. However, investigations into public mental health institutions in Maharashtra highlight systemic issues, including the use of outdated and coercive treatments such as unmodified ECT, denial of informed consent, overcrowded and unhygienic conditions, and the near-total absence of psychosocial or rehabilitative support.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="space-y-6">
              <p className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed font-semibold">
                <span className="text-2xl mr-2">→</span>
                Women and queer persons face specific forms of neglect, such as forced institutionalisation, misdiagnosis, and exposure to physical and sexual violence, with little recourse or protection.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* NHRC Statement */}
        <ScrollReveal delay={0.4} className="mt-16">
          <div className="border-l-4 border-secondary pl-6 py-4">
            <p className="text-lg md:text-xl lg:text-2xl text-white italic leading-relaxed font-semibold">
              In 2023, the NHRC stated that all government mental health institutions in India were in deplorable and inhuman conditions, amounting to violations of the human rights of persons with mental illness.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProblemStatement;
