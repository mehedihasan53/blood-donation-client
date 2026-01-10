import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FaHeartbeat,
    FaUsers,
    FaHandsHelping,
    FaArrowRight,
    FaTint,
    FaGlobe,
    FaShieldAlt,
    FaClock,
    FaAward,
    FaUserMd,
    FaHospital,
    FaPhone,
} from "react-icons/fa";
import DynamicTitle from "../components/shared/DynamicTitle";

const AboutOurMission = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                duration: 0.6,
            },
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

    const stats = [
        {
            icon: FaUsers,
            value: "15K+",
            label: "Registered Donors",
            color: "text-blue-600 dark:text-blue-400",
            bgColor: "bg-blue-100/80 dark:bg-blue-900/40",
        },
        {
            icon: FaTint,
            value: "8K+",
            label: "Lives Saved",
            color: "text-red-600 dark:text-red-400",
            bgColor: "bg-red-100/80 dark:bg-red-900/40",
        },
        {
            icon: FaGlobe,
            value: "64+",
            label: "Districts Covered",
            color: "text-green-600 dark:text-green-400",
            bgColor: "bg-green-100/80 dark:bg-green-900/40",
        },
        {
            icon: FaClock,
            value: "24/7",
            label: "Emergency Support",
            color: "text-purple-600 dark:text-purple-400",
            bgColor: "bg-purple-100/80 dark:bg-purple-900/40",
        },
    ];

    const missionPoints = [
        {
            icon: FaHeartbeat,
            title: "Save Lives Every Day",
            description:
                "Our primary mission is to ensure that no life is lost due to blood shortage. Every donation facilitated through our platform has the potential to save up to 3 lives.",
            color: "text-red-600 dark:text-red-400",
            bgColor: "bg-red-100/80 dark:bg-red-900/40",
        },
        {
            icon: FaUsers,
            title: "Build Strong Communities",
            description:
                "We're creating a nationwide network of compassionate individuals who are ready to help their fellow citizens in times of medical emergencies.",
            color: "text-blue-600 dark:text-blue-400",
            bgColor: "bg-blue-100/80 dark:bg-blue-900/40",
        },
        {
            icon: FaShieldAlt,
            title: "Ensure Safety & Trust",
            description:
                "We maintain the highest standards of safety and verification to ensure that every blood donation is safe, reliable, and properly screened.",
            color: "text-green-600 dark:text-green-400",
            bgColor: "bg-green-100/80 dark:bg-green-900/40",
        },
        {
            icon: FaHandsHelping,
            title: "Simplify the Process",
            description:
                "Our user-friendly platform makes it easy for donors to register, recipients to find help, and healthcare providers to coordinate donations efficiently.",
            color: "text-purple-600 dark:text-purple-400",
            bgColor: "bg-purple-100/80 dark:bg-purple-900/40",
        },
    ];

    const achievements = [
        {
            icon: FaAward,
            title: "Healthcare Excellence Award",
            description: "Recognized for outstanding contribution to healthcare innovation in Bangladesh",
            year: "2024",
        },
        {
            icon: FaUserMd,
            title: "Medical Partnership",
            description: "Partnered with 50+ hospitals and medical centers across the country",
            year: "2023",
        },
        {
            icon: FaHospital,
            title: "Emergency Response",
            description: "Successfully handled 500+ emergency blood requests with 95% success rate",
            year: "2023",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white/20 to-pink-50/30 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50 backdrop-blur-sm">
            <DynamicTitle title="About Our Mission - BloodConnect" />

            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-40 h-40 bg-red-100/20 dark:bg-red-900/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-48 h-48 bg-pink-100/20 dark:bg-pink-900/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
                <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-100/20 dark:bg-blue-900/10 rounded-full blur-2xl animate-pulse animation-delay-4000" />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-25 pb-10 lg:py-24">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-6xl mx-auto"
                >
                    {/* Header Section */}
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-red-50/80 dark:bg-red-900/30 backdrop-blur-sm border border-red-200/50 dark:border-red-700/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <FaHeartbeat className="text-sm animate-pulse" />
                            <span className="uppercase tracking-wide">Our Mission</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
                            Connecting Hearts,{" "}
                            <span className="text-red-600 dark:text-red-400">
                                Saving Lives
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                            BloodConnect is more than just a platform – we're a movement dedicated to ensuring that no life is lost
                            due to blood shortage. Our mission is to create the most trusted, efficient, and compassionate blood
                            donation network in Bangladesh, connecting those who can give with those who desperately need.
                        </p>
                    </motion.div>

                    {/* Stats Section */}
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/30 dark:border-gray-700/30 hover:bg-white/90 dark:hover:bg-gray-900/90 hover:border-white/40 dark:hover:border-gray-700/40 transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-lg text-center"
                            >
                                <div className={`w-12 h-12 ${stat.bgColor} backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4`}>
                                    <stat.icon className={`text-xl ${stat.color}`} />
                                </div>
                                <div className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Mission Statement */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg p-8 lg:p-12 mb-16"
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                Our Vision for Bangladesh
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
                                We envision a Bangladesh where every person has access to safe blood when they need it most.
                                Through technology, community building, and unwavering commitment to healthcare excellence,
                                we're transforming how blood donation works in our country.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div className="space-y-6">
                                <div className="bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm p-6 rounded-xl border border-red-200/50 dark:border-red-700/30">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">The Challenge</h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        Bangladesh faces a critical blood shortage with over 800,000 units needed annually,
                                        but only 300,000 units collected. Traditional systems are fragmented, slow, and often fail
                                        during emergencies when every minute counts.
                                    </p>
                                </div>
                                <div className="bg-green-50/80 dark:bg-green-900/20 backdrop-blur-sm p-6 rounded-xl border border-green-200/50 dark:border-green-700/30">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Our Solution</h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        BloodConnect leverages technology to create real-time connections between donors and recipients,
                                        with verified profiles, instant notifications, and seamless coordination with healthcare facilities
                                        across all 64 districts.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-red-100/50 to-pink-100/50 dark:from-red-900/20 dark:to-pink-900/20 backdrop-blur-sm p-8 rounded-2xl border border-red-200/50 dark:border-red-700/30">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-red-100/80 dark:bg-red-900/40 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FaHeartbeat className="text-2xl text-red-600 dark:text-red-400 animate-pulse" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        Every 2 Minutes
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        Someone in Bangladesh needs blood. Our platform ensures they can find help quickly,
                                        safely, and reliably through our network of verified donors.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Mission Points */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                How We Make a Difference
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                                Our comprehensive approach addresses every aspect of blood donation, from donor recruitment
                                to emergency response, ensuring maximum impact and safety.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {missionPoints.map((point, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl border border-white/30 dark:border-gray-700/30 hover:bg-white/90 dark:hover:bg-gray-900/90 hover:border-white/40 dark:hover:border-gray-700/40 transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-lg"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-14 h-14 ${point.bgColor} backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0`}>
                                            <point.icon className={`text-xl ${point.color}`} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                                {point.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                                {point.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Achievements Section */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                Our Achievements
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                                Recognition and milestones that reflect our commitment to excellence in healthcare innovation.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {achievements.map((achievement, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/30 dark:border-gray-700/30 hover:bg-white/90 dark:hover:bg-gray-900/90 hover:border-white/40 dark:hover:border-gray-700/40 transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-lg text-center"
                                >
                                    <div className="w-16 h-16 bg-yellow-100/80 dark:bg-yellow-900/40 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                                        <achievement.icon className="text-2xl text-yellow-600 dark:text-yellow-400" />
                                    </div>
                                    <div className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">
                                        {achievement.year}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                                        {achievement.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                                        {achievement.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Call to Action */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-gradient-to-r from-red-50/80 to-pink-50/80 dark:from-red-900/20 dark:to-pink-900/20 backdrop-blur-sm p-8 lg:p-12 rounded-2xl border border-red-200/50 dark:border-red-700/30 text-center"
                    >
                        <div className="max-w-3xl mx-auto">
                            <div className="w-16 h-16 bg-red-100/80 dark:bg-red-900/40 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaHeartbeat className="text-2xl text-red-600 dark:text-red-400 animate-pulse" />
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                Join Our Life-Saving Mission
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                Every hero starts with a single step. Whether you're ready to become a donor, need assistance,
                                or want to support our cause, there's a place for you in our community.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Link
                                        to="/register"
                                        className="flex items-center justify-center gap-3 bg-red-600/90 dark:bg-red-600/80 backdrop-blur-sm text-white border border-red-500/30 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-red-700/90 dark:hover:bg-red-700/80 transition-all duration-300 shadow-lg hover:shadow-xl min-w-[200px]"
                                    >
                                        <FaHeartbeat />
                                        Become a Donor
                                        <FaArrowRight className="text-sm" />
                                    </Link>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Link
                                        to="/search"
                                        className="flex items-center justify-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-200 border border-white/50 dark:border-gray-700/50 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 min-w-[200px]"
                                    >
                                        <FaUsers />
                                        Find Donors
                                    </Link>
                                </motion.div>
                            </div>
                            <div className="mt-6 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                                <FaPhone className="text-sm" />
                                <span className="text-sm">Emergency Hotline: +880-1234-567890</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutOurMission;