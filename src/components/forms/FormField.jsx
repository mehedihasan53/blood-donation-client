import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

// Reusable form field component with modern dark mode support
export const FormField = ({
  label,
  name,
  type = 'text',
  placeholder,
  icon: Icon,
  error,
  required = false,
  disabled = false,
  options = [], // For select fields
  value,
  onChange,
  className = '',
  ...props
}) => {
  const baseInputClass = cn(
    "w-full px-4 py-3.5 rounded-xl outline-none transition-all duration-300 backdrop-blur-sm",
    "bg-bg-tertiary/80 dark:bg-bg-tertiary/60 text-text-primary placeholder:text-text-muted",
    "interactive-border focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50",
    Icon ? 'pl-12' : 'pl-4',
    error && 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50',
    disabled && 'opacity-60 cursor-not-allowed',
    className
  );

  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <div className="relative">
            {Icon && (
              <Icon className="absolute left-4 top-3.5 text-text-muted text-lg z-10" />
            )}
            <select
              name={name}
              value={value}
              onChange={onChange}
              disabled={disabled}
              className={cn(baseInputClass, "appearance-none cursor-pointer")}
              {...props}
            >
              <option value="" className="text-text-muted">
                {placeholder || `Select ${label}`}
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value} className="text-text-primary bg-bg-card">
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-3.5 pointer-events-none">
              <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        );

      case 'textarea':
        return (
          <div className="relative">
            {Icon && (
              <Icon className="absolute left-4 top-3.5 text-text-muted text-lg" />
            )}
            <textarea
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              disabled={disabled}
              className={cn(baseInputClass, "resize-none")}
              rows={4}
              {...props}
            />
          </div>
        );

      default:
        return (
          <div className="relative">
            {Icon && (
              <Icon className="absolute left-4 top-3.5 text-text-muted text-lg" />
            )}
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              disabled={disabled}
              className={baseInputClass}
              {...props}
            />
          </div>
        );
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-text-primary">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {renderInput()}

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-600 dark:text-red-400 font-medium"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

// Form validation utilities
export const validators = {
  required: (value) => value ? null : 'This field is required',

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Please enter a valid email address';
  },

  minLength: (min) => (value) =>
    value && value.length >= min ? null : `Must be at least ${min} characters`,

  maxLength: (max) => (value) =>
    value && value.length <= max ? null : `Must be no more than ${max} characters`,

  phone: (value) => {
    const phoneRegex = /^[0-9+\-\s()]+$/;
    return phoneRegex.test(value) ? null : 'Please enter a valid phone number';
  },

  bloodGroup: (value) => {
    const validGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    return validGroups.includes(value) ? null : 'Please select a valid blood group';
  }
};

// Form hook for managing form state and validation
export const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    // Validate field on blur
    if (validationRules[name]) {
      const error = validationRules[name](values[name]);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const validate = () => {
    const newErrors = {};

    Object.keys(validationRules).forEach(field => {
      const error = validationRules[field](values[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(validationRules).reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {}));

    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    reset,
    setValues,
    setErrors
  };
};