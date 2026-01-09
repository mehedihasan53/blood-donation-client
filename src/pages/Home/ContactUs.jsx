import { useState, useRef } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaSpinner, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import emailjs from '@emailjs/browser';

const ContactUs = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  // EmailJS Configuration
  const EMAILJS_SERVICE_ID = 'service_a6uwito';
  const EMAILJS_TEMPLATE_ID = 'template_bv6broq';
  const EMAILJS_PUBLIC_KEY = 'AQ8zJpBiGIQlCpSr3';

  const validateForm = () => {
    const newErrors = {};

    if (!formData.user_name.trim()) {
      newErrors.user_name = 'Full name is required';
    }

    if (!formData.user_email.trim()) {
      newErrors.user_email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
      newErrors.user_email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSubmitStatus(null);

    try {
      console.log('Sending email with EmailJS...');

      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form.current,
        EMAILJS_PUBLIC_KEY
      );

      console.log('Email sent successfully:', result);
      setSubmitStatus('success');

      // Reset form
      setFormData({
        user_name: '',
        user_email: '',
        subject: '',
        message: ''
      });

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);

    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');

      // Auto-hide error message after 8 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 8000);
    } finally {
      setIsLoading(false);
    }
  };

  const resetStatus = () => {
    setSubmitStatus(null);
  };

  return (
    <section
      id="contact-us"
      className="relative py-5 lg:py-10 bg-gradient-to-br from-red-50/30 via-white/20 to-pink-50/30 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50 backdrop-blur-sm"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-100/20 dark:bg-red-900/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-100/20 dark:bg-pink-900/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-50/80 dark:bg-red-900/30 backdrop-blur-sm border border-red-200/50 dark:border-red-700/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <FaEnvelope className="text-sm" />
            <span className="uppercase tracking-wide">Contact Support</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
            Get in Touch{" "}
            <span className="text-red-600 dark:text-red-400">With Our Team</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Have questions or need urgent blood support? Our team is here to help you 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Contact Form */}
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 sm:p-8 lg:p-10 rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Send us a Message
            </h3>

            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50/80 dark:bg-green-900/20 backdrop-blur-sm border border-green-200/50 dark:border-green-700/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-600 dark:text-green-400 text-lg" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-green-800 dark:text-green-300">Message Sent Successfully!</h4>
                    <p className="text-sm text-green-600 dark:text-green-400">We'll get back to you within 24 hours.</p>
                  </div>
                  <button
                    onClick={resetStatus}
                    className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-xl leading-none"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm border border-red-200/50 dark:border-red-700/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <FaExclamationTriangle className="text-red-600 dark:text-red-400 text-lg flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-red-800 dark:text-red-300">Failed to Send Message</h4>
                    <p className="text-sm text-red-600 dark:text-red-400">
                      Please try again or contact us directly at{' '}
                      <a
                        href="mailto:mehedihasan.codes3@gmail.com"
                        className="underline hover:no-underline font-medium"
                      >
                        mehedihasan.codes3@gmail.com
                      </a>
                    </p>
                  </div>
                  <button
                    onClick={resetStatus}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-xl leading-none"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                    className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 ${errors.user_name
                      ? 'border-red-300 dark:border-red-600 bg-red-50/80 dark:bg-red-900/20'
                      : 'border-gray-200/50 dark:border-gray-600/50 bg-gray-50/80 dark:bg-gray-800/80'
                      }`}
                  />
                  {errors.user_name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.user_name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                    className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 ${errors.user_email
                      ? 'border-red-300 dark:border-red-600 bg-red-50/80 dark:bg-red-900/20'
                      : 'border-gray-200/50 dark:border-gray-600/50 bg-gray-50/80 dark:bg-gray-800/80'
                      }`}
                  />
                  {errors.user_email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.user_email}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="How can we help?"
                  required
                  className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 ${errors.subject
                    ? 'border-red-300 dark:border-red-600 bg-red-50/80 dark:bg-red-900/20'
                    : 'border-gray-200/50 dark:border-gray-600/50 bg-gray-50/80 dark:bg-gray-800/80'
                    }`}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  rows="5"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your message here..."
                  required
                  className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 resize-none ${errors.message
                    ? 'border-red-300 dark:border-red-600 bg-red-50/80 dark:bg-red-900/20'
                    : 'border-gray-200/50 dark:border-gray-600/50 bg-gray-50/80 dark:bg-gray-800/80'
                    }`}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full backdrop-blur-sm text-white font-semibold py-4 rounded-xl transition-all duration-300 border border-red-500/30 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 ${isLoading
                  ? 'bg-gray-400/90 dark:bg-gray-600/80 cursor-not-allowed'
                  : 'bg-red-600/90 dark:bg-red-600/80 hover:bg-red-700/90 dark:hover:bg-red-700/80 hover:scale-[1.02]'
                  }`}
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="text-sm animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="text-sm" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="space-y-6">
              {/* Phone */}
              <div className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/30 dark:border-gray-700/30 hover:bg-white/90 dark:hover:bg-gray-900/90 hover:border-white/40 dark:hover:border-gray-700/40 transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100/80 dark:bg-red-900/40 backdrop-blur-sm rounded-xl flex items-center justify-center text-red-600 dark:text-red-400 text-lg group-hover:scale-110 transition-transform duration-300">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                      Call Us Today
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      01976522844
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/30 dark:border-gray-700/30 hover:bg-white/90 dark:hover:bg-gray-900/90 hover:border-white/40 dark:hover:border-gray-700/40 transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100/80 dark:bg-blue-900/40 backdrop-blur-sm rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 text-lg group-hover:scale-110 transition-transform duration-300">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                      Email Support
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      mehedihasan.codes3@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/30 dark:border-gray-700/30 hover:bg-white/90 dark:hover:bg-gray-900/90 hover:border-white/40 dark:hover:border-gray-700/40 transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100/80 dark:bg-green-900/40 backdrop-blur-sm rounded-xl flex items-center justify-center text-green-600 dark:text-green-400 text-lg group-hover:scale-110 transition-transform duration-300">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                      Our Location
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      Dhaka, Bangladesh
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Notice */}
            <div className="bg-gradient-to-r from-red-50/80 to-pink-50/80 dark:from-red-900/20 dark:to-pink-900/20 backdrop-blur-sm p-6 rounded-2xl border border-red-200/50 dark:border-red-700/30">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-100/80 dark:bg-red-900/40 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 text-sm mt-1">
                  ⚡
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                    Emergency Blood Request?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    For urgent blood requirements, call our 24/7 emergency hotline.
                    We'll connect you with the nearest available donors immediately.
                  </p>
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