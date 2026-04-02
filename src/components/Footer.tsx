import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Linkedin, Twitter, Globe } from "lucide-react";

const SOCIAL_LINKS = [
  { id: "google", href: "https://maps.app.goo.gl/JETN7PRoGTP8uMU79", label: "Google Maps", Icon: Globe },
  { id: "linkedin", href: "https://www.linkedin.com/company/inventech-info-solutions/posts/?feedView=all", label: "LinkedIn", Icon: Linkedin },
  { id: "twitter", href: "https://twitter.com/InvenTechInfo", label: "Twitter", Icon: Twitter },
] as const;

export default function Footer() {
  const [rotatingIcon, setRotatingIcon] = useState<string | null>(null);

  const handleSocialClick = (id: string) => {
    setRotatingIcon(id);
    setTimeout(() => setRotatingIcon(null), 600);
  };

  return (
    <footer className="bg-transparent border-t border-white/5 pt-16 pb-12 relative z-10">
      <div className="container mx-auto px-6">
        {/* Footer – 4 columns, transparent no box */}
        <div className="pb-16">
          <div className="grid md:grid-cols-4 gap-12 text-sm pt-16 px-6 container mx-auto">
            {/* Column 1: Logo, tagline, social */}
            <div>
              <Link to="/" className="inline-flex items-center mb-6">
                <img
                  src="/inventech-logo.png"
                  alt="InvenTech"
                  className="h-12 w-auto object-contain"
                />
              </Link>
              <p className="footer-phrase text-white leading-relaxed mb-6 py-1 pr-2 rounded cursor-default max-w-[280px]">
                Innovating the future through AI-powered digital solutions.
              </p>
              <div className="flex gap-4">
                {SOCIAL_LINKS.map(({ id, href, label, Icon }) => (
                  <a
                    key={id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={href}
                    onClick={() => handleSocialClick(id)}
                    className={`footer-social text-white hover:text-sky-400 active:text-sky-400 transition-colors inline-flex cursor-pointer [&>svg]:inline-block ${rotatingIcon === id ? "social-icon-rotate-on-click" : ""}`}
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Services */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Services</h4>
              <ul className="space-y-4">
                <li>
                  <Link to="/services" className="footer-phrase text-white block py-1 pr-2 rounded">
                    IT Services
                  </Link>
                </li>
                <li>
                  <Link to="/consulting" className="footer-phrase text-white block py-1 pr-2 rounded">
                    IT Consultancy
                  </Link>
                </li>
                <li>
                  <Link to="/portfolio" className="footer-phrase text-white block py-1 pr-2 rounded">
                    Portfolio
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Company */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Company</h4>
              <ul className="space-y-4">
                <li>
                  <Link to="/about" className="footer-phrase text-white block py-1 pr-2 rounded">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/culture" className="footer-phrase text-white block py-1 pr-2 rounded">
                    Culture & Events
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="footer-phrase text-white block py-1 pr-2 rounded">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="footer-phrase text-white block py-1 pr-2 rounded">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact Us */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Contact Us</h4>
              <ul className="space-y-4">
                <li className="group flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-white shrink-0 mt-0.5 footer-phrase-icon" />
                  <span className="footer-phrase text-white py-1 pr-2 rounded cursor-default">
                    #296/D/2/56, 2nd Floor, 9th Main Road, 5th Block, Jayanagar, Bangalore. Karnataka, India - 560 011
                  </span>
                </li>
                <li className="group flex items-center gap-3">
                  <Phone className="w-5 h-5 text-white shrink-0 footer-phrase-icon" />
                  <a href="tel:+918026535959" className="footer-phrase text-white py-1 pr-2 rounded">
                    +91 80-26535959
                  </a>
                </li>
                <li className="group flex items-center gap-3">
                  <Mail className="w-5 h-5 text-white shrink-0 footer-phrase-icon" />
                  <a href="mailto:connect@inventechinfo.com" className="footer-phrase text-white py-1 pr-2 rounded">
                    connect@inventechinfo.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="px-6 container mx-auto py-8 text-center">
          <p className="footer-phrase text-white text-xs py-1 pr-2 rounded cursor-default inline-block">
            © 2026 Inventech Info Solution Pvt Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
