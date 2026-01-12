import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaHeart,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdBloodtype } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-bg-secondary/95 dark:bg-bg-secondary/98 backdrop-blur-sm text-text-secondary border-t border-border-primary/30 dark:border-border-primary/40">
      <div className="container mx-auto px-6 lg:px-12 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-text-primary">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/15 dark:bg-primary/20 backdrop-blur-sm rounded-full shadow-sm">
                <MdBloodtype className="text-2xl text-primary" />
              </div>
              <span className="text-2xl font-black tracking-tight">
                BloodConnect
              </span>
            </div>
            <p className="text-text-muted leading-relaxed">
              Connecting life-savers across Bangladesh. We are dedicated to
              ensuring no one suffers from a lack of blood during emergencies.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-bg-tertiary/80 dark:bg-bg-tertiary/60 backdrop-blur-sm flex items-center justify-center hover:bg-primary/90 hover:text-text-inverse transition-all duration-300 shadow-sm"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-bg-tertiary/80 dark:bg-bg-tertiary/60 backdrop-blur-sm flex items-center justify-center hover:bg-primary/90 hover:text-text-inverse transition-all duration-300 shadow-sm"
              >
                <FaXTwitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-bg-tertiary/80 dark:bg-bg-tertiary/60 backdrop-blur-sm flex items-center justify-center hover:bg-primary/90 hover:text-text-inverse transition-all duration-300 shadow-sm"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-bg-tertiary/80 dark:bg-bg-tertiary/60 backdrop-blur-sm flex items-center justify-center hover:bg-primary/90 hover:text-text-inverse transition-all duration-300 shadow-sm"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          <div>
            <h6 className="text-text-primary font-bold uppercase tracking-widest mb-6">
              Quick Links
            </h6>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/search"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Search Donors
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Join as Donor
                </Link>
              </li>
              <li>
                <Link to="/about-our-mission" className="hover:text-primary transition-colors duration-300">
                  About Our Mission
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="text-text-primary font-bold uppercase tracking-widest mb-6">
              Resources
            </h6>
            <ul className="space-y-4">
              <li>
                <Link to="/donation-faq" className="hover:text-primary transition-colors duration-300">
                  Donation FAQ
                </Link>
              </li>

              <li>
                <Link to="/privacy-policy" className="hover:text-primary transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:text-primary transition-colors duration-300">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="text-text-primary font-bold uppercase tracking-widest mb-6">
              Newsletter
            </h6>
            <p className="text-text-muted mb-4 text-sm">
              Get notified about urgent blood requirements in your area.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter email"
                className="bg-bg-tertiary/80 dark:bg-bg-tertiary/60 backdrop-blur-sm border border-border-primary/30 dark:border-border-primary/40 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none w-full text-text-primary placeholder-text-muted transition-all duration-300"
              />
              <button className="bg-primary/95 dark:bg-primary/90 hover:bg-primary-hover/95 dark:hover:bg-primary-hover/90 text-text-inverse font-bold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border-primary/30 dark:border-border-primary/40 py-5">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-muted">
          <p>© {new Date().getFullYear()} BloodConnect. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <FaHeart className="text-primary" /> by{" "}
            <span className="text-text-primary font-medium">Mehedi</span> in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
