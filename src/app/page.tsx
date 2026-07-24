"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Music, Lightbulb, Car } from "lucide-react"; 

const services = [
  { name: "Ceramic Coating", icon: Shield, desc: "Ultimate shine and ceramic protection for your paintwork." },
  { name: "PPF Installation", icon: Car, desc: "Self-healing film to guard against scratches and chips." },
  { name: "Music Systems", icon: Music, desc: "Premium audio upgrades and OEM camera integration." },
  { name: "LED Upgrades", icon: Lightbulb, desc: "High-visibility LED headlights and custom lighting." },
];

export default function Home() {
  const [isRipping, setIsRipping] = useState(false);
  const router = useRouter();

  const handleRipEffect = () => {
    setIsRipping(true);
    setTimeout(() => {
      router.push("/build");
    }, 500); 
  };

  return (
    <div className="w-full relative bg-black">
      
      {/* HIGH SPEED RIP TRANSITION LAYER */}
      <motion.div
        initial={{ x: "-150%" }}
        animate={{ x: isRipping ? "200%" : "-150%" }}
        transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
        className="fixed top-0 bottom-0 left-0 w-[150vw] bg-yellow-500 z-[100] origin-left -skew-x-12 shadow-[0_0_50px_rgba(250,204,21,1)] flex items-center justify-center"
        style={{ pointerEvents: "none" }} 
      />

      {/* Hero Section - Swapped slate for pure black */}
      <section className="relative h-[80vh] flex items-center justify-center bg-black overflow-hidden">
        {/* Abstract Background Element (Glow) - Removed slate from gradient */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500 via-black to-black"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight"
          >
            Elevate Your <span className="text-yellow-400">Ride</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto"
          >
            Everything for your car at one place in the heart of Mount Road.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.button
              onClick={handleRipEffect}
              animate={isRipping ? { x: "100vw", skewX: -30, opacity: 0 } : { x: 0, skewX: 0, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeIn" }}
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg px-8 py-4 rounded-full transition-shadow hover:scale-105 inline-block shadow-[0_0_25px_rgba(250,204,21,0.3)] cursor-pointer"
            >
              come build your car with us
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Services Highlight Section - Zinc instead of Slate */}
      <section className="py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Signature Services</h2>
            <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-yellow-500/50 transition-all hover:-translate-y-2 group"
                >
                  <div className="bg-zinc-800 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-500 transition-colors">
                    <Icon size={28} className="text-yellow-400 group-hover:text-black transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">{service.name}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{service.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}