// Application Configuration Constants
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || "https://blood-donation-server-kohl.vercel.app",
    TIMEOUT: 10000,
};

export const FIREBASE_CONFIG = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const USER_ROLES = {
    ADMIN: "admin",
    DONOR: "donor",
    VOLUNTEER: "volunteer",
};

export const REQUEST_STATUS = {
    PENDING: "pending",
    IN_PROGRESS: "inprogress",
    DONE: "done",
    CANCELED: "canceled",
};

export const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    DASHBOARD: "/dashboard",
    SEARCH: "/search",
    DONATE: "/donate",
};

export const EXTERNAL_APIS = {
    IMGBB_API_KEY: import.meta.env.VITE_IMGBB_API_KEY,
    IMGBB_UPLOAD_URL: "https://api.imgbb.com/1/upload",
};