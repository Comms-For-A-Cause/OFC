import Hero from "@/components/Hero";
import CampaignIntro from "@/components/CampaignIntro";
import WhitePaper from "@/components/WhitePaper";
import NarrativeForm from "@/components/NarrativeForm";
import Factoids from "@/components/Factoids";
import CampaignFooter from "@/components/CampaignFooter";

const Index = () => {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <CampaignIntro />
      <WhitePaper />
      <NarrativeForm />
      <Factoids />
      <CampaignFooter />
    </main>
  );
};

export default Index;
