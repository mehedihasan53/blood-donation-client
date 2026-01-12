import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
    FaCalendarAlt,
    FaUser,
    FaArrowRight,
    FaClock,
    FaTag,
    FaSearch,
    FaFilter,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";
import DynamicTitle from "../components/shared/DynamicTitle";

const Blogs = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const blogsPerPage = 6;

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

    // Sample blog data - in a real app, this would come from an API
    const allBlogs = [
        {
            id: 1,
            title: "The Importance of Regular Blood Donation",
            excerpt: "Discover how regular blood donation not only saves lives but also provides health benefits for donors. Learn about the donation process and its impact on communities.",
            author: "Dr. Sarah Ahmed",
            date: "2024-01-15",
            readTime: "5 min read",
            category: "Health",
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
            featured: true,
        },
        {
            id: 2,
            title: "Blood Types and Compatibility: A Complete Guide",
            excerpt: "Understanding blood types is crucial for safe transfusions. This comprehensive guide explains ABO and Rh systems, compatibility charts, and universal donors.",
            author: "Dr. Mohammad Rahman",
            date: "2024-01-12",
            readTime: "8 min read",
            category: "Education",
            image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=400&fit=crop",
            featured: false,
        },
        {
            id: 3,
            title: "How Technology is Revolutionizing Blood Banking",
            excerpt: "From digital donor management to AI-powered matching systems, explore how modern technology is transforming blood donation and saving more lives.",
            author: "Tech Team BloodConnect",
            date: "2024-01-10",
            readTime: "6 min read",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
            featured: true,
        },
        {
            id: 4,
            title: "Myths and Facts About Blood Donation",
            excerpt: "Debunking common misconceptions about blood donation. Learn the truth behind popular myths and get accurate information from medical experts.",
            author: "Dr. Fatima Khan",
            date: "2024-01-08",
            readTime: "4 min read",
            category: "Education",
            image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=400&fit=crop",
            featured: false,
        },
        {
            id: 5,
            title: "Emergency Blood Requests: How to Respond Quickly",
            excerpt: "When every minute counts, knowing how to respond to emergency blood requests can save lives. Learn the protocols and best practices for urgent situations.",
            author: "Emergency Response Team",
            date: "2024-01-05",
            readTime: "7 min read",
            category: "Emergency",
            image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=400&fit=crop",
            featured: false,
        },
        {
            id: 6,
            title: "Nutrition Tips for Blood Donors",
            excerpt: "Proper nutrition before and after blood donation is essential. Discover the best foods to eat and dietary recommendations for healthy donors.",
            author: "Nutritionist Ayesha Ali",
            date: "2024-01-03",
            readTime: "5 min read",
            category: "Health",
            image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=400&fit=crop",
            featured: false,
        },
        {
            id: 7,
            title: "Building a Sustainable Blood Donation Community",
            excerpt: "Creating lasting impact through community engagement. Learn how to build and maintain a strong network of committed blood donors in your area.",
            author: "Community Outreach Team",
            date: "2024-01-01",
            readTime: "6 min read",
            category: "Community",
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
            featured: false,
        },
        {
            id: 8,
            title: "The Science Behind Blood Storage and Preservation",
            excerpt: "Understanding how donated blood is processed, tested, and stored to ensure safety and efficacy. A deep dive into blood banking science.",
            author: "Lab Director Dr. Hassan",
            date: "2023-12-28",
            readTime: "9 min read",
            category: "Science",
            image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=400&fit=crop",
            featured: false,
        },
        {
            id: 9,
            title: "Youth Engagement in Blood Donation Programs",
            excerpt: "Inspiring the next generation of donors. Strategies and success stories from youth-focused blood donation initiatives across Bangladesh.",
            author: "Youth Coordinator Rima",
            date: "2023-12-25",
            readTime: "5 min read",
            category: "Community",
            image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=400&fit=crop",
            featured: false,
        },
    ];

    const categories = ["all", "Health", "Education", "Technology", "Emergency", "Community", "Science"];

    // Filter blogs based on category and search term
    const filteredBlogs = allBlogs.filter(blog => {
        const matchesCategory = selectedCategory === "all" || blog.category === selectedCategory;
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Pagination
    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
    const startIndex = (currentPage - 1) * blogsPerPage;
    const currentBlogs = filteredBlogs.slice(startIndex, startIndex + blogsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="min-h-screen bg-bg-primary dark:bg-bg-primary">
            <DynamicTitle title="Blogs - BloodConnect" />

            {/* Enhanced Background Elements for dark mode */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-40 h-40 bg-primary/8 dark:bg-primary/12 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent/5 dark:bg-accent/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
                <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-green-500/5 dark:bg-green-400/8 rounded-full blur-2xl animate-pulse animation-delay-4000" />
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
                        <div className="inline-flex items-center gap-2 bg-primary-light/80 dark:bg-primary/20 backdrop-blur-sm border border-primary/30 dark:border-primary/40 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg dark:shadow-xl">
                            <FaTag className="text-sm" />
                            <span className="uppercase tracking-wide">Our Blog</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-text-primary leading-tight mb-6">
                            Stories, Insights &{" "}
                            <span className="text-primary dark:text-red-400">
                                Knowledge
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed mb-8">
                            Stay informed with the latest insights on blood donation, health tips, community stories,
                            and medical breakthroughs that are shaping the future of healthcare in Bangladesh.
                        </p>
                    </motion.div>

                    {/* Search and Filter Section */}
                    <motion.div variants={itemVariants} className="mb-12">
                        <div className="bg-bg-card/98 dark:bg-bg-card/95 backdrop-blur-xl p-6 rounded-2xl border border-border-primary/30 dark:border-border-primary/40 shadow-lg dark:shadow-2xl">
                            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                                {/* Search Bar */}
                                <div className="relative flex-1 max-w-md">
                                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                                    <input
                                        type="text"
                                        placeholder="Search articles..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-bg-tertiary/80 dark:bg-bg-tertiary/60 backdrop-blur-sm border border-border-primary/50 dark:border-border-primary/60 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none text-sm transition-all duration-300 text-text-primary placeholder-text-muted"
                                    />
                                </div>

                                {/* Category Filter */}
                                <div className="flex items-center gap-2">
                                    <FaFilter className="text-gray-500 text-sm" />
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => {
                                            setSelectedCategory(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="px-4 py-3 bg-bg-tertiary/80 dark:bg-bg-tertiary/60 backdrop-blur-sm border border-border-primary/50 dark:border-border-primary/60 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none text-sm transition-all duration-300 text-text-primary"
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category}>
                                                {category === "all" ? "All Categories" : category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Featured Blog */}
                    {filteredBlogs.find(blog => blog.featured) && (
                        <motion.div variants={itemVariants} className="mb-16">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    Featured Article
                                </h2>
                            </div>
                            {(() => {
                                const featuredBlog = filteredBlogs.find(blog => blog.featured);
                                return (
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                        className="bg-bg-card/98 dark:bg-bg-card/95 backdrop-blur-xl rounded-2xl border border-border-primary/30 dark:border-border-primary/40 overflow-hidden shadow-lg hover:shadow-xl dark:shadow-2xl transition-all duration-300 hover:scale-[1.01] group"
                                    >
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                            <div className="relative overflow-hidden">
                                                <img
                                                    src={featuredBlog.image}
                                                    alt={featuredBlog.title}
                                                    className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <span className="bg-primary/90 dark:bg-primary/80 text-text-inverse px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm shadow-sm">
                                                        Featured
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-8 lg:p-12 flex flex-col justify-center">
                                                <div className="flex items-center gap-4 mb-4 text-sm text-text-muted">
                                                    <span className="bg-accent-blue text-accent-blue px-3 py-1 rounded-full text-xs font-medium">
                                                        {featuredBlog.category}
                                                    </span>
                                                    <div className="flex items-center gap-1">
                                                        <FaClock className="text-xs" />
                                                        <span>{featuredBlog.readTime}</span>
                                                    </div>
                                                </div>
                                                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
                                                    {featuredBlog.title}
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                                    {featuredBlog.excerpt}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                                        <div className="flex items-center gap-2">
                                                            <FaUser className="text-xs" />
                                                            <span>{featuredBlog.author}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <FaCalendarAlt className="text-xs" />
                                                            <span>{formatDate(featuredBlog.date)}</span>
                                                        </div>
                                                    </div>
                                                    <Link
                                                        to={`/blogs/${featuredBlog.id}`}
                                                        className="inline-flex items-center gap-2 text-red-600 dark:text-red-400 hover:gap-3 font-semibold transition-all duration-300"
                                                    >
                                                        Read More
                                                        <FaArrowRight className="text-sm" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })()}
                        </motion.div>
                    )}

                    {/* Blog Grid */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Latest Articles
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                Showing {currentBlogs.length} of {filteredBlogs.length} articles
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {currentBlogs.filter(blog => !blog.featured).map((blog, index) => (
                                <motion.div
                                    key={blog.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="bg-bg-card/98 dark:bg-bg-card/95 backdrop-blur-xl rounded-2xl border border-border-primary/30 dark:border-border-primary/40 overflow-hidden shadow-lg hover:shadow-xl dark:shadow-2xl transition-all duration-300 hover:scale-[1.02] group"
                                >
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-bg-card/90 dark:bg-bg-card/80 text-text-primary px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm shadow-sm">
                                                {blog.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-3 mb-3 text-xs text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-1">
                                                <FaClock />
                                                <span>{blog.readTime}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FaCalendarAlt />
                                                <span>{formatDate(blog.date)}</span>
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300 line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                                            {blog.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                <FaUser />
                                                <span>{blog.author}</span>
                                            </div>
                                            <Link
                                                to={`/blogs/${blog.id}`}
                                                className="inline-flex items-center gap-2 text-red-600 dark:text-red-400 hover:gap-3 font-semibold text-sm transition-all duration-300"
                                            >
                                                Read More
                                                <FaArrowRight className="text-xs" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <motion.div variants={itemVariants} className="flex justify-center">
                            <div className="bg-bg-card/98 dark:bg-bg-card/95 backdrop-blur-xl p-4 rounded-2xl border border-border-primary/30 dark:border-border-primary/40 shadow-lg dark:shadow-2xl">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="p-2 rounded-lg bg-bg-tertiary/80 dark:bg-bg-tertiary/60 text-text-secondary hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                    >
                                        <FaChevronLeft className="text-sm" />
                                    </button>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${currentPage === page
                                                ? "bg-red-600/90 text-white shadow-md"
                                                : "bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:bg-red-100/80 dark:hover:bg-red-900/40 hover:text-red-600 dark:hover:text-red-400"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="p-2 rounded-lg bg-bg-tertiary/80 dark:bg-bg-tertiary/60 text-text-secondary hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                    >
                                        <FaChevronRight className="text-sm" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Blogs;