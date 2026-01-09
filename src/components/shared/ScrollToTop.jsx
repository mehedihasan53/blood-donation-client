import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Small delay to ensure the page has rendered
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
        };

        // Use requestAnimationFrame for better performance
        const timeoutId = setTimeout(() => {
            requestAnimationFrame(scrollToTop);
        }, 0);

        return () => clearTimeout(timeoutId);
    }, [pathname]);

    return null;
};

export default ScrollToTop;