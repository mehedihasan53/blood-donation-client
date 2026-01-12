import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const buttonVariants = {
  default: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl",
  secondary: "bg-bg-tertiary/80 dark:bg-bg-tertiary/60 hover:bg-bg-tertiary/90 dark:hover:bg-bg-tertiary/80 text-text-primary border border-border-primary/30 dark:border-border-primary/40 shadow-md hover:shadow-lg",
  outline: "border border-border-primary/50 dark:border-border-primary/60 hover:bg-bg-tertiary/50 dark:hover:bg-bg-tertiary/30 text-text-primary shadow-sm hover:shadow-md",
  ghost: "hover:bg-bg-tertiary/40 dark:hover:bg-bg-tertiary/20 text-text-primary",
  success: "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl",
  warning: "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl",
};

const sizeVariants = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
  xl: "px-8 py-4 text-lg",
};

const Button = React.forwardRef(({
  className,
  variant = "default",
  size = "md",
  children,
  disabled,
  ...props
}, ref) => {
  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-bg-primary disabled:opacity-50 disabled:cursor-not-allowed",
        buttonVariants[variant],
        sizeVariants[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };