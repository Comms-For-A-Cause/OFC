import ScrollReveal from "./ScrollReveal";

const CampaignIntro = () => {
  return (
    <section className="section-teal py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Big editorial statement */}
        <ScrollReveal>
          <h2 className="headline-large max-w-4xl mb-16">
            EVERY NARRATIVE IS{" "}
            <span className="text-secondary">EVIDENCE.</span>{" "}
            EVERY VOICE IS A{" "}
            <span className="text-secondary">DEMAND FOR CHANGE.</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          <ScrollReveal delay={0.1}>
            <div className="space-y-6">
              <h3 className="headline-medium">What This Campaign Is About</h3>
              <p className="body-large opacity-90">
                This campaign documents lived experiences of individuals who have accessed 
                mental health institutions across India. We believe that the people most 
                affected by these systems hold the deepest knowledge of what needs to change.
              </p>
              <p className="body-regular opacity-75">
                By collecting these narratives, we build an evidence base that can inform policy, 
                shift public discourse, and hold institutions accountable for the care they 
                provide—or fail to provide.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <div className="space-y-6">
              <h3 className="headline-medium">Why Narratives Matter</h3>
              <p className="body-large opacity-90">
                Data alone cannot capture the full truth of institutional care. Numbers 
                don't convey the weight of being denied dignity, the pain of coercive treatment, 
                or the resilience it takes to survive systems that were meant to heal.
              </p>
              <p className="body-regular opacity-75">
                Your narrative fills the gaps that statistics leave behind. It transforms 
                abstract policy failures into human truths that demand action.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Divider statement */}
        <ScrollReveal delay={0.1} className="mt-20 md:mt-28">
          <div className="border-t-2 border-primary-foreground/20 pt-12">
            <p className="headline-medium text-secondary max-w-3xl">
              THIS IS FOR SURVIVORS, CAREGIVERS, ADVOCATES, AND ANYONE WHOSE LIFE 
              HAS BEEN SHAPED BY THESE INSTITUTIONS.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CampaignIntro;
