import React from 'react';
import { motion } from 'framer-motion';

// Reusable form field component
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
  const baseInputClass = `
    w-full px-4 py-3.5 border rounded-xl outline-none transition-all duration-200
    ${Icon ? 'pl-12' : 'pl-4'}
    ${error 
      ? 'border-red-500 focus:ring-2 focus:ring-red-500 bg-red-50' 
      : 'border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white'
    }
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
  `;

  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`${baseInputClass} appearance-none`}
            {...props}
          >
            <option value="">{placeholder || `Select ${label}`}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'textarea':
        return (
          <textarea
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`${baseInputClass} resize-none`}
            rows={4}
            {...props}
          />
        );
      
      default:
        return (
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
        );
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-3.5 text-gray-400 text-lg" />
        )}
        {renderInput()}
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-600 font-medium"
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
  
  bloodGroup: (value) => {
    const validGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    return validGroups.includes(value) ? null : 'Please select a valid blood group';
  },
  
  futureDate: (value) => {
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today ? null : 'Date must be today or in the future';
  },
  
  positiveNumber: (value) => {
    const num = parseFloat(value);
    return num > 0 ? null : 'Must be a positive number';
  }
};

// Custom hook for form validation
export const useFormValidation = (initialValues, validationRules) => {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  const validateField = (name, value) => {
    const rules = validationRules[name];
    if (!rules) return null;

    for (const rule of rules) {
      const error = rule(value);
      if (error) return error;
    }
    return null;
  };

  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, values[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateAll = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(name => {
      const error = validateField(name, values[name]);
      newErrors[name] = error;
      if (error) isValid = false;
    });

    setErrors(newErrors);
    setTouched(Object.keys(validationRules).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    
    return isValid;
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    setValues,
    isValid: Object.values(errors).every(error => !error)
  };
};