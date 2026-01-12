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
            color: "text-accent-blue",
            bgColor: "bg-accent-blue",
            cardClass: "card-accent card-hover-accent",
        },
        {
            icon: FaTint,
            value: "8K+",
            label: "Lives Saved",
            color: "text-primary",
            bgColor: "bg-primary/15 dark:bg-primary/20",
            cardClass: "card-primary card-hover-primary",
        },
        {
            icon: FaGlobe,
            value: "64+",
            label: "Districts Covered",
            color: "text-accent-green",
            bgColor: "bg-accent-green",
            cardClass: "card-success card-hover-success",
        },
        {
            icon: FaClock,
            value: "24/7",
            label: "Emergency Support",
            color: "text-accent-purple",
            bgColor: "bg-accent-purple",
            cardClass: "card-purple card-hover-purple",
        },
    ];

    const missionPoints = [
        {
            icon: FaHeartbeat,
            title: "Save Lives Every Day",
            description:
                "Our primary mission is to ensure that no life is lost due to blood shortage. Every donation facilitated through our platform has the potential to save up to 3 lives.",
            color: "text-primary",
            bgColor: "bg-primary/15 dark:bg-primary/20",
            cardClass: "card-primary card-hover-primary",
        },
        {
            icon: FaUsers,
            title: "Build Strong Communities",
            description:
                "We're creating a nationwide network of compassionate individuals who are ready to help their fellow citizens in times of medical emergencies.",
            color: "text-accent-blue",
            bgColor: "bg-accent-blue",
            cardClass: "card-accent card-hover-accent",
        },
        {
            icon: FaShieldAlt,
            title: "Ensure Safety & Trust",
            description:
                "We maintain the highest standards of safety and verification to ensure that every blood donation is safe, reliable, and properly screened.",
            color: "text-accent-green",
            bgColor: "bg-accent-green",
            cardClass: "card-success card-hover-success",
        },
        {
            icon: FaHandsHelping,
            title: "Simplify the Process",
            description:
                "Our user-friendly platform makes it easy for donors to register, recipients to find help, and healthcare providers to coordinate donations efficiently.",
            color: "text-accent-purple",
            bgColor: "bg-accent-purple",
            cardClass: "card-purple card-hover-purple",
        },
    ];

    const achievements = [
        {
            icon: FaAward,
            title: "Healthcare Excellence Award",
            description: "Recognized for outstanding contribution to healthcare innovation in Bangladesh",
            year: "2024",
            color: "text-accent-orange",
            bgColor: "bg-accent-orange",
            cardClass: "card-orange card-hover-orange",
        },
        {
            icon: FaUserMd,
            title: "Medical Partnership",
            description: "Partnered with 50+ hospitals and medical centers across the country",
            year: "2023",
            color: "text-accent-teal",
            bgColor: "bg-accent-teal",
            cardClass: "card-teal card-hover-teal",
        },
        {
            icon: FaHospital,
            title: "Emergency Response",
            description: "Successfully handled 500+ emergency blood requests with 95% success rate",
            year: "2023",
            color: "text-accent-purple",
            bgColor: "bg-accent-purple",
            cardClass: "card-purple card-hover-purple",
        },
    ];

    return (
        <div className="min-h-screen bg-bg-secondary/90 dark:bg-bg-secondary/95 backdrop-blur-sm">
            <DynamicTitle title="About Our Mission - BloodConnect" />

            {/* Enhanced Background Elements for dark mode */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-40 h-40 bg-primary/8 dark:bg-primary/12 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent/5 dark:bg-accent/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
                <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-green-500/5 dark:bg-green-400/10 rounded-full blur-2xl animate-pulse animation-delay-4000" />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 lg:py-24">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-6xl mx-auto"
                >
                    {/* Header Section */}
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 backdrop-blur-sm border border-red-200 dark:border-red-800 text-red-600 dark:text-red-500 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
                            <FaHeartbeat className="text-sm animate-pulse" />
                            <span className="uppercase tracking-wide">Our Mission</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-text-primary leading-tight mb-6">
                            Connecting Hearts,{" "}
                            <span className="text-red-600 dark:text-red-500">Saving Lives</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed mb-8">
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
                                className={`bg-bg-card/98 dark:bg-bg-card/95 backdrop-blur-xl p-6 rounded-2xl border border-border-primary/30 dark:border-border-primary/40 hover:bg-bg-card/100 dark:hover:bg-bg-card/98 hover:border-border-primary/50 dark:hover:border-border-primary/60 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl dark:shadow-2xl text-center ${stat.cardClass}`}
                            >
                                <div className={`w-12 h-12 ${stat.bgColor} backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm dark:shadow-lg`}>
                                    <stat.icon className={`text-xl ${stat.color}`} />
                                </div>
                                <div className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm font-medium text-text-secondary">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Mission Statement */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-bg-card/98 dark:bg-bg-card/95 backdrop-blur-xl rounded-2xl border border-border-primary/30 shadow-lg dark:shadow-2xl p-8 lg:p-12 mb-16"
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
                                Our Vision for Bangladesh
                            </h2>
                            <p className="text-lg text-text-secondary leading-relaxed max-w-4xl mx-auto">
                                We envision a Bangladesh where every person has access to safe blood when they need it most.
                                Through technology, community building, and unwavering commitment to healthcare excellence,
                                we're transforming how blood donation works in our country.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div className="space-y-6">
                                <div className="bg-primary/8 dark:bg-primary/15 backdrop-blur-sm p-6 rounded-xl border border-primary/30 dark:border-primary/40">
                                    <h3 className="text-xl font-bold text-text-primary mb-3">The Challenge</h3>
                                    <p className="text-text-secondary leading-relaxed">
                                        Bangladesh faces a critical blood shortage with over 800,000 units needed annually,
                                        but only 300,000 units collected. Traditional systems are fragmented, slow, and often fail
                                        during emergencies when every minute counts.
                                    </p>
                                </div>
                                <div className="bg-green-600/8 dark:bg-green-400/15 backdrop-blur-sm p-6 rounded-xl border border-green-600/30 dark:border-green-400/40">
                                    <h3 className="text-xl font-bold text-text-primary mb-3">Our Solution</h3>
                                    <p className="text-text-secondary leading-relaxed">
                                        BloodConnect leverages technology to create real-time connections between donors and recipients,
                                        with verified profiles, instant notifications, and seamless coordination with healthcare facilities
                                        across all 64 districts.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-primary/15 to-primary/8 dark:from-primary/20 dark:to-primary/10 backdrop-blur-xl p-8 rounded-2xl border border-primary/30 dark:border-primary/40 shadow-lg dark:shadow-xl">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-primary/15 dark:bg-primary/25 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FaHeartbeat className="text-2xl text-primary animate-pulse" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-text-primary mb-4">
                                        Every 2 Minutes
                                    </h3>
                                    <p className="text-text-secondary leading-relaxed">
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
                            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                                How We Make a Difference
                            </h2>
                            <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
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
                                    className={`bg-bg-card/98 dark:bg-bg-card/95 backdrop-blur-xl p-8 rounded-2xl border border-border-primary/30 dark:border-border-primary/40 hover:bg-bg-card/100 dark:hover:bg-bg-card/98 hover:border-border-primary/50 dark:hover:border-border-primary/60 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl dark:shadow-2xl ${point.cardClass}`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-14 h-14 ${point.bgColor} backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm dark:shadow-lg`}>
                                            <point.icon className={`text-xl ${point.color}`} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-text-primary mb-3">
                                                {point.title}
                                            </h3>
                                            <p className="text-text-secondary leading-relaxed">
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
                            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                                Our Achievements
                            </h2>
                            <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
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
                                    className={`bg-bg-card/98 dark:bg-bg-card/95 backdrop-blur-xl p-6 rounded-2xl border border-border-primary/30 dark:border-border-primary/40 hover:bg-bg-card/100 dark:hover:bg-bg-card/98 hover:border-border-primary/50 dark:hover:border-border-primary/60 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl dark:shadow-2xl text-center ${achievement.cardClass}`}
                                >
                                    <div className={`w-16 h-16 ${achievement.bgColor} backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm dark:shadow-lg`}>
                                        <achievement.icon className={`text-2xl ${achievement.color}`} />
                                    </div>
                                    <div className="text-sm font-semibold text-primary mb-2">
                                        {achievement.year}
                                    </div>
                                    <h3 className="text-lg font-bold text-text-primary mb-3">
                                        {achievement.title}
                                    </h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        {achievement.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Call to Action */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-gradient-to-r from-primary/15 to-primary/8 dark:from-primary/20 dark:to-primary/10 backdrop-blur-xl p-8 lg:p-12 rounded-2xl border border-primary/30 dark:border-primary/40 text-center shadow-lg dark:shadow-2xl hover:shadow-xl dark:hover:shadow-3xl transition-all duration-300"
                    >
                        <div className="max-w-3xl mx-auto">
                            <div className="w-16 h-16 bg-primary/15 dark:bg-primary/25 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg dark:shadow-xl">
                                <FaHeartbeat className="text-2xl text-primary animate-pulse" />
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
                                Join Our Life-Saving Mission
                            </h2>
                            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
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
                                        className="flex items-center justify-center gap-3 bg-primary/95 dark:bg-primary/90 backdrop-blur-sm text-text-inverse border border-primary/30 dark:border-primary/40 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-hover/95 dark:hover:bg-primary-hover/90 transition-all duration-300 shadow-lg hover:shadow-xl dark:shadow-primary/20 dark:hover:shadow-primary/30 min-w-[200px]"
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
                                        className="flex items-center justify-center gap-3 bg-bg-card/95 dark:bg-bg-card/90 backdrop-blur-sm text-text-primary border border-border-primary/50 dark:border-border-primary/60 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-bg-card/98 dark:hover:bg-bg-card/95 transition-all duration-300 shadow-lg hover:shadow-xl dark:shadow-2xl min-w-[200px]"
                                    >
                                        <FaUsers />
                                        Find Donors
                                    </Link>
                                </motion.div>
                            </div>
                            <div className="mt-6 flex items-center justify-center gap-2 text-text-secondary">
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