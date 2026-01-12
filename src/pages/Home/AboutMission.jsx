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
            bgColor: "bg-blue-100/50 dark:bg-blue-900/20",
            cardClass: "hover:shadow-blue-500/10",
        },
        {
            icon: FaTint,
            value: "5K+",
            label: "Lives Saved",
            color: "text-red-600 dark:text-red-500",
            bgColor: "bg-red-100/50 dark:bg-red-900/20",
            cardClass: "hover:shadow-red-500/10",
        },
        {
            icon: FaGlobe,
            value: "64+",
            label: "Districts Covered",
            color: "text-green-600 dark:text-green-400",
            bgColor: "bg-green-100/50 dark:bg-green-900/20",
            cardClass: "hover:shadow-green-500/10",
        },
    ];

    const features = [
        {
            icon: FaHeartbeat,
            title: "Save Lives",
            description: "Every donation can save up to 3 lives. Your contribution makes a real difference in emergency situations.",
            color: "text-red-600 dark:text-red-500",
            bgColor: "bg-red-100/50 dark:bg-red-900/20",
            cardClass: "hover:shadow-red-500/10",
        },
        {
            icon: FaUsers,
            title: "Build Community",
            description: "Connect with like-minded individuals who share the passion for helping others in their time of need.",
            color: "text-blue-600 dark:text-blue-400",
            bgColor: "bg-blue-100/50 dark:bg-blue-900/20",
            cardClass: "hover:shadow-blue-500/10",
        },
        {
            icon: FaHandsHelping,
            title: "Easy Process",
            description: "Our streamlined platform makes it simple to find donors, request blood, and coordinate donations safely.",
            color: "text-green-600 dark:text-green-400",
            bgColor: "bg-green-100/50 dark:bg-green-900/20",
            cardClass: "hover:shadow-green-500/10",
        },
    ];

    return (
        <section
            id="about-mission"
            className="relative py-8 sm:py-10 lg:py-12 xl:py-14 bg-bg-secondary/90 dark:bg-bg-secondary/95 backdrop-blur-sm overflow-hidden"
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-64 h-64 bg-red-500/5 dark:bg-red-600/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-[100px] animate-pulse animation-delay-2000" />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="max-w-6xl mx-auto"
                >
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 backdrop-blur-sm text-red-600 dark:text-red-500 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-widest mb-6">
                            <FaHeartbeat className="text-sm animate-pulse" />
                            <span>Our Mission</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-6">
                            Connecting Hearts,{" "}
                            <span className="text-red-600 dark:text-red-500">
                                Saving Lives
                            </span>
                        </h2>
                        <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed font-normal">
                            We believe that every drop of blood donated is a gift of life. Our
                            mission is to create a seamless, trustworthy platform that
                            connects blood donors with those in urgent need.
                        </p>
                    </motion.div>

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
                                className={`bg-bg-card/98 dark:bg-bg-card/95 backdrop-blur-xl p-8 rounded-3xl transition-all duration-300 hover:scale-[1.02] shadow-xl dark:shadow-2xl text-center ${stat.cardClass}`}
                            >
                                <div className={`w-14 h-14 ${stat.bgColor} backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                                    <stat.icon className={`text-2xl ${stat.color}`} />
                                </div>
                                <div className="text-3xl font-bold text-text-primary mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
                        <motion.div variants={itemVariants}>
                            <div className="bg-bg-card/98 dark:bg-bg-card/95 backdrop-blur-xl p-8 lg:p-10 rounded-[2rem] shadow-xl dark:shadow-2xl transition-all duration-300">
                                <h3 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-4">
                                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center">
                                        <FaHeartbeat className="text-red-600 dark:text-red-500 text-lg" />
                                    </div>
                                    Why Blood Donation Matters
                                </h3>
                                <div className="space-y-4 text-text-secondary leading-relaxed font-normal">
                                    <p>In Bangladesh, thousands of people require blood transfusions daily. Unfortunately, blood shortage remains a critical challenge.</p>
                                    <p>Our platform bridges this gap by creating a reliable network of voluntary blood donors ready to help in emergencies.</p>
                                    <p>Together, we're building a community where no one has to worry about finding blood when they need it most.</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className={`bg-bg-card/95 dark:bg-bg-card/90 backdrop-blur-xl p-6 rounded-3xl transition-all duration-300 hover:scale-[1.01] shadow-lg hover:shadow-xl dark:shadow-2xl ${feature.cardClass}`}
                                >
                                    <div className="flex items-start gap-5">
                                        <div className={`w-12 h-12 ${feature.bgColor} backdrop-blur-sm rounded-xl flex items-center justify-center text-xl flex-shrink-0`}>
                                            <feature.icon className={feature.color} />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-text-primary mb-2">
                                                {feature.title}
                                            </h4>
                                            <p className="text-sm text-text-secondary leading-relaxed font-normal">
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