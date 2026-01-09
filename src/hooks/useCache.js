import { useState, useEffect, useCallback, useRef } from 'react';

// Simple in-memory cache with TTL
class CacheManager {
    constructor() {
        this.cache = new Map();
    }

    set(key, data, ttl = 300000) { // 5 minutes default TTL
        const expiry = Date.now() + ttl;
        this.cache.set(key, { data, expiry });
    }

    get(key) {
        const item = this.cache.get(key);
        if (!item) return null;

        if (Date.now() > item.expiry) {
            this.cache.delete(key);
            return null;
        }

        return item.data;
    }

    clear() {
        this.cache.clear();
    }

    delete(key) {
        this.cache.delete(key);
    }
}

const cacheManager = new CacheManager();

// Hook for caching API responses
export const useCache = (key, fetcher, options = {}) => {
    const { ttl = 300000, enabled = true } = options;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const abortControllerRef = useRef(null);

    const fetchData = useCallback(async (forceRefresh = false) => {
        if (!enabled) return;

        // Check cache first
        if (!forceRefresh) {
            const cachedData = cacheManager.get(key);
            if (cachedData) {
                setData(cachedData);
                return cachedData;
            }
        }

        // Cancel previous request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();
        setLoading(true);
        setError(null);

        try {
            const result = await fetcher(abortControllerRef.current.signal);

            // Cache the result
            cacheManager.set(key, result, ttl);
            setData(result);
            return result;
        } catch (err) {
            if (err.name !== 'AbortError') {
                setError(err);
                console.error(`Cache fetch error for key ${key}:`, err);
            }
        } finally {
            setLoading(false);
        }
    }, [key, fetcher, ttl, enabled]);

    // Initial fetch
    useEffect(() => {
        fetchData();

        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [fetchData]);

    const invalidate = useCallback(() => {
        cacheManager.delete(key);
        fetchData(true);
    }, [key, fetchData]);

    const clearCache = useCallback(() => {
        cacheManager.clear();
    }, []);

    return {
        data,
        loading,
        error,
        refetch: () => fetchData(true),
        invalidate,
        clearCache
    };
};