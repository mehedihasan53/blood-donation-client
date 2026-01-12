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

    const categoryStyles = {
        Health: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
        Education: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
        Technology: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800",
        Emergency: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800",
        Community: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800",
        Science: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800",
        all: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
    };

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

    const filteredBlogs = allBlogs.filter(blog => {
        const matchesCategory = selectedCategory === "all" || blog.category === selectedCategory;
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

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
        <div className="min-h-screen bg-white dark:bg-[#0B0F1A] transition-colors duration-500">
            <DynamicTitle title="Blogs - BloodConnect" />

            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/[0.03] dark:bg-red-600/[0.05] rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/[0.03] dark:bg-blue-600/[0.05] rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-7xl mx-auto">

                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-red-100 dark:border-red-800/50">
                            <FaTag /> <span>Knowledge Hub</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                            Insights & <span className="text-red-600">Stories</span>
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                            Stay informed with the latest updates on blood donation, healthcare tips, and community impact across Bangladesh.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mb-12">
                        <div className="bg-white dark:bg-[#111827] p-4 md:p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl dark:shadow-2xl/50">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="relative flex-1">
                                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search articles by title or content..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-[#1F2937] border-none rounded-2xl focus:ring-2 focus:ring-red-500/50 outline-none text-gray-900 dark:text-white transition-all"
                                    />
                                </div>
                                <div className="flex items-center gap-3 bg-gray-50 dark:bg-[#1F2937] px-4 rounded-2xl">
                                    <FaFilter className="text-red-600" />
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                                        className="py-4 bg-transparent border-none outline-none text-gray-900 dark:text-white font-bold cursor-pointer min-w-[160px]"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat} value={cat} className="bg-white dark:bg-[#1F2937]">{cat === "all" ? "All Categories" : cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentBlogs.map((blog) => (
                            <motion.div
                                key={blog.id}
                                variants={itemVariants}
                                className="group bg-white dark:bg-[#111827] rounded-[2rem] border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col"
                            >
                                <div className="relative h-60 overflow-hidden">
                                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute top-4 left-4">
                                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border backdrop-blur-md shadow-lg ${categoryStyles[blog.category] || categoryStyles.all}`}>
                                            {blog.category}
                                        </span>
                                    </div>
                                    {blog.featured && (
                                        <div className="absolute top-4 right-4 bg-amber-500 text-white p-2 rounded-lg shadow-lg">
                                            <FaTag className="text-xs" />
                                        </div>
                                    )}
                                </div>

                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                                        <div className="flex items-center gap-1.5 text-red-600/80"><FaClock /> <span>{blog.readTime}</span></div>
                                        <span>•</span>
                                        <span>{formatDate(blog.date)}</span>
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-red-600 transition-colors line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {blog.excerpt}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600">
                                                <FaUser className="text-xs" />
                                            </div>
                                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{blog.author}</span>
                                        </div>
                                        <Link to={`/blogs/${blog.id}`} className="text-red-600 hover:text-red-700 transition-colors">
                                            <FaArrowRight />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredBlogs.length === 0 && (
                        <div className="text-center py-20">
                            <div className="bg-gray-50 dark:bg-[#111827] inline-block p-10 rounded-full mb-6">
                                <FaSearch className="text-6xl text-gray-200 dark:text-gray-800" />
                            </div>
                            <h3 className="text-2xl font-bold dark:text-white">No articles found</h3>
                            <p className="text-gray-500">Try adjusting your search or category filter</p>
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div className="mt-16 flex justify-center items-center gap-4">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 text-gray-500 disabled:opacity-30 hover:bg-red-600 hover:text-white transition-all shadow-lg"
                            >
                                <FaChevronLeft />
                            </button>
                            <div className="flex gap-2">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => handlePageChange(i + 1)}
                                        className={`w-12 h-12 rounded-2xl font-black transition-all shadow-lg ${currentPage === i + 1 ? 'bg-red-600 text-white scale-110' : 'bg-white dark:bg-[#111827] text-gray-500 border border-gray-100 dark:border-gray-800 hover:border-red-600'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 text-gray-500 disabled:opacity-30 hover:bg-red-600 hover:text-white transition-all shadow-lg"
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Blogs;