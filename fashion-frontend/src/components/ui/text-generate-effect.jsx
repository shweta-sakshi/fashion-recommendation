import { useEffect, useRef, useState } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
    words = "",
    className,
    filter = true,
    duration = 0.5,
    threshold = 0.1 // How much of the element should be visible before triggering
}) => {
    const [scope, animate] = useAnimate();
    const [hasAnimated, setHasAnimated] = useState(false);
    const elementRef = useRef(null);

    let wordsArray = words.split(" ");

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Only animate if it's intersecting and hasn't been animated before
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    animate("span", {
                        opacity: 1,
                        filter: filter ? "blur(0px)" : "none",
                    }, {
                        duration: duration ? duration : 1,
                        delay: stagger(0.2),
                    });
                }
            },
            {
                threshold: threshold, // Trigger when 10% of the element is visible
                rootMargin: "0px 0px -50px 0px" // Trigger slightly before the element is fully visible
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [animate, duration, filter, hasAnimated, threshold]);

    const renderWords = () => {
        return (
            <motion.div ref={scope}>
                {wordsArray.map((word, idx) => {
                    return (
                        <motion.span
                            key={word + idx}
                            className="dark:text-white text-black opacity-0"
                            style={{
                                filter: filter ? "blur(10px)" : "none",
                            }}>
                            {word}{" "}
                        </motion.span>
                    );
                })}
            </motion.div>
        );
    };

    return (
        <div ref={elementRef} className={cn("font-bold", className)}>
            <div className="mt-4">
                <div className="dark:text-white text-black text-2xl leading-snug tracking-wide">
                    {renderWords()}
                </div>
            </div>
        </div>
    );
};