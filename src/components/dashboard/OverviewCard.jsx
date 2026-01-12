import React from "react";
import { motion } from "framer-motion";

const OverviewCard = ({
    title,
    value,
    icon: Icon,
    color = "red",
    trend = null,
    subtitle = null,
    delay = 0,
    onClick = null
}) => {
    const colorClasses = {
        red: {
            bg: "bg-red-500",
            light: "bg-red-100 dark:bg-red-900/30",
            text: "text-red-600 dark:text-red-400",
            border: "border-red-200 dark:border-red-700"
        },
        blue: {
            bg: "bg-blue-500",
            light: "bg-blue-100 dark:bg-blue-900/30",
            text: "text-blue-600 dark:text-blue-400",
            border: "border-blue-200 dark:border-blue-700"
        },
        green: {
            bg: "bg-green-500",
            light: "bg-green-100 dark:bg-green-900/30",
            text: "text-green-600 dark:text-green-400",
            border: "border-green-200 dark:border-green-700"
        },
        purple: {
            bg: "bg-purple-500",
            light: "bg-purple-100 dark:bg-purple-900/30",
            text: "text-purple-600 dark:text-purple-400",
            border: "border-purple-200 dark:border-purple-700"
        },
        yellow: {
            bg: "bg-yellow-500",
            light: "bg-yellow-100 dark:bg-yellow-900/30",
            text: "text-yellow-600 dark:text-yellow-400",
            border: "border-yellow-200 dark:border-yellow-700"
        },
        orange: {
            bg: "bg-orange-500",
            light: "bg-orange-100 dark:bg-orange-900/30",
            text: "text-orange-600 dark:text-orange-400",
            border: "border-orange-200 dark:border-orange-700"
        }
    };

    const colors = colorClasses[color] || colorClasses.red;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ scale: 1.01, y: -1 }}
            onClick={onClick}
            className={`
        bg-bg-card/95 dark:bg-bg-card/90 backdrop-blur-xl rounded-xl 
        shadow-modern-md dark:shadow-modern-lg interactive-border
        p-3 sm:p-4 transition-all duration-300 hover:shadow-modern-lg dark:hover:shadow-modern-xl
        card-content-safe min-h-[100px] sm:min-h-[120px] lg:min-h-[130px]
        ${onClick ? 'cursor-pointer' : ''}
      `}
        >
            <div className="flex items-center h-full">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className={`
              p-1.5 sm:p-2 rounded-lg ${colors.bg} shadow-modern-sm
              flex items-center justify-center flex-shrink-0
            `}>
                            <Icon className="text-sm sm:text-lg lg:text-xl text-white" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm text-text-muted uppercase tracking-wide mb-0.5 font-medium truncate">
                                {title}
                            </p>
                            <div className="flex items-baseline gap-1 sm:gap-2 flex-wrap">
                                <p className="text-lg sm:text-xl lg:text-2xl text-text-primary font-bold truncate">
                                    {typeof value === 'number' ? value.toLocaleString() : value}
                                </p>
                                {trend && (
                                    <span className={`
                    text-xs font-medium px-1.5 py-0.5 rounded-full flex-shrink-0
                    ${trend.type === 'up'
                                            ? 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
                                            : trend.type === 'down'
                                                ? 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30'
                                                : 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30'
                                        }
                  `}>
                                        {trend.type === 'up' ? '↗' : trend.type === 'down' ? '↘' : '→'} {trend.value}
                                    </span>
                                )}
                            </div>
                            {subtitle && (
                                <p className="text-xs text-text-secondary mt-0.5 truncate">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative gradient overlay */}
            <div className={`
        absolute inset-0 rounded-xl opacity-0 hover:opacity-5 dark:hover:opacity-10 
        transition-opacity duration-300 ${colors.bg} pointer-events-none
      `} />
        </motion.div>
    );
};

export default OverviewCard;