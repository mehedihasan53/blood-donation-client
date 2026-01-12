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
    <footer className="bg-theme-secondary/95 backdrop-blur-xl text-theme-secondary border-t border-theme-primary/20 transition-all duration-300">
      <div className="container mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-theme-primary">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-sm rounded-xl shadow-modern-sm">
                <MdBloodtype className="text-2xl text-red-500" />
              </div>
              <span className="text-2xl font-black tracking-tight">
                BloodConnect
              </span>
            </div>
            <p className="text-theme-secondary leading-relaxed">
              Connecting life-savers across Bangladesh. We are dedicated to
              ensuring no one suffers from a lack of blood during emergencies.
            </p>

            {/* Enhanced Social Media Icons */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-11 h-11 rounded-xl bg-theme-tertiary/50 backdrop-blur-sm flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white transition-all duration-300 shadow-modern-sm hover:shadow-modern-md hover:scale-105 border-0 group"
              >
                <FaFacebookF className="group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="#"
                className="w-11 h-11 rounded-xl bg-theme-tertiary/50 backdrop-blur-sm flex items-center justify-center hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-900 hover:text-white transition-all duration-300 shadow-modern-sm hover:shadow-modern-md hover:scale-105 border-0 group"
              >
                <FaXTwitter className="group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="#"
                className="w-11 h-11 rounded-xl bg-theme-tertiary/50 backdrop-blur-sm flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-600 hover:text-white transition-all duration-300 shadow-modern-sm hover:shadow-modern-md hover:scale-105 border-0 group"
              >
                <FaInstagram className="group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="#"
                className="w-11 h-11 rounded-xl bg-theme-tertiary/50 backdrop-blur-sm flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white transition-all duration-300 shadow-modern-sm hover:shadow-modern-md hover:scale-105 border-0 group"
              >
                <FaLinkedinIn className="group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="text-theme-primary font-bold uppercase tracking-widest mb-6 text-sm">
              Quick Links
            </h6>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/search"
                  className="text-theme-secondary hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Search Donors
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-theme-secondary hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Join as Donor
                </Link>
              </li>
              <li>
                <Link
                  to="/about-our-mission"
                  className="text-theme-secondary hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  About Our Mission
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h6 className="text-theme-primary font-bold uppercase tracking-widest mb-6 text-sm">
              Resources
            </h6>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/donation-faq"
                  className="text-theme-secondary hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Donation FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-theme-secondary hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-theme-secondary hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h6 className="text-theme-primary font-bold uppercase tracking-widest mb-6 text-sm">
              Newsletter
            </h6>
            <p className="text-theme-secondary mb-6 text-sm leading-relaxed">
              Get notified about urgent blood requirements in your area.
            </p>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-theme-tertiary/50 backdrop-blur-sm border-0 px-4 py-3 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:bg-theme-tertiary/70 outline-none text-theme-primary placeholder-theme-muted transition-all duration-300 shadow-modern-sm"
              />
              <button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-modern-lg hover:shadow-modern-xl hover:scale-[1.02] transform">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-theme-primary/20 bg-theme-tertiary/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-theme-muted">
              © {new Date().getFullYear()} BloodConnect. All rights reserved.
            </p>
            <p className="flex items-center gap-2 text-theme-secondary">
              Made with
              <FaHeart className="text-red-500 animate-pulse" />
              by{" "}
              <span className="text-theme-primary font-semibold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                Mehedi
              </span>
              in Bangladesh
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
