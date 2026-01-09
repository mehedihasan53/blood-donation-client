import { useEffect, useState, useContext } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheckCircle, FaHeart, FaHome, FaTachometerAlt, FaReceipt, FaHandsHelping, FaDownload } from "react-icons/fa";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../Provider/AuthProvider";
import DynamicTitle from "../../components/shared/DynamicTitle";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  useEffect(() => {
    if (!sessionId || saved) return;

    const savePayment = async () => {
      try {
        const response = await axiosInstance.post(`/success-payment?session_id=${sessionId}`);
        setSaved(true);
        // Store payment data for PDF generation
        setPaymentData({
          transactionId: sessionId,
          amount: response.data?.amount || searchParams.get('amount') || 'N/A',
          currency: response.data?.currency || 'USD',
          paymentMethod: 'Stripe',
          date: new Date().toISOString(),
          status: 'Successful'
        });
      } catch (err) {
        console.error(err);
        setError("Payment verified, but failed to save data.");
        // Set basic payment data even if save fails
        setPaymentData({
          transactionId: sessionId,
          amount: searchParams.get('amount') || 'N/A',
          currency: 'USD',
          paymentMethod: 'Stripe',
          date: new Date().toISOString(),
          status: 'Successful'
        });
      } finally {
        setLoading(false);
      }
    };

    savePayment();
  }, [sessionId, saved, axiosInstance]);

  const generatePDF = async () => {
    if (!paymentData || !user) return;

    setDownloadingPDF(true);

    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Header
      pdf.setFillColor(220, 38, 38); // Red color
      pdf.rect(0, 0, pageWidth, 40, 'F');

      // Logo and title
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text('BloodConnect', 20, 25);

      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Payment Receipt', pageWidth - 60, 25);

      // Reset text color
      pdf.setTextColor(0, 0, 0);

      // Receipt title
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text('PAYMENT RECEIPT', 20, 65);

      // Receipt details
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');

      const startY = 85;
      const lineHeight = 8;
      let currentY = startY;

      // Receipt information
      const receiptInfo = [
        ['Receipt Date:', new Date(paymentData.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })],
        ['Transaction ID:', paymentData.transactionId],
        ['Status:', paymentData.status],
        ['', ''], // Empty line
        ['DONOR INFORMATION', ''],
        ['Name:', user.displayName || 'N/A'],
        ['Email:', user.email || 'N/A'],
        ['', ''], // Empty line
        ['PAYMENT DETAILS', ''],
        ['Amount:', `${paymentData.currency} ${paymentData.amount}`],
        ['Payment Method:', paymentData.paymentMethod],
        ['Processing Fee:', 'Included'],
        ['', ''], // Empty line
        ['DONATION PURPOSE', ''],
        ['Platform Maintenance:', '✓ Supporting 24/7 operations'],
        ['Emergency Response:', '✓ Urgent blood request coordination'],
        ['Community Outreach:', '✓ Expanding donor network'],
      ];

      receiptInfo.forEach(([label, value]) => {
        if (label === 'DONOR INFORMATION' || label === 'PAYMENT DETAILS' || label === 'DONATION PURPOSE') {
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(14);
          pdf.text(label, 20, currentY);
          currentY += lineHeight + 2;
        } else if (label === '') {
          currentY += lineHeight / 2;
        } else {
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(11);
          pdf.text(label, 20, currentY);

          pdf.setFont('helvetica', 'normal');
          pdf.text(value, 80, currentY);
          currentY += lineHeight;
        }
      });

      // Footer
      const footerY = pageHeight - 40;
      pdf.setDrawColor(220, 38, 38);
      pdf.line(20, footerY - 10, pageWidth - 20, footerY - 10);

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100, 100, 100);
      pdf.text('Thank you for your generous donation to BloodConnect!', 20, footerY);
      pdf.text('Your contribution helps save lives across Bangladesh.', 20, footerY + 6);
      pdf.text('For questions, contact us at support@bloodconnect.bd', 20, footerY + 12);

      pdf.setTextColor(220, 38, 38);
      pdf.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth - 60, footerY + 12);

      // Save the PDF
      const fileName = `payment-receipt-${paymentData.transactionId.substring(0, 8)}.pdf`;
      pdf.save(fileName);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setDownloadingPDF(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const successIconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { delay: 0.3, type: "spring", stiffness: 200, damping: 15 }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-white/20 to-blue-50/30 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50 backdrop-blur-sm flex items-center justify-center">
        <DynamicTitle title="Processing Payment..." />

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-40 h-40 bg-green-100/20 dark:bg-green-900/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-100/20 dark:bg-blue-900/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        </div>

        <div className="relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg p-8 text-center">
          <div className="w-12 h-12 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Verifying your payment...
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Please wait while we confirm your donation
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white/20 to-orange-50/30 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50 backdrop-blur-sm flex items-center justify-center">
        <DynamicTitle title="Payment Error" />

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-40 h-40 bg-red-100/20 dark:bg-red-900/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-orange-100/20 dark:bg-orange-900/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        </div>

        <div className="relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg p-8 text-center max-w-md mx-4">
          <div className="w-16 h-16 bg-red-100/80 dark:bg-red-900/40 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-2xl text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Verification Issue
          </h1>
          <p className="text-red-600 dark:text-red-400 font-medium mb-6">{error}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-red-600/90 dark:bg-red-600/80 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700/90 dark:hover:bg-red-700/80 transition-all duration-300"
          >
            <FaHome />
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-white/20 to-emerald-50/30 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50 backdrop-blur-sm">
      <DynamicTitle title="Payment Successful - Thank You!" />

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-40 h-40 bg-green-100/20 dark:bg-green-900/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-emerald-100/20 dark:bg-emerald-900/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-100/20 dark:bg-blue-900/10 rounded-full blur-2xl animate-pulse animation-delay-4000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto"
        >
          {/* Success Card */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg p-8 lg:p-12 text-center">
            {/* Success Icon */}
            <motion.div
              variants={successIconVariants}
              initial="hidden"
              animate="visible"
              className="w-20 h-20 bg-green-100/80 dark:bg-green-900/40 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <FaCheckCircle className="text-4xl text-green-600 dark:text-green-400" />
            </motion.div>

            {/* Success Message */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Payment Successful!
            </h1>
            <div className="flex items-center justify-center gap-2 mb-6">
              <FaHeart className="text-red-500 animate-pulse" />
              <span className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                Thank you for your generous donation
              </span>
              <FaHeart className="text-red-500 animate-pulse" />
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Your contribution helps us maintain our life-saving platform and support emergency blood requests
              across Bangladesh. Every donation makes a real difference in someone's life.
            </p>

            {/* Transaction Details */}
            <div className="bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/30 p-6 mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <FaReceipt className="text-gray-500 dark:text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Transaction Details
                </h3>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Transaction ID:</span>
                <div className="mt-2 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-lg p-3 font-mono text-xs break-all border border-gray-200/50 dark:border-gray-600/30">
                  {sessionId}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/dashboard"
                  className="flex items-center justify-center gap-3 bg-green-600/90 dark:bg-green-600/80 backdrop-blur-sm text-white border border-green-500/30 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-700/90 dark:hover:bg-green-700/80 transition-all duration-300 shadow-lg hover:shadow-xl min-w-[200px]"
                >
                  <FaTachometerAlt />
                  Go to Dashboard
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/"
                  className="flex items-center justify-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-200 border border-white/50 dark:border-gray-700/50 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 min-w-[200px]"
                >
                  <FaHome />
                  Back to Home
                </Link>
              </motion.div>
            </div>

            {/* PDF Download Button */}
            <motion.div
              whileHover={{ scale: downloadingPDF ? 1 : 1.02 }}
              whileTap={{ scale: downloadingPDF ? 1 : 0.98 }}
              className="flex justify-center"
            >
              <button
                onClick={generatePDF}
                disabled={downloadingPDF || !paymentData}
                className="flex items-center justify-center gap-3 bg-blue-600/90 dark:bg-blue-600/80 backdrop-blur-sm text-white border border-blue-500/30 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700/90 dark:hover:bg-blue-700/80 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed min-w-[200px]"
              >
                {downloadingPDF ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <FaDownload />
                    Download Receipt
                  </>
                )}
              </button>
            </motion.div>
          </div>

          {/* Impact Message */}
          <div className="mt-12 bg-gradient-to-r from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 backdrop-blur-sm rounded-2xl border border-green-200/50 dark:border-green-700/30 p-8 text-center">
            <div className="w-16 h-16 bg-green-100/80 dark:bg-green-900/40 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <FaHandsHelping className="text-2xl text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your Impact
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Thanks to donors like you, we've facilitated over 8,000 life-saving blood donations across Bangladesh.
              Your support helps us continue this vital work and expand our reach to save even more lives.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-white/40 dark:border-gray-700/40">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Platform Uptime</div>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-white/40 dark:border-gray-700/40">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">15K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Donors</div>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-white/40 dark:border-gray-700/40">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">64+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Districts Covered</div>
              </div>
            </div>
          </div>

          {/* Share the Mission */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Help us spread the word about blood donation
            </p>
            <Link
              to="/about-our-mission"
              className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors duration-300"
            >
              <FaHeart className="text-sm" />
              Learn more about our mission
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
