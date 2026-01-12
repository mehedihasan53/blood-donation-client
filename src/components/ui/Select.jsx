import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { FaChevronDown } from "react-icons/fa";

const Select = React.forwardRef(({
    className,
    children,
    label,
    error,
    icon: Icon,
    placeholder = "Select an option",
    ...props
}, ref) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="text-sm font-medium text-text-primary">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-4 h-4 z-10" />
                )}
                <motion.select
                    ref={ref}
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className={cn(
                        "flex h-10 w-full rounded-xl bg-bg-tertiary/80 dark:bg-bg-tertiary/60 backdrop-blur-sm px-3 py-2 text-sm text-text-primary interactive-border focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 appearance-none cursor-pointer",
                        Icon && "pl-10",
                        error && "border-red-500/50 focus:border-red-500 focus:ring-red-500/50",
                        className
                    )}
                    {...props}
                >
                    <option value="" disabled className="text-text-muted">
                        {placeholder}
                    </option>
                    {children}
                </motion.select>
                <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted w-3 h-3 pointer-events-none" />
            </div>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-600 dark:text-red-400"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
});

Select.displayName = "Select";

export { Select };