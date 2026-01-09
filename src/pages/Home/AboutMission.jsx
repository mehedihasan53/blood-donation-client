import { motion } from "framer-motion";
import {
    FaHeartbeat,
    FaUsers,
    FaHandsHelping,
    FaTint,
    FaGlobe,
} from "react-icons/fa";

const AboutMission = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                duration: 0.6,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    const stats = [
        {
            icon: FaUsers,
            value: "10K+",
            label: "Active Donors",
            color: "text-blue-600 dark:text-blue-400",
        },
        {
            icon: FaTint,
            value: "5K+",
            label: "Lives Saved",
            color: "text-red-600 dark:text-red-400",
        },
        {
            icon: FaGlobe,
            value: "64+",
            label: "Districts Covered",
            color: "text-green-600 dark:text-green-400",
        },
    ];

    const features = [
        {
            icon: FaHeartbeat,
            title: "Save Lives",
            description:
                "Every donation can save up to 3 lives. Your contribution makes a real difference in emergency situations.",
        },
        {
            icon: FaUsers,
            title: "Build Community",
            description:
                "Connect with like-minded individuals who share the passion for helping others in their time of need.",
        },
        {
            icon: FaHandsHelping,
            title: "Easy Process",
            description:
                "Our streamlined platform makes it simple to find donors, request blood, and coordinate donations safely.",
        },
    ];

    return (
        <section
            id="about-mission"
            className="relative py-5 lg:py-10 bg-gradient-to-br from-red-50/40 via-white/30 to-pink-50/40 dark:from-gray-900/60 dark:via-gray-800/40 dark:to-gray-900/60 backdrop-blur-sm overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-40 h-40 bg-red-100/30 dark:bg-red-900/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-48 h-48 bg-pink-100/30 dark:bg-pink-900/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-100/20 dark:bg-blue-900/15 rounded-full blur-2xl animate-pulse animation-delay-4000" />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="max-w-6xl mx-auto"
                >
                    {/* Section Header */}
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-red-50/80 dark:bg-red-900/30 backdrop-blur-sm border border-red-200/50 dark:border-red-700/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <FaHeartbeat className="text-sm animate-pulse" />
                            <span className="uppercase tracking-wide">Our Mission</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
                            Connecting Hearts,{" "}
                            <span className="text-red-600 dark:text-red-400">
                                Saving Lives
                            </span>
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            We believe that every drop of blood donated is a gift of life. Our
                            mission is to create a seamless, trustworthy platform that
                            connects blood donors with those in urgent need, ensuring no life
                            is lost due to blood shortage.
                        </p>
                    </motion.div>

                    {/* Stats Section */}
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/30 dark:border-gray-700/30 hover:bg-white/90 dark:hover:bg-gray-900/90 hover:border-white/40 dark:hover:border-gray-700/40 transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-lg text-center"
                            >
                                <div
                                    className={`w-12 h-12 ${stat.color.replace("text-", "bg-").replace("dark:text-", "dark:bg-").replace("-600", "-100").replace("-400", "-900/40")} backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4`}
                                >
                                    <stat.icon className={`text-xl ${stat.color}`} />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
                        {/* Mission Content */}
                        <motion.div variants={itemVariants} className="space-y-8">
                            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Why Blood Donation Matters
                                </h3>
                                <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                                    <p>
                                        In Bangladesh, thousands of people require blood
                                        transfusions daily due to accidents, surgeries, and medical
                                        conditions. Unfortunately, blood shortage remains a critical
                                        challenge in our healthcare system.
                                    </p>
                                    <p>
                                        Our platform bridges this gap by creating a reliable network
                                        of voluntary blood donors who are ready to help in times of
                                        emergency. We ensure that every donation request reaches the
                                        right donors quickly and efficiently.
                                    </p>
                                    <p>
                                        Together, we're building a community where no one has to
                                        worry about finding blood when they need it most. Every
                                        registered donor becomes a potential lifesaver.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Features Grid */}
                        <motion.div variants={itemVariants} className="space-y-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl p-6 rounded-2xl border border-white/30 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-900/80 hover:border-white/40 dark:hover:border-gray-700/40 transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-lg"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-red-100/80 dark:bg-red-900/40 backdrop-blur-sm rounded-xl flex items-center justify-center text-red-600 dark:text-red-400 text-lg flex-shrink-0">
                                            <feature.icon />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                                {feature.title}
                                            </h4>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutMission;
