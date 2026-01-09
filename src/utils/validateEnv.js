// Environment Variables Validation
const requiredEnvVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID',
    'VITE_IMGBB_API_KEY'
];

export const validateEnvironment = () => {
    const missingVars = requiredEnvVars.filter(
        varName => !import.meta.env[varName]
    );

    if (missingVars.length > 0) {
        console.error('Missing required environment variables:', missingVars);
        throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
    }

    console.log('✅ All required environment variables are present');
};

// Input sanitization utilities
export const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;

    return input
        .trim()
        .replace(/[<>]/g, '') // Remove potential XSS characters
        .slice(0, 1000); // Limit length
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateBloodGroup = (bloodGroup) => {
    const validGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    return validGroups.includes(bloodGroup);
};