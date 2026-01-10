import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
    FaStar,
    FaQuoteLeft,
    FaChevronLeft,
    FaChevronRight,
    FaHeart,
    FaUsers,
    FaMapMarkerAlt,
    FaCalendarAlt,
} from "react-icons/fa";
import DynamicTitle from "../components/shared/DynamicTitle";

const Testimonials = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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

    // Sample testimonials data - in a real app, this would come from an API
    const testimonials = [
        {
            id: 1,
            name: "Sarah Ahmed",
            role: "Regular Donor",
            location: "Dhaka, Bangladesh",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
            testimonial: "BloodConnect made it so easy for me to find donation opportunities near my home. The platform is user-friendly and the team is incredibly supportive. I've donated 8 times this year!",
            rating: 5,
            date: "2024-01-15",
            verified: true,
        },
        {
            id: 2,
            name: "Dr. Mohammad Rahman",
            role: "Hospital Administrator",
            location: "Chittagong Medical College",
            avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
            testimonial: "As a hospital administrator, I can confidently say that BloodConnect has revolutionized how we manage blood requests. The response time is incredible, and the donor verification process gives us complete confidence.",
            rating: 5,
            date: "2024-01-12",
            verified: true,
        },
        {
            id: 3,
            name: "Fatima Khan",
            role: "Emergency Recipient",
            location: "Sylhet, Bangladesh",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            testimonial: "When my father needed emergency blood transfusion, BloodConnect connected us with donors within 20 minutes. This platform literally saved his life. Forever grateful!",
            rating: 5,
            date: "2024-01-10",
            verified: true,
        },
        {
            id: 4,
            name: "Ahmed Hassan",
            role: "Volunteer Coordinator",
            location: "Rajshahi, Bangladesh",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            testimonial: "I've been coordinating blood drives for 5 years, and BloodConnect is by far the best platform I've used. The analytics and donor management features are outstanding.",
            rating: 5,
            date: "2024-01-08",
            verified: true,
        },
        {
            id: 5,
            name: "Rima Begum",
            role: "First-time Donor",
            location: "Khulna, Bangladesh",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
            testimonial: "I was nervous about donating blood for the first time, but the BloodConnect team guided me through every step. The process was smooth and I felt safe throughout.",
            rating: 5,
            date: "2024-01-05",
            verified: true,
        },
        {
            id: 6,
            name: "Dr. Ayesha Ali",
            role: "Hematologist",
            location: "Dhaka Medical College",
            avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
            testimonial: "The medical protocols and safety standards maintained by BloodConnect are exemplary. As a hematologist, I'm impressed by their commitment to donor and recipient safety.",
            rating: 5,
            date: "2024-01-03",
            verified: true,
        },
        {
            id: 7,
            name: "Karim Uddin",
            role: "Community Leader",
            location: "Barisal, Bangladesh",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            testimonial: "BloodConnect has brought our community together for a noble cause. The platform makes it easy to organize local blood drives and track our collective impact.",
            rating: 5,
            date: "2024-01-01",
            verified: true,
        },
        {
            id: 8,
            name: "Nasreen Sultana",
            role: "Mother & Donor",
            location: "Rangpur, Bangladesh",
            avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
            testimonial: "After receiving blood during my pregnancy complications, I became a regular donor. BloodConnect makes it easy to give back to the community that saved my life.",
            rating: 5,
            date: "2023-12-28",
            verified: true,
        },
        {
            id: 9,
            name: "Rafiq Ahmed",
            role: "IT Professional & Donor",
            location: "Dhaka, Bangladesh",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
            testimonial: "The technology behind BloodConnect is impressive. The app is intuitive, notifications are timely, and the matching algorithm works perfectly. Great job by the tech team!",
            rating: 5,
            date: "2023-12-25",
            verified: true,
        },
    ];

    const testimonialsPerSlide = 3;
    const totalSlides = Math.ceil(testimonials.length / testimonialsPerSlide);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, totalSlides]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
        setIsAutoPlaying(false);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
        setIsAutoPlaying(false);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
    };

    const getCurrentTestimonials = () => {
        const start = currentSlide * testimonialsPerSlide;
        return testimonials.slice(start, start + testimonialsPerSlide);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <FaStar
                key={index}
                className={`text-sm ${index < rating
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
            />
        ));
    };

    const stats = [
        {
            icon: FaUsers,
            value: "15,000+",
            label: "Happy Donors",
            color: "text-blue-600 dark:text-blue-400",
            bgColor: "bg-blue-100/80 dark:bg-blue-900/40",
        },
        {
            icon: FaHeart,
            value: "8,900+",
            label: "Lives Saved",
            color: "text-red-600 dark:text-red-400",
            bgColor: "bg-red-100/80 dark:bg-red-900/40",
        },
        {
            icon: FaMapMarkerAlt,
            value: "64",
            label: "Districts Served",
            color: "text-green-600 dark:text-green-400",
            bgColor: "bg-green-100/80 dark:bg-green-900/40",
        },
        {
            icon: FaStar,
            value: "4.9/5",
            label: "Average Rating",
            color: "text-yellow-600 dark:text-yellow-400",
            bgColor: "bg-yellow-100/80 dark:bg-yellow-900/40",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white/20 to-blue-50/30 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50 backdrop-blur-sm">
            <DynamicTitle title="Testimonials - BloodConnect" />

            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-40 h-40 bg-red-100/20 dark:bg-red-900/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-100/20 dark:bg-blue-900/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
                <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-green-100/20 dark:bg-green-900/10 rounded-full blur-2xl animate-pulse animation-delay-4000" />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-25 pb-10 lg:py-24">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-7xl mx-auto"
                >
                    {/* Header Section */}
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-red-50/80 dark:bg-red-900/30 backdrop-blur-sm border border-red-200/50 dark:border-red-700/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <FaQuoteLeft className="text-sm" />
                            <span className="uppercase tracking-wide">Testimonials</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
                            Stories from Our{" "}
                            <span className="text-red-600 dark:text-red-400">
                                Community
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                            Hear from the donors, recipients, and healthcare professionals who make our blood donation
                            network a life-saving success. Their stories inspire us to continue our mission.
                        </p>
                    </motion.div>

                    {/* Stats Section */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/30 dark:border-gray-700/30 hover:bg-white/90 dark:hover:bg-gray-900/90 hover:border-white/40 dark:hover:border-gray-700/40 transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-lg text-center group"
                                >
                                    <div className={`w-12 h-12 ${stat.bgColor} backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
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
                        </div>
                    </motion.div>

                    {/* Testimonials Carousel */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <div className="relative">
                            {/* Carousel Container */}
                            <div className="overflow-hidden rounded-2xl">
                                <div
                                    className="flex transition-transform duration-500 ease-in-out"
                                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                >
                                    {Array.from({ length: totalSlides }, (_, slideIndex) => (
                                        <div key={slideIndex} className="w-full flex-shrink-0">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
                                                {testimonials
                                                    .slice(slideIndex * testimonialsPerSlide, (slideIndex + 1) * testimonialsPerSlide)
                                                    .map((testimonial, index) => (
                                                        <motion.div
                                                            key={testimonial.id}
                                                            initial={{ opacity: 0, y: 30 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: index * 0.1, duration: 0.5 }}
                                                            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
                                                        >
                                                            {/* Quote Icon */}
                                                            <div className="flex justify-between items-start mb-4">
                                                                <FaQuoteLeft className="text-red-600/30 dark:text-red-400/30 text-2xl" />
                                                                {testimonial.verified && (
                                                                    <div className="bg-green-100/80 dark:bg-green-900/40 text-green-600 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                                                                        Verified
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {/* Testimonial Text */}
                                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-sm">
                                                                "{testimonial.testimonial}"
                                                            </p>

                                                            {/* Rating */}
                                                            <div className="flex items-center gap-1 mb-4">
                                                                {renderStars(testimonial.rating)}
                                                            </div>

                                                            {/* User Info */}
                                                            <div className="flex items-center gap-4">
                                                                <img
                                                                    src={testimonial.avatar}
                                                                    alt={testimonial.name}
                                                                    className="w-12 h-12 rounded-full object-cover border-2 border-red-500/20 group-hover:border-red-500/40 transition-colors duration-300"
                                                                />
                                                                <div className="flex-1">
                                                                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                                                                        {testimonial.name}
                                                                    </h4>
                                                                    <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">
                                                                        {testimonial.role}
                                                                    </p>
                                                                    <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-600">
                                                                        <div className="flex items-center gap-1">
                                                                            <FaMapMarkerAlt />
                                                                            <span>{testimonial.location}</span>
                                                                        </div>
                                                                        <div className="flex items-center gap-1">
                                                                            <FaCalendarAlt />
                                                                            <span>{formatDate(testimonial.date)}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation Arrows */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 z-10"
                            >
                                <FaChevronLeft className="text-lg" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 z-10"
                            >
                                <FaChevronRight className="text-lg" />
                            </button>
                        </div>

                        {/* Slide Indicators */}
                        <div className="flex justify-center mt-8 gap-2">
                            {Array.from({ length: totalSlides }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index
                                            ? "bg-red-600 dark:bg-red-400 scale-125"
                                            : "bg-gray-300 dark:bg-gray-600 hover:bg-red-300 dark:hover:bg-red-600"
                                        }`}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Featured Testimonial */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Featured Story
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                A life-changing experience that showcases the power of our community
                            </p>
                        </div>

                        <div className="bg-gradient-to-r from-red-50/80 to-pink-50/80 dark:from-red-900/20 dark:to-pink-900/20 backdrop-blur-sm rounded-2xl border border-red-200/50 dark:border-red-700/30 p-8 lg:p-12">
                            <div className="max-w-4xl mx-auto text-center">
                                <FaQuoteLeft className="text-red-600/40 dark:text-red-400/40 text-4xl mx-auto mb-6" />
                                <blockquote className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 italic">
                                    "During the pandemic, when regular blood drives were suspended, BloodConnect became our lifeline.
                                    The platform helped us maintain critical blood supplies for our hospital. The dedication of the
                                    donors and the efficiency of the system saved countless lives during those challenging times."
                                </blockquote>
                                <div className="flex items-center justify-center gap-4">
                                    <img
                                        src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=80&h=80&fit=crop&crop=face"
                                        alt="Dr. Rashida Begum"
                                        className="w-16 h-16 rounded-full object-cover border-3 border-red-500"
                                    />
                                    <div className="text-left">
                                        <h4 className="font-bold text-gray-900 dark:text-white">
                                            Dr. Rashida Begum
                                        </h4>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                                            Chief Medical Officer, Dhaka Medical College Hospital
                                        </p>
                                        <div className="flex items-center gap-1 mt-1">
                                            {renderStars(5)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Call to Action */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-gradient-to-r from-red-50/80 to-blue-50/80 dark:from-red-900/20 dark:to-blue-900/20 backdrop-blur-sm p-8 lg:p-12 rounded-2xl border border-red-200/50 dark:border-red-700/30 text-center"
                    >
                        <div className="max-w-3xl mx-auto">
                            <div className="w-16 h-16 bg-red-100/80 dark:bg-red-900/40 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaHeart className="text-2xl text-red-600 dark:text-red-400 animate-pulse" />
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                Join Our Community of Heroes
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                Become part of a community that's making a real difference. Your story could be the next
                                one that inspires others to save lives through blood donation.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <button className="flex items-center justify-center gap-3 bg-red-600/90 dark:bg-red-600/80 backdrop-blur-sm text-white border border-red-500/30 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-red-700/90 dark:hover:bg-red-700/80 transition-all duration-300 shadow-lg hover:shadow-xl min-w-[200px]">
                                        <FaUsers />
                                        Become a Donor
                                    </button>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <button className="flex items-center justify-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-200 border border-white/50 dark:border-gray-700/50 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 min-w-[200px]">
                                        <FaQuoteLeft />
                                        Share Your Story
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Testimonials;