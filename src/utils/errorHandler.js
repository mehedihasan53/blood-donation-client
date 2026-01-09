import toast from 'react-hot-toast';

// Error types for better categorization
export const ERROR_TYPES = {
    NETWORK: 'NETWORK_ERROR',
    AUTHENTICATION: 'AUTH_ERROR',
    VALIDATION: 'VALIDATION_ERROR',
    PERMISSION: 'PERMISSION_ERROR',
    SERVER: 'SERVER_ERROR',
    UNKNOWN: 'UNKNOWN_ERROR'
};

// Centralized error handler
export class ErrorHandler {
    static handle(error, context = '') {
        console.error(`[${context}] Error:`, error);

        const errorType = this.categorizeError(error);
        const userMessage = this.getUserMessage(errorType, error);

        // Log to external service in production
        if (import.meta.env.PROD) {
            this.logToService(error, context, errorType);
        }

        // Show user-friendly message
        toast.error(userMessage);

        return { type: errorType, message: userMessage };
    }

    static categorizeError(error) {
        if (error.code?.includes('auth/')) return ERROR_TYPES.AUTHENTICATION;
        if (error.response?.status === 401) return ERROR_TYPES.AUTHENTICATION;
        if (error.response?.status === 403) return ERROR_TYPES.PERMISSION;
        if (error.response?.status >= 400 && error.response?.status < 500) return ERROR_TYPES.VALIDATION;
        if (error.response?.status >= 500) return ERROR_TYPES.SERVER;
        if (error.code === 'NETWORK_ERROR') return ERROR_TYPES.NETWORK;

        return ERROR_TYPES.UNKNOWN;
    }

    static getUserMessage(errorType, error) {
        const messages = {
            [ERROR_TYPES.NETWORK]: 'Network connection failed. Please check your internet connection.',
            [ERROR_TYPES.AUTHENTICATION]: 'Authentication failed. Please login again.',
            [ERROR_TYPES.PERMISSION]: 'You don\'t have permission to perform this action.',
            [ERROR_TYPES.VALIDATION]: error.response?.data?.message || 'Invalid input data.',
            [ERROR_TYPES.SERVER]: 'Server error occurred. Please try again later.',
            [ERROR_TYPES.UNKNOWN]: 'An unexpected error occurred. Please try again.'
        };

        return messages[errorType] || messages[ERROR_TYPES.UNKNOWN];
    }

    static logToService(error, context, errorType) {
        // In production, send to logging service like Sentry, LogRocket, etc.
        const errorData = {
            message: error.message,
            stack: error.stack,
            context,
            type: errorType,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        // Example: Send to logging service
        // fetch('/api/logs', { method: 'POST', body: JSON.stringify(errorData) });
        console.log('Error logged:', errorData);
    }
}

// Async error boundary for promises
export const withErrorHandling = (asyncFn, context = '') => {
    return async (...args) => {
        try {
            return await asyncFn(...args);
        } catch (error) {
            ErrorHandler.handle(error, context);
            throw error; // Re-throw for component-level handling if needed
        }
    };
};