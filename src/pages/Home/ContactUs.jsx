import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="py-10 bg-red-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="bg-gray-50 p-8 lg:p-12 rounded-[32px] border border-gray-100">
            <h3 className="text-3xl font-black text-gray-900 mb-6">
              Send us a Message
            </h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Your message here..."
                  className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-red-500 transition-colors resize-none"
                ></textarea>
              </div>
              <button className="w-full bg-red-600 text-white font-bold py-4 rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-100">
                Send Message
              </button>
            </form>
          </div>

          <div className="lg:pt-10">
            <div className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-red-600 uppercase bg-red-100 rounded-full">
              Contact Support
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
              Get in Touch <br />
              <span className="text-red-600 italic">With Our Team</span>
            </h2>
            <p className="text-gray-500 text-lg mb-10 leading-relaxed">
              Have questions or need urgent blood support? Our team is here to
              help you 24/7. Don't hesitate to reach out.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 text-xl shadow-sm">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                    Call Us Today
                  </p>
                  <p className=" font-black text-gray-800">+880 1234 567 890</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-xl shadow-sm">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                    Email Support
                  </p>
                  <p className="font-black text-gray-800">
                    support@lifesource.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 text-xl shadow-sm">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                    Our Location
                  </p>
                  <p className="font-black text-gray-800">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
