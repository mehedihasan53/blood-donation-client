import { motion } from "framer-motion";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    FaCalendarAlt,
    FaUser,
    FaClock,
    FaTag,
    FaArrowLeft,
    FaShare,
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaArrowRight,
    FaHeart,
    FaBookmark,
} from "react-icons/fa";
import DynamicTitle from "../components/shared/DynamicTitle";

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    // Sample blog data - in a real app, this would come from an API
    const allBlogs = [
        {
            id: 1,
            title: "The Importance of Regular Blood Donation",
            excerpt: "Discover how regular blood donation not only saves lives but also provides health benefits for donors.",
            content: `
                <p>Blood donation is one of the most selfless acts a person can perform, directly contributing to saving lives and improving health outcomes in communities worldwide. In Bangladesh, where the demand for blood often exceeds supply, regular blood donation becomes even more critical.</p>

                <h2>Health Benefits for Donors</h2>
                <p>Contrary to popular belief, blood donation offers several health benefits to the donor:</p>
                <ul>
                    <li><strong>Cardiovascular Health:</strong> Regular blood donation helps reduce iron levels in the body, which can lower the risk of heart disease and stroke.</li>
                    <li><strong>Cancer Prevention:</strong> Studies suggest that regular blood donation may reduce the risk of certain cancers by maintaining healthy iron levels.</li>
                    <li><strong>Free Health Screening:</strong> Every donation includes a mini health check-up, including blood pressure, pulse, and hemoglobin testing.</li>
                    <li><strong>Calorie Burning:</strong> Donating blood burns approximately 650 calories as your body works to replenish the donated blood.</li>
                </ul>

                <h2>The Donation Process</h2>
                <p>Understanding the donation process can help alleviate concerns and encourage more people to become regular donors:</p>
                <ol>
                    <li><strong>Registration:</strong> Complete a brief health questionnaire and provide identification.</li>
                    <li><strong>Health Screening:</strong> A qualified healthcare professional will check your vital signs and hemoglobin levels.</li>
                    <li><strong>Donation:</strong> The actual blood collection takes only 8-10 minutes.</li>
                    <li><strong>Recovery:</strong> Rest and enjoy refreshments while your body begins to replenish the donated blood.</li>
                </ol>

                <h2>Community Impact</h2>
                <p>Every blood donation has the potential to save up to three lives. In emergency situations, having an adequate blood supply can mean the difference between life and death for accident victims, surgical patients, and those with chronic illnesses.</p>

                <p>Regular donors form the backbone of our healthcare system, ensuring that hospitals and medical centers have the resources they need to provide life-saving treatments. By becoming a regular donor, you join a community of heroes who make a tangible difference in the lives of others.</p>

                <h2>Getting Started</h2>
                <p>If you're interested in becoming a regular blood donor, start by:</p>
                <ul>
                    <li>Consulting with your healthcare provider to ensure you're eligible</li>
                    <li>Registering with BloodConnect to find donation opportunities near you</li>
                    <li>Maintaining a healthy lifestyle to ensure you can donate regularly</li>
                    <li>Encouraging friends and family to join you in this life-saving mission</li>
                </ul>

                <p>Remember, the need for blood never stops, and neither should our commitment to helping those in need. Your regular donations can create a lasting impact that extends far beyond what you might imagine.</p>
            `,
            author: "Dr. Sarah Ahmed",
            date: "2024-01-15",
            readTime: "5 min read",
            category: "Health",
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=600&fit=crop",
            likes: 245,
            views: 1520,
        },
        {
            id: 2,
            title: "Blood Types and Compatibility: A Complete Guide",
            excerpt: "Understanding blood types is crucial for safe transfusions. This comprehensive guide explains ABO and Rh systems.",
            content: `
                <p>Understanding blood types and compatibility is fundamental to safe blood transfusions and medical procedures. This comprehensive guide will help you understand the science behind blood typing and why it matters.</p>

                <h2>The ABO Blood Group System</h2>
                <p>The ABO system is the most important blood group system in transfusion medicine. It consists of four main blood types:</p>
                <ul>
                    <li><strong>Type A:</strong> Has A antigens on red blood cells and anti-B antibodies in plasma</li>
                    <li><strong>Type B:</strong> Has B antigens on red blood cells and anti-A antibodies in plasma</li>
                    <li><strong>Type AB:</strong> Has both A and B antigens, no anti-A or anti-B antibodies (universal plasma donor)</li>
                    <li><strong>Type O:</strong> Has no A or B antigens, has both anti-A and anti-B antibodies (universal red cell donor)</li>
                </ul>

                <h2>The Rh Factor</h2>
                <p>The Rh factor is another important blood group system. People are either Rh-positive (Rh+) or Rh-negative (Rh-). This creates eight common blood types: A+, A-, B+, B-, AB+, AB-, O+, and O-.</p>

                <h2>Compatibility Rules</h2>
                <p>Safe transfusions depend on compatibility between donor and recipient blood types:</p>
                <ul>
                    <li>Type O- can donate to anyone (universal donor)</li>
                    <li>Type AB+ can receive from anyone (universal recipient)</li>
                    <li>Rh-negative recipients can only receive Rh-negative blood</li>
                    <li>Rh-positive recipients can receive both Rh+ and Rh- blood</li>
                </ul>

                <p>Understanding these principles helps ensure safe transfusions and highlights why we need donors of all blood types to maintain an adequate supply for all patients.</p>
            `,
            author: "Dr. Mohammad Rahman",
            date: "2024-01-12",
            readTime: "8 min read",
            category: "Education",
            image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&h=600&fit=crop",
            likes: 189,
            views: 987,
        },
        // Add more blog data as needed...
    ];

    useEffect(() => {
        // Find the blog by ID
        const foundBlog = allBlogs.find(b => b.id === parseInt(id));
        if (foundBlog) {
            setBlog(foundBlog);
            // Find related blogs (same category, excluding current blog)
            const related = allBlogs
                .filter(b => b.category === foundBlog.category && b.id !== foundBlog.id)
                .slice(0, 3);
            setRelatedBlogs(related);
        }
    }, [id]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const handleShare = (platform) => {
        const url = window.location.href;
        const title = blog?.title || '';

        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        };

        if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        }
    };

    if (!blog) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white/20 to-blue-50/30 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Blog Not Found</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">The blog post you're looking for doesn't exist.</p>
                    <Link
                        to="/blogs"
                        className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300"
                    >
                        <FaArrowLeft />
                        Back to Blogs
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white/20 to-blue-50/30 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50 backdrop-blur-sm">
            <DynamicTitle title={`${blog.title} - BloodConnect`} />

            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-40 h-40 bg-red-100/20 dark:bg-red-900/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-100/20 dark:bg-blue-900/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-25 pb-10 lg:py-24">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <button
                            onClick={() => navigate('/blogs')}
                            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300"
                        >
                            <FaArrowLeft />
                            <span>Back to Blogs</span>
                        </button>
                    </motion.div>

                    {/* Article Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 overflow-hidden shadow-lg mb-8"
                    >
                        <div className="relative">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-64 md:h-80 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="bg-red-600/90 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                                        {blog.category}
                                    </span>
                                    <div className="flex items-center gap-4 text-white/90 text-sm">
                                        <div className="flex items-center gap-1">
                                            <FaClock />
                                            <span>{blog.readTime}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FaCalendarAlt />
                                            <span>{formatDate(blog.date)}</span>
                                        </div>
                                    </div>
                                </div>
                                <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                                    {blog.title}
                                </h1>
                            </div>
                        </div>

                        <div className="p-6 md:p-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                        <FaUser />
                                        <span className="font-medium">{blog.author}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                                        <span>{blog.views} views</span>
                                        <span>{blog.likes} likes</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setIsLiked(!isLiked)}
                                        className={`p-2 rounded-lg transition-all duration-300 ${isLiked
                                                ? "bg-red-100/80 dark:bg-red-900/40 text-red-600 dark:text-red-400"
                                                : "bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:bg-red-100/80 dark:hover:bg-red-900/40 hover:text-red-600 dark:hover:text-red-400"
                                            }`}
                                    >
                                        <FaHeart />
                                    </button>
                                    <button
                                        onClick={() => setIsBookmarked(!isBookmarked)}
                                        className={`p-2 rounded-lg transition-all duration-300 ${isBookmarked
                                                ? "bg-blue-100/80 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"
                                                : "bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:bg-blue-100/80 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-blue-400"
                                            }`}
                                    >
                                        <FaBookmark />
                                    </button>
                                    <div className="relative group">
                                        <button className="p-2 rounded-lg bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-300">
                                            <FaShare />
                                        </button>
                                        <div className="absolute right-0 top-full mt-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-lg border border-gray-200/50 dark:border-gray-600/50 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                                            <div className="p-2 space-y-1">
                                                <button
                                                    onClick={() => handleShare('facebook')}
                                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50/80 dark:hover:bg-blue-900/40 rounded-md transition-colors duration-200"
                                                >
                                                    <FaFacebook className="text-blue-600" />
                                                    Facebook
                                                </button>
                                                <button
                                                    onClick={() => handleShare('twitter')}
                                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50/80 dark:hover:bg-blue-900/40 rounded-md transition-colors duration-200"
                                                >
                                                    <FaTwitter className="text-blue-400" />
                                                    Twitter
                                                </button>
                                                <button
                                                    onClick={() => handleShare('linkedin')}
                                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50/80 dark:hover:bg-blue-900/40 rounded-md transition-colors duration-200"
                                                >
                                                    <FaLinkedin className="text-blue-700" />
                                                    LinkedIn
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Article Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg p-6 md:p-8 mb-8"
                    >
                        <div
                            className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-white prose-a:text-red-600 dark:prose-a:text-red-400"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                    </motion.div>

                    {/* Related Articles */}
                    {relatedBlogs.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg p-6 md:p-8"
                        >
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Related Articles
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedBlogs.map((relatedBlog) => (
                                    <Link
                                        key={relatedBlog.id}
                                        to={`/blogs/${relatedBlog.id}`}
                                        className="group"
                                    >
                                        <div className="bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-600/50 overflow-hidden hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                                            <img
                                                src={relatedBlog.image}
                                                alt={relatedBlog.title}
                                                className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="p-4">
                                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
                                                    {relatedBlog.title}
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                                                    {relatedBlog.excerpt}
                                                </p>
                                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                                                    <span>{relatedBlog.readTime}</span>
                                                    <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;