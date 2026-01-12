import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const Card = React.forwardRef(({ className, children, hover = true, ...props }, ref) => (
  <motion.div
    ref={ref}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={hover ? { y: -2, scale: 1.01 } : {}}
    className={cn(
      "rounded-2xl bg-bg-card/95 dark:bg-bg-card/90 backdrop-blur-xl border border-border-primary/20 dark:border-border-primary/30 shadow-lg dark:shadow-2xl transition-all duration-300",
      hover && "hover:shadow-xl dark:hover:shadow-3xl hover:border-border-primary/30 dark:hover:border-border-primary/40",
      className
    )}
    {...props}
  >
    {children}
  </motion.div>
));

Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6 pb-4", className)}
    {...props}
  />
));

CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-bold leading-none tracking-tight text-text-primary", className)}
    {...props}
  />
));

CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-text-secondary", className)}
    {...props}
  />
));

CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));

CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };