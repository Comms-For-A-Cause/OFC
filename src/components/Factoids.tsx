import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface QuoteData {
  quote: string;
  preview: string;
  source: string;
  citation: string;
  link: string | null;
}

const quotes: QuoteData[] = [
  {
    quote: "Research indicates that limited community participation, minimal involvement of users and carers in oversight and weak engagement of national human-rights institutions undermine accountability and slow the translation of legal and policy advances into everyday practice.",
    preview: "Research indicates that limited community participation, minimal involvement of users and carers in oversight...",
    source: "Ahmed et al., 2022",
    citation: "Journal of Global Health Neurology and Psychiatry",
    link: "https://joghnp.scholasticahq.com/article/36128",
  },
  {
    quote: "At a conceptual level, these alternatives challenge the assumption that recovery is best achieved through prolonged institutionalisation or specialist-led biomedical treatment alone. Instead, they emphasise early intervention, continuity of care, social reintegration and the rebuilding of agency through sustained engagement with families, communities and peer networks.",
    preview: "At a conceptual level, these alternatives challenge the assumption that recovery is best achieved through prolonged institutionalisation...",
    source: "Tr, 2025",
    citation: "International Journal of Medical and All Body Health Research",
    link: "https://doi.org/10.54660/IJMBHR.2025.6.2.28-37",
  },
  {
    quote: "Cost-estimation work on the MHCA 2017 shows that full implementation of the Act, including access to essential psychotropic medicines, community services and minimum staffing norms, would require very substantial new public investment, estimated at over ₹94,000 crore annually, far above current spending levels which is less than 1% of the total healthcare budget.",
    preview: "Cost-estimation work on the MHCA 2017 shows that full implementation of the Act would require very substantial new public investment...",
    source: "CAG of India, 2020",
    citation: "Performance Audit on Mental Healthcare in Gujarat",
    link: "https://resourcerepository.azimpremjiuniversity.edu.in/items/3427b0ec-76fd-4511-bcdf-c74f402ccff0/full",
  },
];

const Factoids = () => {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.15 });
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleExpand = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const isExpanded = (index: number) => expandedItems.includes(index);

  return (
    <section ref={ref} className="py-24 md:py-32 overflow-hidden" style={{ backgroundColor: "#266173" }}>
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold uppercase leading-[0.95] tracking-tight mb-8 text-white text-center"
        >
          <span className="flex items-center justify-center gap-4">
            <img src="/icons/keyinsights.svg" alt="Key Insights" className="w-14 h-14" />
            Key Insights
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map((quote, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-center md:text-left"
            >
              <div className="bg-white border border-gray-200 p-5 flex flex-col h-full">
                {/* Preview text (always visible) */}
                <p className="font-bold text-black text-sm leading-relaxed mb-3">
                  "{isExpanded(i) ? quote.quote : quote.preview}"
                </p>
                
                {/* Read More / Read Less Button */}
                <button
                  onClick={() => toggleExpand(i)}
                  className="text-secondary hover:underline text-xs font-semibold mb-3 flex items-center gap-1 self-start"
                >
                  {isExpanded(i) ? (
                    <>
                      Read less <ChevronUp size={14} />
                    </>
                  ) : (
                    <>
                      Read more <ChevronDown size={14} />
                    </>
                  )}
                </button>

                <div className="mt-auto pt-3 border-t border-gray-200">
                  <p className="font-display text-xs font-bold uppercase tracking-wide text-secondary mb-1">
                    {quote.source}
                  </p>
                  <p className="text-black/60 text-xs">
                    {quote.citation}
                  </p>
                  {quote.link && (
                    <a 
                      href={quote.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-secondary hover:underline text-xs mt-1 inline-block"
                    >
                      View source →
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Factoids;
