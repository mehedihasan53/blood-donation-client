import React from "react";
import { motion } from "framer-motion";

// Simple Chart Components (using CSS for visualization)
// For production, you'd want to use a library like Chart.js, Recharts, or D3.js

const BarChart = ({ data = [], title = "Bar Chart", height = 300 }) => {
    const maxValue = Math.max(...data.map(item => item.value));

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-bg-card/95 dark:bg-bg-card/90 backdrop-blur-xl rounded-2xl shadow-modern-lg dark:shadow-modern-2xl interactive-border p-6"
        >
            <h3 className="text-lg font-bold text-text-primary mb-6">{title}</h3>

            <div className="flex items-end justify-between gap-2" style={{ height: `${height}px` }}>
                {data.map((item, index) => {
                    const barHeight = (item.value / maxValue) * (height - 60);
                    return (
                        <motion.div
                            key={index}
                            initial={{ height: 0 }}
                            animate={{ height: barHeight }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="flex flex-col items-center flex-1 max-w-20"
                        >
                            <div className="relative group">
                                <div
                                    className="bg-gradient-to-t from-red-600 to-red-400 dark:from-red-500 dark:to-red-300 rounded-t-lg w-full min-w-8 transition-all duration-300 hover:from-red-700 hover:to-red-500"
                                    style={{ height: `${barHeight}px` }}
                                />

                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                    {item.value}
                                </div>
                            </div>

                            <div className="mt-2 text-xs text-text-muted text-center font-medium">
                                {item.label}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

const LineChart = ({ data = [], title = "Line Chart", height = 300 }) => {
    const maxValue = Math.max(...data.map(item => item.value));
    const minValue = Math.min(...data.map(item => item.value));
    const range = maxValue - minValue || 1;

    const points = data.map((item, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = 100 - ((item.value - minValue) / range) * 80;
        return `${x},${y}`;
    }).join(' ');

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-bg-card/95 dark:bg-bg-card/90 backdrop-blur-xl rounded-2xl shadow-modern-lg dark:shadow-modern-2xl interactive-border p-6"
        >
            <h3 className="text-lg font-bold text-text-primary mb-6">{title}</h3>

            <div className="relative" style={{ height: `${height}px` }}>
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <defs>
                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border-primary/30" />
                        </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid)" />

                    {/* Area under curve */}
                    <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.3 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        d={`M 0,100 L ${points} L 100,100 Z`}
                        fill="url(#gradient)"
                        className="text-red-500"
                    />

                    {/* Line */}
                    <motion.polyline
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5 }}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        points={points}
                        className="text-red-600 dark:text-red-400"
                    />

                    {/* Data points */}
                    {data.map((item, index) => {
                        const x = (index / (data.length - 1)) * 100;
                        const y = 100 - ((item.value - minValue) / range) * 80;
                        return (
                            <motion.circle
                                key={index}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                                cx={x}
                                cy={y}
                                r="2"
                                fill="currentColor"
                                className="text-red-600 dark:text-red-400"
                            />
                        );
                    })}

                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" className="text-red-500" />
                            <stop offset="100%" stopColor="currentColor" stopOpacity="0" className="text-red-500" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Labels */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-text-muted mt-2">
                    {data.map((item, index) => (
                        <span key={index} className="text-center">
                            {item.label}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const PieChart = ({ data = [], title = "Pie Chart", size = 200 }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;

    const colors = [
        'text-red-500',
        'text-blue-500',
        'text-green-500',
        'text-yellow-500',
        'text-purple-500',
        'text-orange-500'
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-bg-card/95 dark:bg-bg-card/90 backdrop-blur-xl rounded-2xl shadow-modern-lg dark:shadow-modern-2xl interactive-border p-6"
        >
            <h3 className="text-lg font-bold text-text-primary mb-6">{title}</h3>

            <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="relative" style={{ width: size, height: size }}>
                    <svg width={size} height={size} className="transform -rotate-90">
                        {data.map((item, index) => {
                            const percentage = (item.value / total) * 100;
                            const angle = (item.value / total) * 360;
                            const radius = size / 2 - 20;
                            const centerX = size / 2;
                            const centerY = size / 2;

                            const startAngle = (currentAngle * Math.PI) / 180;
                            const endAngle = ((currentAngle + angle) * Math.PI) / 180;

                            const x1 = centerX + radius * Math.cos(startAngle);
                            const y1 = centerY + radius * Math.sin(startAngle);
                            const x2 = centerX + radius * Math.cos(endAngle);
                            const y2 = centerY + radius * Math.sin(endAngle);

                            const largeArcFlag = angle > 180 ? 1 : 0;

                            const pathData = [
                                `M ${centerX} ${centerY}`,
                                `L ${x1} ${y1}`,
                                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                                'Z'
                            ].join(' ');

                            currentAngle += angle;

                            return (
                                <motion.path
                                    key={index}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.8, delay: index * 0.2 }}
                                    d={pathData}
                                    fill="currentColor"
                                    className={`${colors[index % colors.length]} hover:opacity-80 transition-opacity duration-200`}
                                />
                            );
                        })}
                    </svg>
                </div>

                <div className="flex-1 space-y-3">
                    {data.map((item, index) => {
                        const percentage = ((item.value / total) * 100).toFixed(1);
                        return (
                            <div key={index} className="flex items-center gap-3">
                                <div className={`w-4 h-4 rounded-full ${colors[index % colors.length]} bg-current`} />
                                <span className="text-sm text-text-primary font-medium flex-1">
                                    {item.label}
                                </span>
                                <span className="text-sm text-text-muted">
                                    {percentage}% ({item.value})
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};

const DonutChart = ({ data = [], title = "Donut Chart", size = 200 }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const radius = size / 2 - 20;
    const innerRadius = radius * 0.6;
    const circumference = 2 * Math.PI * radius;
    let currentPercentage = 0;

    const colors = [
        'stroke-red-500',
        'stroke-blue-500',
        'stroke-green-500',
        'stroke-yellow-500',
        'stroke-purple-500',
        'stroke-orange-500'
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-bg-card/95 dark:bg-bg-card/90 backdrop-blur-xl rounded-2xl shadow-modern-lg dark:shadow-modern-2xl interactive-border p-6"
        >
            <h3 className="text-lg font-bold text-text-primary mb-6">{title}</h3>

            <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="relative" style={{ width: size, height: size }}>
                    <svg width={size} height={size} className="transform -rotate-90">
                        {/* Background circle */}
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="20"
                            className="text-border-primary/20"
                        />

                        {/* Data segments */}
                        {data.map((item, index) => {
                            const percentage = (item.value / total) * 100;
                            const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
                            const strokeDashoffset = -((currentPercentage / 100) * circumference);

                            currentPercentage += percentage;

                            return (
                                <motion.circle
                                    key={index}
                                    initial={{ strokeDasharray: `0 ${circumference}` }}
                                    animate={{ strokeDasharray }}
                                    transition={{ duration: 1, delay: index * 0.2 }}
                                    cx={size / 2}
                                    cy={size / 2}
                                    r={radius}
                                    fill="none"
                                    strokeWidth="20"
                                    strokeDashoffset={strokeDashoffset}
                                    className={`${colors[index % colors.length]} hover:opacity-80 transition-opacity duration-200`}
                                />
                            );
                        })}
                    </svg>

                    {/* Center text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-text-primary">{total}</span>
                        <span className="text-sm text-text-muted">Total</span>
                    </div>
                </div>

                <div className="flex-1 space-y-3">
                    {data.map((item, index) => {
                        const percentage = ((item.value / total) * 100).toFixed(1);
                        return (
                            <div key={index} className="flex items-center gap-3">
                                <div className={`w-4 h-4 rounded-full ${colors[index % colors.length].replace('stroke-', 'bg-')}`} />
                                <span className="text-sm text-text-primary font-medium flex-1">
                                    {item.label}
                                </span>
                                <span className="text-sm text-text-muted">
                                    {percentage}% ({item.value})
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};

export { BarChart, LineChart, PieChart, DonutChart };