import React from "react";
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
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 lg:px-12 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-white">
              <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
                <MdBloodtype className="text-2xl text-red-600" />
              </div>
              <span className="text-2xl font-black tracking-tight">
                BloodConnect
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Connecting life-savers across Bangladesh. We are dedicated to
              ensuring no one suffers from a lack of blood during emergencies.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
              >
                <FaXTwitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          <div>
            <h6 className="text-white font-bold uppercase tracking-widest mb-6">
              Quick Links
            </h6>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/search"
                  className="hover:text-red-500 transition-colors"
                >
                  Search Donors
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-red-500 transition-colors"
                >
                  Join as Donor
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-red-500 transition-colors">
                  About Our Mission
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="text-white font-bold uppercase tracking-widest mb-6">
              Resources
            </h6>
            <ul className="space-y-4">
              <li>
                <Link to="#" className="hover:text-red-500 transition-colors">
                  Donation FAQ
                </Link>
              </li>

              <li>
                <Link to="#" className="hover:text-red-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-red-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="text-white font-bold uppercase tracking-widest mb-6">
              Newsletter
            </h6>
            <p className="text-gray-400 mb-4 text-sm">
              Get notified about urgent blood requirements in your area.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter email"
                className="bg-gray-800 border-none px-4 py-3 rounded-xl focus:ring-2 focus:ring-red-600 outline-none w-full text-white"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-5">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} BloodConnect. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <FaHeart className="text-red-600" /> by{" "}
            <span className="text-white font-medium">Mehedi</span> in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
