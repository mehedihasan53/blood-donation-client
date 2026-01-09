import { useMemo, useCallback } from 'react';
import axios from 'axios';
import { API_CONFIG } from '../config/constants';
import { ErrorHandler } from '../utils/errorHandler';

// Create axios instance with optimizations
const createAxiosInstance = (baseURL, timeout = API_CONFIG.TIMEOUT) => {
    const instance = axios.create({
        baseURL,
        timeout,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Request interceptor for performance monitoring
    instance.interceptors.request.use(
        (config) => {
            config.metadata = { startTime: new Date() };
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Response interceptor for error handling and performance logging
    instance.interceptors.response.use(
        (response) => {
            const endTime = new Date();
            const duration = endTime - response.config.metadata.startTime;

            // Log slow requests in development
            if (duration > 3000 && import.meta.env.DEV) {
                console.warn(`Slow request detected: ${response.config.url} took ${duration}ms`);
            }

            return response;
        },
        (error) => {
            ErrorHandler.handle(error, 'API Request');
            return Promise.reject(error);
        }
    );

    return instance;
};

// Optimized axios hook with caching
export const useOptimizedAxios = () => {
    const axiosInstance = useMemo(
        () => createAxiosInstance(API_CONFIG.BASE_URL),
        []
    );

    // Memoized request methods
    const get = useCallback((url, config) => axiosInstance.get(url, config), [axiosInstance]);
    const post = useCallback((url, data, config) => axiosInstance.post(url, data, config), [axiosInstance]);
    const put = useCallback((url, data, config) => axiosInstance.put(url, data, config), [axiosInstance]);
    const patch = useCallback((url, data, config) => axiosInstance.patch(url, data, config), [axiosInstance]);
    const del = useCallback((url, config) => axiosInstance.delete(url, config), [axiosInstance]);

    return { get, post, put, patch, delete: del, instance: axiosInstance };
};