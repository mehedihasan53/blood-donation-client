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
    FaCheckCircle
} from "react-icons/fa";
import DynamicTitle from "../components/shared/DynamicTitle";

const Testimonials = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, duration: 0.6 },
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

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <FaStar
                key={index}
                className={`text-sm ${index < rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-700"}`}
            />
        ));
    };

    const stats = [
        { icon: FaUsers, value: "15,000+", label: "Happy Donors", color: "text-blue-600 dark:text-blue-400", bgColor: "bg-blue-100 dark:bg-blue-900/30" },
        { icon: FaHeart, value: "8,900+", label: "Lives Saved", color: "text-red-600 dark:text-red-400", bgColor: "bg-red-100 dark:bg-red-900/30" },
        { icon: FaMapMarkerAlt, value: "64", label: "Districts Served", color: "text-green-600 dark:text-green-400", bgColor: "bg-green-100 dark:bg-green-900/30" },
        { icon: FaStar, value: "4.9/5", label: "Average Rating", color: "text-yellow-600 dark:text-yellow-400", bgColor: "bg-yellow-100 dark:bg-yellow-900/30" },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
            <DynamicTitle title="Testimonials - BloodConnect" />

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-40 h-40 bg-red-500/5 dark:bg-red-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-7xl mx-auto">

                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/50 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                            <FaQuoteLeft className="text-[10px]" />
                            <span>Community Voice</span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6">
                            Stories from Our <span className="text-red-600 dark:text-red-500">Community</span>
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            Hear from the donors, recipients, and healthcare professionals who make our blood donation
                            network a life-saving success.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-gray-50 dark:bg-white/[0.03] p-6 rounded-3xl border border-gray-100 dark:border-white/10 text-center transition-all hover:shadow-xl group">
                                <div className={`w-12 h-12 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                                    <stat.icon className={`text-xl ${stat.color}`} />
                                </div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-tighter">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div variants={itemVariants} className="relative mb-20">
                        <div className="overflow-hidden">
                            <div className="flex transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                                {Array.from({ length: totalSlides }, (_, slideIndex) => (
                                    <div key={slideIndex} className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                                        {testimonials.slice(slideIndex * testimonialsPerSlide, (slideIndex + 1) * testimonialsPerSlide).map((item) => (
                                            <div key={item.id} className="bg-white dark:bg-white/[0.02] rounded-[2.5rem] p-8 border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all relative flex flex-col group">
                                                <div className="flex justify-between items-start mb-6">
                                                    <FaQuoteLeft className="text-red-50 dark:text-red-900/30 text-5xl" />
                                                    {item.verified && (
                                                        <span className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase border border-green-100 dark:border-green-900/30">
                                                            <FaCheckCircle className="text-xs" /> Verified
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8 flex-grow">"{item.testimonial}"</p>
                                                <div className="flex items-center gap-4">
                                                    <img src={item.avatar} alt={item.name} className="w-14 h-14 rounded-2xl object-cover ring-4 ring-gray-50 dark:ring-white/5" />
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 dark:text-white text-base">{item.name}</h4>
                                                        <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">{item.role}</p>
                                                        <div className="flex items-center gap-2 text-[10px] text-gray-400 dark:text-gray-500">
                                                            <span className="flex items-center gap-1"><FaMapMarkerAlt /> {item.location}</span>
                                                            <span className="flex items-center gap-1"><FaCalendarAlt /> {formatDate(item.date)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button onClick={prevSlide} className="absolute -left-2 lg:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 shadow-xl rounded-full flex items-center justify-center text-gray-800 dark:text-white hover:bg-red-600 hover:text-white transition-all z-20">
                            <FaChevronLeft />
                        </button>
                        <button onClick={nextSlide} className="absolute -right-2 lg:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 shadow-xl rounded-full flex items-center justify-center text-gray-800 dark:text-white hover:bg-red-600 hover:text-white transition-all z-20">
                            <FaChevronRight />
                        </button>
                    </motion.div>

                    <div className="flex justify-center gap-3 mb-20">
                        {Array.from({ length: totalSlides }, (_, i) => (
                            <button key={i} onClick={() => goToSlide(i)} className={`h-2 rounded-full transition-all duration-300 ${currentSlide === i ? "w-10 bg-red-600" : "w-2 bg-gray-300 dark:bg-gray-800 hover:bg-red-400"}`} />
                        ))}
                    </div>

                    <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-white/[0.02] rounded-[3rem] p-8 lg:p-16 border border-gray-100 dark:border-white/10 text-center relative overflow-hidden">
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-3xl flex items-center justify-center mx-auto mb-8">
                                <FaHeart className="text-3xl text-red-600 animate-pulse" />
                            </div>
                            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
                                Join Our Community of <span className="text-red-600">Heroes</span>
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                                Your contribution can save a life. Become a donor or share your story to inspire others in our mission to make blood available for everyone.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="px-10 py-4 bg-red-600 text-white rounded-2xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg shadow-red-600/20">
                                    Become a Donor
                                </button>
                                <button className="px-10 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                                    Share Your Story
                                </button>
                            </div>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
};

export default Testimonials;