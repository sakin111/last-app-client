"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TiltTextProps {
    text: string;
    className?: string;
}

const TiltText: React.FC<TiltTextProps> = ({ text, className }) => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);



    const handleMouseEnter = () => setIsHovered(true);

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
        setIsHovered(false);
    };



    return (
        <section className="py-32 overflow-hidden flex items-center justify-center bg-transparent relative group">
            <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-[120px]"
                style={{
                    background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, #3b82f6, #9333ea, transparent)`
                }}
            />

            <div
                ref={containerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={cn(
                    "relative cursor-default transition-all duration-500 ease-out will-change-transform",
                    className
                )}
                style={{
                    perspective: "1200px",
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.05 : 1})`,
                }}
            >

                <div className="relative">

                    <h2
                        className="text-8xl md:text-[12rem] font-black uppercase tracking-tighter select-none absolute inset-0 blur-2xl opacity-20 dark:opacity-40 transition-all duration-300"
                        style={{
                            color: "#3b82f6",
                            transform: `translateZ(-50px) translate(${rotation.y * -0.8}px, ${rotation.x * 0.8}px)`,
                        }}
                    >
                        {text}
                    </h2>

                    <h2
                        className="text-8xl md:text-[12rem] font-black uppercase tracking-tighter select-none relative z-10 transition-all duration-300 bg-clip-text text-transparent"
                        style={{
                            backgroundImage: isHovered
                                ? `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, #60a5fa 0%, #3b82f6 30%, #1d4ed8 70%)`
                                : "linear-gradient(to bottom, #9ca3af, #4b5563)",
                            WebkitTextStroke: "1px rgba(156, 163, 175, 0.3)",
                            textShadow: isHovered
                                ? `${rotation.y * -0.3}px ${rotation.x * 0.3}px 15px rgba(59, 130, 246, 0.5)`
                                : "none"
                        }}
                    >
                        {text}
                    </h2>


                    <h2
                        className="text-8xl md:text-[12rem] font-black uppercase tracking-tighter select-none absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
                        style={{
                            color: "transparent",
                            WebkitTextStroke: isHovered ? "1.5px #60a5fa" : "1px rgba(156, 163, 175, 0.5)",
                            opacity: isHovered ? 0.8 : 0.3,
                            maskImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 60%)`,
                            WebkitMaskImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 60%)`,
                        }}
                    >
                        {text}
                    </h2>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-50">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gray-400" />
                <span className="text-[10px] uppercase tracking-[0.4em] font-medium text-gray-500">Premium Series</span>
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gray-400" />
            </div>
        </section>
    );
};

export default TiltText;
