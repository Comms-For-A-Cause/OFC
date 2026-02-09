const CampaignFooter = () => {
  return (
    <footer className="section-grey py-16 md:py-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold uppercase mb-4">
              One Future Collective
            </h3>
            <p className="body-regular opacity-60 max-w-sm">
              Building feminist futures through community, knowledge, and collective action. 
              Every voice matters. Every story counts.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="form-label-campaign mb-6 text-secondary">Navigate</h4>
            <ul className="space-y-3">
              {["About", "Campaigns", "Research", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="body-regular opacity-60 hover:opacity-100 hover:text-secondary transition-all duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="form-label-campaign mb-6 text-secondary">Connect</h4>
            <div className="flex gap-4">
              {[
                { name: "Twitter", href: "#" },
                { name: "Instagram", href: "#" },
                { name: "LinkedIn", href: "#" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 border border-white/30 flex items-center justify-center 
                             font-display text-xs uppercase tracking-wider
                             hover:bg-secondary hover:border-secondary transition-all duration-300"
                >
                  {social.name[0]}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-current/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs opacity-40 font-body">
            © 2025 One Future Collective. All rights reserved.
          </p>
          <p className="font-display text-xs uppercase tracking-widest opacity-40">
            Nothing about us, without us.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default CampaignFooter;
