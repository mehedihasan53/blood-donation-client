import { motion } from "framer-motion";
import { FaGavel, FaUserCheck, FaExclamationTriangle, FaHandshake, FaShieldAlt, FaUsers, FaEnvelope, FaCalendarAlt, FaBan } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DynamicTitle from "../components/shared/DynamicTitle";

const TermsOfService = () => {
    const navigate = useNavigate();

    const handleContactSupport = () => {
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
            id: "acceptance-terms",
            title: "Acceptance of Terms",
            icon: FaHandshake,
            color: "text-blue-600 dark:text-blue-400",
            bgColor: "bg-blue-100/80 dark:bg-blue-900/40",
            content: [
                {
                    subtitle: "Agreement to Terms",
                    text: "By accessing and using BloodConnect, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
                },
                {
                    subtitle: "Legal Capacity",
                    text: "You must be at least 18 years old or have reached the age of majority in your jurisdiction to use our services. If you are under 18, you may only use our services with the involvement and consent of a parent or guardian."
                },
                {
                    subtitle: "Platform Purpose",
                    text: "BloodConnect is designed to facilitate blood donation by connecting donors with recipients in need. By using our platform, you acknowledge that this is a life-saving service that requires accuracy, honesty, and responsibility from all users."
                }
            ]
        },
        {
            id: "user-responsibilities",
            title: "User Responsibilities and Conduct",
            icon: FaUserCheck,
            color: "text-green-600 dark:text-green-400",
            bgColor: "bg-green-100/80 dark:bg-green-900/40",
            content: [
                {
                    subtitle: "Accurate Information",
                    text: "You agree to provide accurate, current, and complete information about yourself, including medical history, blood type, and contact details. False information could endanger lives and is strictly prohibited."
                },
                {
                    subtitle: "Eligibility Requirements",
                    text: "You must meet all medical and legal requirements for blood donation as established by healthcare authorities. You are responsible for ensuring your eligibility and maintaining current health status information."
                },
                {
                    subtitle: "Prohibited Activities",
                    text: "You may not use our platform for any unlawful purpose, to harass other users, to spread false medical information, or to engage in any activity that could compromise the safety and integrity of the blood donation process."
                }
            ]
        },
        {
            id: "medical-disclaimers",
            title: "Medical Disclaimers and Limitations",
            icon: FaExclamationTriangle,
            color: "text-red-600 dark:text-red-400",
            bgColor: "bg-red-100/80 dark:bg-red-900/40",
            content: [
                {
                    subtitle: "Not Medical Advice",
                    text: "BloodConnect is a platform service and does not provide medical advice, diagnosis, or treatment. All medical decisions should be made in consultation with qualified healthcare professionals."
                },
                {
                    subtitle: "Medical Screening",
                    text: "All blood donations must go through proper medical screening by qualified healthcare facilities. Our platform facilitates connections but does not replace professional medical evaluation and testing."
                },
                {
                    subtitle: "Health and Safety",
                    text: "Users are responsible for their own health and safety. We strongly recommend consulting with healthcare providers before donating or receiving blood, and following all medical protocols and guidelines."
                }
            ]
        },
        {
            id: "platform-services",
            title: "Platform Services and Availability",
            icon: FaUsers,
            color: "text-purple-600 dark:text-purple-400",
            bgColor: "bg-purple-100/80 dark:bg-purple-900/40",
            content: [
                {
                    subtitle: "Service Description",
                    text: "We provide a digital platform that connects blood donors with recipients, facilitates communication, and maintains donor databases. We do not directly handle, store, or transport blood products."
                },
                {
                    subtitle: "Service Availability",
                    text: "While we strive to maintain continuous service availability, we cannot guarantee uninterrupted access. The platform may be temporarily unavailable due to maintenance, technical issues, or circumstances beyond our control."
                },
                {
                    subtitle: "Geographic Limitations",
                    text: "Our services are primarily designed for users in Bangladesh. Availability and features may vary by location, and we may restrict access from certain jurisdictions due to legal or operational constraints."
                }
            ]
        },
        {
            id: "liability-limitations",
            title: "Liability and Risk Limitations",
            icon: FaShieldAlt,
            color: "text-orange-600 dark:text-orange-400",
            bgColor: "bg-orange-100/80 dark:bg-orange-900/40",
            content: [
                {
                    subtitle: "Platform Liability",
                    text: "BloodConnect serves as an intermediary platform. We are not liable for the medical outcomes, compatibility, or safety of blood donations facilitated through our service. All medical responsibility lies with healthcare providers and medical facilities."
                },
                {
                    subtitle: "User Interactions",
                    text: "We are not responsible for disputes, conflicts, or issues arising between users. Users interact at their own risk and should exercise appropriate caution when meeting or communicating with other platform users."
                },
                {
                    subtitle: "Third-Party Services",
                    text: "Our platform may integrate with third-party services, healthcare facilities, or payment processors. We are not responsible for the actions, policies, or services of these third parties."
                }
            ]
        },
        {
            id: "account-termination",
            title: "Account Management and Termination",
            icon: FaBan,
            color: "text-gray-600 dark:text-gray-400",
            bgColor: "bg-gray-100/80 dark:bg-gray-900/40",
            content: [
                {
                    subtitle: "Account Suspension",
                    text: "We reserve the right to suspend or terminate accounts that violate these terms, provide false information, or engage in activities that compromise platform safety or integrity."
                },
                {
                    subtitle: "User-Initiated Termination",
                    text: "You may terminate your account at any time by contacting our support team. Upon termination, your personal data will be handled according to our Privacy Policy and applicable legal requirements."
                },
                {
                    subtitle: "Data Retention",
                    text: "Even after account termination, we may retain certain information as required by law, for safety records, or to prevent fraud. Critical medical and donation history may be preserved for healthcare and safety purposes."
                }
            ]
        },
        {
            id: "legal-compliance",
            title: "Legal Compliance and Governing Law",
            icon: FaGavel,
            color: "text-indigo-600 dark:text-indigo-400",
            bgColor: "bg-indigo-100/80 dark:bg-indigo-900/40",
            content: [
                {
                    subtitle: "Governing Law",
                    text: "These terms are governed by the laws of Bangladesh. Any disputes arising from the use of our services will be subject to the jurisdiction of Bangladesh courts."
                },
                {
                    subtitle: "Healthcare Regulations",
                    text: "All blood donation activities facilitated through our platform must comply with Bangladesh healthcare regulations, blood bank standards, and medical safety protocols."
                },
                {
                    subtitle: "Changes to Terms",
                    text: "We reserve the right to modify these terms at any time. Users will be notified of significant changes, and continued use of the platform constitutes acceptance of updated terms."
                }
            ]
        }
    ];

    const lastUpdated = "January 10, 2026";

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white/20 to-orange-50/30 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50 backdrop-blur-sm">
            <DynamicTitle title="Terms of Service" />

            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-40 h-40 bg-red-100/20 dark:bg-red-900/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-48 h-48 bg-orange-100/20 dark:bg-orange-900/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
                <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-yellow-100/20 dark:bg-yellow-900/10 rounded-full blur-2xl animate-pulse animation-delay-4000" />
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
                            <FaGavel className="text-sm" />
                            <span className="uppercase tracking-wide">Legal Agreement</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
                            Terms of{" "}
                            <span className="text-red-600 dark:text-red-400">Service</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6">
                            These terms govern your use of BloodConnect and establish the legal framework for our
                            life-saving blood donation platform. Please read carefully before using our services.
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
                            <div className="w-8 h-8 bg-red-100/80 dark:bg-red-900/40 backdrop-blur-sm rounded-lg flex items-center justify-center">
                                <FaGavel className="text-red-600 dark:text-red-400 text-sm" />
                            </div>
                            Legal Agreement Overview
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                            Welcome to BloodConnect, Bangladesh's premier blood donation platform. These Terms of Service constitute a
                            legally binding agreement between you and BloodConnect regarding your use of our platform, services, and features.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                            Our platform facilitates life-saving connections between blood donors and recipients. Given the critical nature
                            of our services, these terms include important provisions regarding medical disclaimers, user responsibilities,
                            and safety protocols that all users must understand and follow.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            By creating an account, accessing our website, or using any of our services, you acknowledge that you have read,
                            understood, and agree to be bound by these terms in their entirety.
                        </p>
                    </motion.div>

                    {/* Terms of Service Sections */}
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
                        className="mt-16 bg-gradient-to-r from-red-50/80 to-orange-50/80 dark:from-red-900/20 dark:to-orange-900/20 backdrop-blur-sm p-8 lg:p-12 rounded-2xl border border-red-200/50 dark:border-red-700/30"
                    >
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-red-100/80 dark:bg-red-900/40 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                    <FaEnvelope className="text-red-600 dark:text-red-400 text-xl" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Questions About These Terms?
                                </h3>
                            </div>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                                If you have any questions about these Terms of Service, need clarification on any provisions,
                                or require legal assistance, please contact our support team. We're here to help ensure you
                                understand your rights and responsibilities.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <motion.button
                                    onClick={handleContactSupport}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center justify-center gap-3 bg-red-600/90 dark:bg-red-600/80 backdrop-blur-sm text-white border border-red-500/30 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-red-700/90 dark:hover:bg-red-700/80 transition-all duration-300 shadow-lg hover:shadow-xl min-w-[200px]"
                                >
                                    <FaEnvelope />
                                    Contact Support
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center justify-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-200 border border-white/50 dark:border-gray-700/50 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 min-w-[200px]"
                                >
                                    <FaGavel />
                                    Legal Resources
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Important Notice */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-8 bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm p-6 rounded-2xl border border-red-200/50 dark:border-red-700/30"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-red-100/80 dark:bg-red-900/40 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 text-sm mt-1 flex-shrink-0">
                                ⚠️
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                                    Important Legal Notice
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                    These Terms of Service may be updated periodically to reflect changes in our services,
                                    legal requirements, or operational procedures. Material changes will be communicated to users
                                    through email notifications or platform announcements. Your continued use of BloodConnect
                                    after such changes constitutes acceptance of the updated terms. For questions about specific
                                    legal provisions, please consult with qualified legal counsel.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default TermsOfService;