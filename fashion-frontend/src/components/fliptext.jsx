import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function Fliptext() {
    const words = ["Discover your perfect style in seconds",
        "AI-powered fashion that fits your vibe",
        "Find clothes you'll actually love wearing",
        "Your personal stylist, powered by AI",
        "Stop guessing. Start styling."];
    return (
        <motion.h1
            initial={{
                opacity: 0,
            }}
            whileInView={{
                opacity: 1,
            }}
            className={cn(
                "relative mb-6 max-w-2xl text-left text-4xl leading-normal font-bold tracking-tight text-zinc-700 md:text-7xl dark:text-zinc-100"
            )}
            layout>
            <div className="inline-block">
                <ContainerTextFlip words={words} />
                {/* <Blips /> */}
            </div>
        </motion.h1>
    );
}
