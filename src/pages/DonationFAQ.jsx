import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaQuestionCircle, FaChevronDown, FaChevronUp, FaTint, FaHeartbeat, FaShieldAlt, FaClock } from "react-icons/fa";
import DynamicTitle from "../components/shared/DynamicTitle";

const DonationFAQ = () => {
    const [openFAQ, setOpenFAQ] = useState(null);
    const navigate = useNavigate();

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const handleContactSupport = () => {
        // Navigate to home page and scroll to contact section
        navigate('/', { replace: false });

        // Use setTimeout to ensure navigation completes before scrolling
        setTimeout(() => {
            const contactSection = document.getElementById('contact-us');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 100);
    };

    const handleStartDonating = () => {
        // Navigate to registration page
        navigate('/register');
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                duration: 0.6
            }
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    const faqCategories = [
        {
            title: "General Information",
            icon: FaQuestionCircle,
            color: "text-blue-600 dark:text-blue-400",
            bgColor: "bg-blue-100/80 dark:bg-blue-900/40",
            questions: [
                {
                    question: "What is blood donation and why is it important?",
                    answer: "Blood donation is the process of voluntarily giving blood to help save lives. It's crucial because blood cannot be manufactured artificially and is needed for surgeries, cancer treatments, chronic illnesses, and traumatic injuries. One donation can save up to three lives."
                },
                {
                    question: "Who can donate blood?",
                    answer: "Generally, healthy individuals aged 18-65 years, weighing at least 50kg (110 lbs), can donate blood. You must be in good health, not taking certain medications, and meet specific health criteria. Our screening process ensures donor and recipient safety."
                },
                {
                    question: "How often can I donate blood?",
                    answer: "You can donate whole blood every 56 days (8 weeks). For platelets, you can donate every 7 days, up to 24 times per year. For plasma, donations are allowed every 28 days. Our system tracks your donation history to ensure safe intervals."
                },
                {
                    question: "Is blood donation safe?",
                    answer: "Yes, blood donation is completely safe. We use sterile, single-use equipment for each donor. The donation process is conducted by trained medical professionals following strict safety protocols. There's no risk of contracting diseases from donating blood."
                }
            ]
        },
        {
            title: "Donation Process",
            icon: FaHeartbeat,
            color: "text-red-600 dark:text-red-400",
            bgColor: "bg-red-100/80 dark:bg-red-900/40",
            questions: [
                {
                    question: "What should I do before donating blood?",
                    answer: "Get a good night's sleep, eat a healthy meal 2-3 hours before donation, drink plenty of water, avoid alcohol for 24 hours, and bring a valid ID. Wear comfortable clothing with sleeves that can be rolled up easily."
                },
                {
                    question: "How long does the donation process take?",
                    answer: "The entire process takes about 45-60 minutes. This includes registration, health screening, the actual donation (8-10 minutes), and recovery time. The blood collection itself is quick and relatively painless."
                },
                {
                    question: "What happens during the donation?",
                    answer: "You'll complete a health questionnaire, undergo a mini-physical exam, have your blood type tested, then donate about 450ml of blood. Our staff will monitor you throughout the process and provide refreshments afterward."
                },
                {
                    question: "What should I do after donating?",
                    answer: "Rest for 10-15 minutes, drink plenty of fluids, avoid heavy lifting for 24 hours, keep the bandage on for 4-6 hours, and eat iron-rich foods. If you feel dizzy or unwell, contact us immediately."
                }
            ]
        },
        {
            title: "Health & Safety",
            icon: FaShieldAlt,
            color: "text-green-600 dark:text-green-400",
            bgColor: "bg-green-100/80 dark:bg-green-900/40",
            questions: [
                {
                    question: "What are the side effects of blood donation?",
                    answer: "Most people experience no side effects. Some may feel mild dizziness, fatigue, or bruising at the needle site. Serious complications are extremely rare. Our medical team is trained to handle any issues that may arise."
                },
                {
                    question: "Can I donate if I'm taking medications?",
                    answer: "It depends on the medication. Some medications may temporarily defer your donation, while others don't affect eligibility. Please inform our medical staff about all medications you're taking during the screening process."
                },
                {
                    question: "What medical conditions prevent blood donation?",
                    answer: "Conditions like HIV, hepatitis, heart disease, cancer, and certain chronic illnesses may prevent donation. Recent travel to certain countries, recent tattoos/piercings, or pregnancy may cause temporary deferral."
                },
                {
                    question: "How is donated blood tested for safety?",
                    answer: "All donated blood undergoes rigorous testing for infectious diseases including HIV, hepatitis B & C, syphilis, and other pathogens. Blood is also typed and cross-matched before transfusion to ensure compatibility."
                }
            ]
        },
        {
            title: "Platform & Process",
            icon: FaClock,
            color: "text-purple-600 dark:text-purple-400",
            bgColor: "bg-purple-100/80 dark:bg-purple-900/40",
            questions: [
                {
                    question: "How does your blood donation platform work?",
                    answer: "Our platform connects blood donors with those in need. Donors register and provide their information, while patients or hospitals can search for compatible donors in their area. We facilitate the connection and provide guidance throughout the process."
                },
                {
                    question: "Is my personal information secure?",
                    answer: "Yes, we take privacy seriously. All personal information is encrypted and stored securely. We only share necessary medical information with verified healthcare providers and recipients with your explicit consent."
                },
                {
                    question: "How do I find donors in my area?",
                    answer: "Use our search feature to find donors by blood type, location, and availability. You can filter results by distance and contact donors directly through our secure messaging system. Emergency requests are prioritized."
                },
                {
                    question: "What if I need blood urgently?",
                    answer: "For emergency situations, mark your request as 'urgent' and our system will immediately notify all compatible donors in your area. We also maintain partnerships with blood banks and hospitals for critical cases."
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white/20 to-pink-50/30 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50 backdrop-blur-sm">
            <DynamicTitle title="Donation FAQ" />

            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-40 h-40 bg-red-100/20 dark:bg-red-900/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-100/20 dark:bg-blue-900/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
                <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-green-100/20 dark:bg-green-900/10 rounded-full blur-2xl animate-pulse animation-delay-4000" />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto"
                >
                    {/* Header Section */}
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-red-50/80 dark:bg-red-900/30 backdrop-blur-sm border border-red-200/50 dark:border-red-700/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <FaQuestionCircle className="text-sm" />
                            <span className="uppercase tracking-wide">Frequently Asked Questions</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
                            Blood Donation{" "}
                            <span className="text-red-600 dark:text-red-400">FAQ</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Find answers to common questions about blood donation, our platform, and the donation process.
                            If you can't find what you're looking for, feel free to contact our support team.
                        </p>
                    </motion.div>

                    {/* FAQ Categories */}
                    <div className="space-y-12">
                        {faqCategories.map((category, categoryIndex) => (
                            <motion.div
                                key={categoryIndex}
                                variants={itemVariants}
                                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg overflow-hidden"
                            >
                                {/* Category Header */}
                                <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 ${category.bgColor} backdrop-blur-sm rounded-xl flex items-center justify-center`}>
                                            <category.icon className={`text-xl ${category.color}`} />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {category.title}
                                        </h2>
                                    </div>
                                </div>

                                {/* FAQ Items */}
                                <div className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                                    {category.questions.map((faq, faqIndex) => {
                                        const globalIndex = categoryIndex * 10 + faqIndex;
                                        const isOpen = openFAQ === globalIndex;

                                        return (
                                            <div key={faqIndex} className="group">
                                                <button
                                                    onClick={() => toggleFAQ(globalIndex)}
                                                    className="w-full p-6 text-left hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-300 focus:outline-none focus:bg-gray-50/50 dark:focus:bg-gray-800/50"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
                                                            {faq.question}
                                                        </h3>
                                                        <div className={`flex-shrink-0 w-6 h-6 ${category.color} transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                                                            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                                                        </div>
                                                    </div>
                                                </button>

                                                <AnimatePresence>
                                                    {isOpen && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="px-6 pb-6">
                                                                <div className="bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200/30 dark:border-gray-700/30">
                                                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                                                        {faq.answer}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact Section */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-16 text-center bg-gradient-to-r from-red-50/80 to-pink-50/80 dark:from-red-900/20 dark:to-pink-900/20 backdrop-blur-sm p-8 lg:p-12 rounded-2xl border border-red-200/50 dark:border-red-700/30"
                    >
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-red-100/80 dark:bg-red-900/40 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                <FaTint className="text-red-600 dark:text-red-400 text-xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Still Have Questions?
                            </h3>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Our support team is here to help you with any questions about blood donation,
                            our platform, or the donation process. Don't hesitate to reach out!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleContactSupport}
                                className="flex items-center justify-center gap-3 bg-red-600/90 dark:bg-red-600/80 backdrop-blur-sm text-white border border-red-500/30 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-red-700/90 dark:hover:bg-red-700/80 transition-all duration-300 shadow-lg hover:shadow-xl min-w-[200px] cursor-pointer"
                            >
                                <FaQuestionCircle />
                                Contact Support
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleStartDonating}
                                className="flex items-center justify-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-200 border border-white/50 dark:border-gray-700/50 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 min-w-[200px] cursor-pointer"
                            >
                                <FaHeartbeat />
                                Start Donating
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default DonationFAQ;