import { motion } from "framer-motion";
import { FaShieldAlt, FaUserShield, FaLock, FaEye, FaDatabase, FaCookie, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DynamicTitle from "../components/shared/DynamicTitle";

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    const handleContactPrivacyTeam = () => {
        navigate('/', { state: { scrollToContact: true } });
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

    const sections = [
        {
            id: "information-collection",
            title: "Information We Collect",
            icon: FaDatabase,
            color: "text-blue-600 dark:text-blue-400",
            bgColor: "bg-blue-100/80 dark:bg-blue-900/40",
            content: [
                {
                    subtitle: "Personal Information",
                    text: "We collect personal information that you voluntarily provide when registering as a donor, creating donation requests, or contacting us. This includes your name, email address, phone number, blood type, location, and medical history relevant to blood donation."
                },
                {
                    subtitle: "Usage Information",
                    text: "We automatically collect information about how you use our platform, including your IP address, browser type, device information, pages visited, and interaction patterns. This helps us improve our services and user experience."
                },
                {
                    subtitle: "Location Data",
                    text: "With your consent, we collect location information to help match donors with recipients in nearby areas. You can disable location services at any time through your device settings or account preferences."
                }
            ]
        },
        {
            id: "information-use",
            title: "How We Use Your Information",
            icon: FaUserShield,
            color: "text-green-600 dark:text-green-400",
            bgColor: "bg-green-100/80 dark:bg-green-900/40",
            content: [
                {
                    subtitle: "Platform Services",
                    text: "We use your information to provide our blood donation matching services, facilitate connections between donors and recipients, verify eligibility, and maintain accurate donor records for safety purposes."
                },
                {
                    subtitle: "Communication",
                    text: "We may contact you about donation opportunities, urgent blood requests in your area, platform updates, and important safety information. You can opt out of non-essential communications at any time."
                },
                {
                    subtitle: "Safety and Security",
                    text: "Your information helps us maintain platform security, prevent fraud, ensure donor and recipient safety, and comply with healthcare regulations and blood donation standards."
                }
            ]
        },
        {
            id: "information-sharing",
            title: "Information Sharing and Disclosure",
            icon: FaEye,
            color: "text-purple-600 dark:text-purple-400",
            bgColor: "bg-purple-100/80 dark:bg-purple-900/40",
            content: [
                {
                    subtitle: "Healthcare Providers",
                    text: "We may share relevant medical information with verified healthcare providers, blood banks, and hospitals to facilitate safe blood donations and transfusions, always with appropriate consent and security measures."
                },
                {
                    subtitle: "Emergency Situations",
                    text: "In life-threatening emergencies, we may share necessary contact and medical information with emergency responders, hospitals, or blood banks to save lives, as permitted by applicable laws."
                },
                {
                    subtitle: "Legal Requirements",
                    text: "We may disclose information when required by law, court order, or government regulation, or to protect our rights, users' safety, or investigate potential violations of our terms of service."
                }
            ]
        },
        {
            id: "data-security",
            title: "Data Security and Protection",
            icon: FaLock,
            color: "text-red-600 dark:text-red-400",
            bgColor: "bg-red-100/80 dark:bg-red-900/40",
            content: [
                {
                    subtitle: "Encryption and Security",
                    text: "We implement industry-standard security measures including SSL encryption, secure servers, and regular security audits to protect your personal and medical information from unauthorized access, disclosure, or misuse."
                },
                {
                    subtitle: "Access Controls",
                    text: "Access to your information is restricted to authorized personnel who need it to provide services. All staff undergo security training and are bound by confidentiality agreements."
                },
                {
                    subtitle: "Data Retention",
                    text: "We retain your information only as long as necessary to provide services, comply with legal obligations, and maintain safety records. You can request data deletion subject to legal and safety requirements."
                }
            ]
        },
        {
            id: "cookies-tracking",
            title: "Cookies and Tracking Technologies",
            icon: FaCookie,
            color: "text-orange-600 dark:text-orange-400",
            bgColor: "bg-orange-100/80 dark:bg-orange-900/40",
            content: [
                {
                    subtitle: "Essential Cookies",
                    text: "We use essential cookies to enable core platform functionality, maintain your login session, and remember your preferences. These cookies are necessary for the platform to work properly."
                },
                {
                    subtitle: "Analytics and Performance",
                    text: "We use analytics cookies to understand how users interact with our platform, identify areas for improvement, and optimize performance. This data is aggregated and anonymized."
                },
                {
                    subtitle: "Cookie Management",
                    text: "You can control cookie settings through your browser preferences. However, disabling certain cookies may limit platform functionality and your user experience."
                }
            ]
        },
        {
            id: "user-rights",
            title: "Your Rights and Choices",
            icon: FaUserShield,
            color: "text-indigo-600 dark:text-indigo-400",
            bgColor: "bg-indigo-100/80 dark:bg-indigo-900/40",
            content: [
                {
                    subtitle: "Access and Correction",
                    text: "You have the right to access, review, and correct your personal information. You can update most information through your account settings or by contacting our support team."
                },
                {
                    subtitle: "Data Portability",
                    text: "You can request a copy of your personal data in a structured, machine-readable format. We will provide this information within a reasonable timeframe and in compliance with applicable laws."
                },
                {
                    subtitle: "Account Deletion",
                    text: "You can request deletion of your account and associated data. We may retain certain information as required by law or for legitimate business purposes, such as safety records and transaction history."
                }
            ]
        }
    ];

    const lastUpdated = "January 10, 2026";

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white/20 to-indigo-50/30 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50 backdrop-blur-sm">
            <DynamicTitle title="Privacy Policy" />

            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-40 h-40 bg-blue-100/20 dark:bg-blue-900/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-48 h-48 bg-indigo-100/20 dark:bg-indigo-900/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
                <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-purple-100/20 dark:bg-purple-900/10 rounded-full blur-2xl animate-pulse animation-delay-4000" />
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
                        <div className="inline-flex items-center gap-2 bg-blue-50/80 dark:bg-blue-900/30 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <FaShieldAlt className="text-sm" />
                            <span className="uppercase tracking-wide">Privacy & Security</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
                            Privacy{" "}
                            <span className="text-blue-600 dark:text-blue-400">Policy</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6">
                            Your privacy and the security of your personal information are fundamental to our mission.
                            This policy explains how we collect, use, and protect your data when you use our blood donation platform.
                        </p>
                        <div className="inline-flex items-center gap-2 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 text-gray-600 dark:text-gray-400 px-4 py-2 rounded-full text-sm">
                            <FaCalendarAlt className="text-sm" />
                            <span>Last Updated: {lastUpdated}</span>
                        </div>
                    </motion.div>

                    {/* Introduction */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg p-8 mb-12"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100/80 dark:bg-blue-900/40 backdrop-blur-sm rounded-lg flex items-center justify-center">
                                <FaShieldAlt className="text-blue-600 dark:text-blue-400 text-sm" />
                            </div>
                            Our Commitment to Privacy
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                            BloodConnect is committed to protecting your privacy and maintaining the confidentiality of your personal and medical information.
                            As a healthcare-related platform, we understand the sensitive nature of the data we handle and have implemented comprehensive
                            measures to ensure your information is secure, used appropriately, and shared only when necessary for life-saving purposes.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            This Privacy Policy applies to all users of our platform, including blood donors, recipients, healthcare providers, and visitors.
                            By using our services, you agree to the collection and use of information in accordance with this policy.
                        </p>
                    </motion.div>

                    {/* Privacy Policy Sections */}
                    <div className="space-y-8">
                        {sections.map((section) => (
                            <motion.div
                                key={section.id}
                                variants={itemVariants}
                                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg overflow-hidden"
                            >
                                {/* Section Header */}
                                <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 ${section.bgColor} backdrop-blur-sm rounded-xl flex items-center justify-center`}>
                                            <section.icon className={`text-xl ${section.color}`} />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {section.title}
                                        </h2>
                                    </div>
                                </div>

                                {/* Section Content */}
                                <div className="p-6 space-y-6">
                                    {section.content.map((item, itemIndex) => (
                                        <div key={itemIndex} className="space-y-3">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {item.subtitle}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                                {item.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact Information */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-16 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 backdrop-blur-sm p-8 lg:p-12 rounded-2xl border border-blue-200/50 dark:border-blue-700/30"
                    >
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-blue-100/80 dark:bg-blue-900/40 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                    <FaEnvelope className="text-blue-600 dark:text-blue-400 text-xl" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Questions About Privacy?
                                </h3>
                            </div>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                                If you have any questions about this Privacy Policy, your personal data, or our privacy practices,
                                please don't hesitate to contact our privacy team. We're here to help and ensure your concerns are addressed promptly.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <motion.button
                                    onClick={handleContactPrivacyTeam}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center justify-center gap-3 bg-blue-600/90 dark:bg-blue-600/80 backdrop-blur-sm text-white border border-blue-500/30 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700/90 dark:hover:bg-blue-700/80 transition-all duration-300 shadow-lg hover:shadow-xl min-w-[200px]"
                                >
                                    <FaEnvelope />
                                    Contact Privacy Team
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center justify-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-200 border border-white/50 dark:border-gray-700/50 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 min-w-[200px]"
                                >
                                    <FaShieldAlt />
                                    Security Center
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Policy Updates Notice */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-8 bg-yellow-50/80 dark:bg-yellow-900/20 backdrop-blur-sm p-6 rounded-2xl border border-yellow-200/50 dark:border-yellow-700/30"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-yellow-100/80 dark:bg-yellow-900/40 rounded-full flex items-center justify-center text-yellow-600 dark:text-yellow-400 text-sm mt-1 flex-shrink-0">
                                ⚠️
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                                    Policy Updates
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                    We may update this Privacy Policy from time to time to reflect changes in our practices, technology,
                                    legal requirements, or other factors. We will notify you of any material changes by posting the updated
                                    policy on our platform and updating the "Last Updated" date. Your continued use of our services after
                                    such changes constitutes acceptance of the updated policy.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;