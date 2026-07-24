"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MonitorPlay, Speaker, Lightbulb, Check, Plus, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

// Types
interface Product {
  id: string;
  category: "multimedia" | "speaker" | "led";
  name: string;
  price: string;
}

const categoryConfig = {
  multimedia: { title: "Multimedia Players", icon: MonitorPlay },
  speaker: { title: "Speakers & Audio", icon: Speaker },
  led: { title: "LED Lights", icon: Lightbulb },
};

export default function EstimatorPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<keyof typeof categoryConfig>("led");
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);

  // The full catalog data (You can sync this with a database later)
  const products: Product[] = [
    { id: "1", category: "multimedia", name: "Monoblanch Android System 9” TS7 4+64 Basic", price: "7,500.00" },
    { id: "2", category: "multimedia", name: "Alpha Android System 9” A100 4+64G CP", price: "9,500.00" },
    { id: "3", category: "multimedia", name: "NFS Elite Series Infotainment System 9” 2+64G CP", price: "12,500.00" },
    { id: "4", category: "multimedia", name: "Nakamichi NAM5240 Multimedia Receiver 2+64G CP", price: "15,000.00" },
    { id: "5", category: "multimedia", name: "Unplug Pro Version Multi Media Player T400 Pro 4+64 CP", price: "18,500.00" },
    
    { id: "6", category: "speaker", name: "Zella Electra Car Speaker 6” 600W", price: "1,800.00" },
    { id: "7", category: "speaker", name: "Pioneer Car Component Speaker 6.5” 390W (TS-C6021N)", price: "Price on Request" },
    { id: "8", category: "speaker", name: "Pioneer Car Coaxial Speaker 6.5” 300W (TS-G1620S-2)", price: "Price on Request" },
    { id: "9", category: "speaker", name: "Aura Storm Component Speaker 6.5” 260W (6.2CSX)", price: "5,900.00" },
    { id: "10", category: "speaker", name: "Blaupunkt Component Speaker 6.5” 390W (tx 65c)", price: "5,800.00" },
    
    { id: "11", category: "led", name: "Ultra Audio 180W Tri Colour LED", price: "4,500.00" },
    { id: "12", category: "led", name: "Ultra Audio 220W Diamond LED", price: "6,500.00" },
    { id: "13", category: "led", name: "Battle Beast 250W LED", price: "6,900.00" },
    { id: "14", category: "led", name: "Auto Yu 180W LED", price: "4,700.00" },
    { id: "15", category: "led", name: "Vision I 320W LED", price: "7,900.00" },
  ];

  // Logic to toggle items in and out of the Build Summary
  const toggleItem = (product: Product) => {
    const isSelected = selectedItems.find((item) => item.id === product.id);
    if (isSelected) {
      setSelectedItems(selectedItems.filter((item) => item.id !== product.id));
    } else {
      setSelectedItems([...selectedItems, product]);
    }
  };

  // Helper to calculate total price (ignoring "Price on Request")
  const estimatedTotal = useMemo(() => {
    return selectedItems.reduce((total, item) => {
      const priceVal = parseInt(item.price.replace(/,/g, ""));
      return total + (isNaN(priceVal) ? 0 : priceVal);
    }, 0);
  }, [selectedItems]);

  // ==========================================
  // WHATSAPP CHECKOUT LOGIC
  // ==========================================
  const handleWhatsAppCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item for your build.");
      return;
    }

    const phoneNumber = "919787011740"; // Indian Country Code + Owners Number
    
    let message = "🚗 *New Build Request* 🚗\n\nHi Express Carzone, I'm interested in the following setup:\n\n";
    
    selectedItems.forEach((item) => {
      message += `• ${item.name} - ₹${item.price}\n`;
    });
    
    message += `\n*Estimated Total: ₹${estimatedTotal.toLocaleString("en-IN")}*\n\nPlease let me know when I can drop my car off!`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Opens WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-black pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header / Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => router.push("/build")}
            className="p-2 bg-zinc-900 rounded-full hover:bg-yellow-500 hover:text-black text-white transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
            Express Carzone Studio
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ================= LEFT SIDE: SELECTION GRID ================= */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Category Navigation Tabs */}
            <div className="flex flex-wrap gap-4 border-b border-zinc-900 pb-6">
              {(Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>).map((key) => {
                const category = categoryConfig[key];
                const Icon = category.icon;
                const isActive = activeCategory === key;
                
                return (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all border ${
                      isActive 
                        ? "bg-yellow-500 text-black border-yellow-500 shadow-[0_0_15px_rgba(250,204,21,0.2)]" 
                        : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600"
                    }`}
                  >
                    <Icon size={18} />
                    {category.title}
                  </button>
                );
              })}
            </div>

            {/* Product Grid */}
            <motion.div 
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {products
                .filter(p => p.category === activeCategory)
                .map((product) => {
                  const isSelected = selectedItems.some(item => item.id === product.id);
                  
                  return (
                    <div 
                      key={product.id}
                      onClick={() => toggleItem(product)}
                      className={`relative p-6 rounded-2xl cursor-pointer transition-all border flex flex-col justify-between h-40 ${
                        isSelected 
                          ? "bg-yellow-500/10 border-yellow-500 shadow-[0_0_20px_rgba(250,204,21,0.05)]" 
                          : "bg-black border-zinc-900 hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest bg-zinc-900 px-2 py-1 rounded">
                          {product.category.replace("-", " ")}
                        </span>
                        
                        {/* Add / Check Icon */}
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                          isSelected ? "bg-yellow-500 text-black" : "bg-zinc-900 text-zinc-500"
                        }`}>
                          {isSelected ? <Check size={14} strokeWidth={3} /> : <Plus size={14} />}
                        </div>
                      </div>

                      <div>
                        <h3 className={`text-sm font-bold leading-snug mb-1 ${isSelected ? "text-yellow-400" : "text-white"}`}>
                          {product.name}
                        </h3>
                        <p className="text-zinc-500 font-medium text-sm">
                          {product.price === "Price on Request" ? product.price : `₹${product.price}`}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </motion.div>
          </div>

          {/* ================= RIGHT SIDE: BUILD SUMMARY ================= */}
          <div className="lg:col-span-1">
            <div className="bg-yellow-500 rounded-3xl p-6 sm:p-8 sticky top-28 flex flex-col h-[calc(100vh-140px)] min-h-[500px]">
              
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black text-black uppercase tracking-wider">
                  Build Summary
                </h2>
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {selectedItems.length}
                </div>
              </div>

              {/* Selected Items List */}
              <div className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-hide">
                <AnimatePresence>
                  {selectedItems.length === 0 && (
                    <motion.p 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="text-black/60 font-medium text-sm italic"
                    >
                      Your build is empty. Select items from the left to start customizing.
                    </motion.p>
                  )}
                  {selectedItems.map((item) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex justify-between items-start gap-4"
                    >
                      <h4 className="text-black font-bold text-sm leading-tight flex-1">
                        {item.name}
                      </h4>
                      <span className="text-black font-black text-sm whitespace-nowrap">
                        {item.price === "Price on Request" ? "TBD" : `₹${item.price}`}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Totals & Checkout Button */}
              <div className="pt-6 border-t border-black/10 mt-auto">
                <p className="text-black/60 text-xs font-bold uppercase tracking-widest mb-1">
                  Estimated Total
                </p>
                <h1 className="text-4xl font-black text-black">
                  ₹ {estimatedTotal.toLocaleString("en-IN")}
                </h1>
                
                <button 
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-black hover:bg-zinc-900 text-white font-bold py-4 rounded-xl transition-all uppercase tracking-wider text-sm mt-6 shadow-xl hover:shadow-2xl"
                >
                  Request This Build
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}