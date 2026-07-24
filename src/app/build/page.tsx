"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PackageSearch, Wrench, ChevronLeft, MonitorPlay, Speaker, Lightbulb, 
  IndianRupee, Image as ImageIcon, X, Trash2, Edit3, PlusCircle, Unlock, 
  UserCircle, LogOut, ArrowRight
} from "lucide-react";

interface Product {
  id: string;
  category: "multimedia" | "speaker" | "led";
  name: string;
  price: string;
  description: string;
  image: string;
}

const categoryConfig = {
  multimedia: { title: "Multimedia", icon: MonitorPlay },
  speaker: { title: "Speakers", icon: Speaker },
  led: { title: "LED Lights", icon: Lightbulb },
};

const ADMIN_EMAIL = "admin@expresscarzone.com";
const ADMIN_PASSWORD = "8015495535"; 

export default function BuildPage() {
  const router = useRouter();
  
  const [currentView, setCurrentView] = useState<"menu" | "catalog" | "admin">("menu"); 
  const [activeCategory, setActiveCategory] = useState<"multimedia" | "speaker" | "led">("multimedia");
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [userRole, setUserRole] = useState<"guest" | "customer" | "admin">("guest");
  const [userDisplay, setUserDisplay] = useState(""); 
  const [authError, setAuthError] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [products, setProducts] = useState<Product[]>([
    { 
      id: "1", category: "multimedia", name: "Monoblanch Android System 9” TS7 4+64 Basic", price: "7,500.00",
      description: "A reliable entry-level 9-inch Android multimedia system. Features a TS7 processor, 4GB RAM, and 64GB storage.",
      image: "https://placehold.co/600x400/18181b/eab308?text=Monoblanch+9-Inch"
    },
    { 
      id: "2", category: "multimedia", name: "Alpha Android System 9” A100 4+64G CP", price: "9,500.00",
      description: "Upgrade your dashboard with the Alpha A100 series. Includes built-in CarPlay support and a 9-inch IPS display.",
      image: "https://placehold.co/600x400/18181b/eab308?text=Alpha+A100"
    },
    { 
      id: "3", category: "multimedia", name: "NFS Elite Series Infotainment System 9” 2+64G CP", price: "12,500.00",
      description: "Premium build quality with the NFS Elite Series. Features ultra-responsive touch, wireless CarPlay, and custom UI themes.",
      image: "https://placehold.co/600x400/18181b/eab308?text=NFS+Elite+Series"
    },
    { 
      id: "4", category: "multimedia", name: "Nakamichi NAM5240 Multimedia Receiver 2+64G CP", price: "15,000.00",
      description: "High-fidelity audio processing from Nakamichi with advanced EQ settings paired with a snappy 9-inch smart interface.",
      image: "https://placehold.co/600x400/18181b/eab308?text=Nakamichi+NAM5240"
    },
    { 
      id: "5", category: "multimedia", name: "Unplug Pro Version Multi Media Player T400 Pro 4+64 CP", price: "18,500.00",
      description: "The ultimate flagship infotainment experience. T400 Pro chipset, 4GB RAM, and QLED display.",
      image: "https://placehold.co/600x400/18181b/eab308?text=Unplug+Pro+T400"
    },
    { 
      id: "6", category: "speaker", name: "Zella Electra Car Speaker 6” 600W", price: "1,800.00",
      description: "An affordable yet powerful audio upgrade pushing 600W peak power for punchy mid-bass and clear vocals.",
      image: "https://placehold.co/600x400/18181b/eab308?text=Zella+Electra+600W"
    },
    { 
      id: "7", category: "speaker", name: "Pioneer Car Component Speaker 6.5” 390W (TS-C6021N)", price: "Price on Request",
      description: "Legendary Pioneer component acoustics with separate tweeters and woofers for an immersive soundstage.",
      image: "https://placehold.co/600x400/18181b/eab308?text=Pioneer+Component"
    },
    { 
      id: "8", category: "speaker", name: "Pioneer Car Coaxial Speaker 6.5” 300W (TS-G1620S-2)", price: "Price on Request",
      description: "Excellent drop-in replacement for factory speakers offering crisp highs and solid lows.",
      image: "https://placehold.co/600x400/18181b/eab308?text=Pioneer+Coaxial"
    },
    { 
      id: "9", category: "speaker", name: "Aura Storm Component Speaker 6.5” 260W (6.2CSX)", price: "5,900.00",
      description: "Aura's premium components deliver audiophile-grade clarity and rich, distortion-free volume.",
      image: "https://placehold.co/600x400/18181b/eab308?text=Aura+Storm+6.5"
    },
    { 
      id: "10", category: "speaker", name: "Blaupunkt Component Speaker 6.5” 390W (tx 65c)", price: "5,800.00",
      description: "German engineering offering tight, aggressive bass and crystal-clear high frequencies.",
      image: "https://placehold.co/600x400/18181b/eab308?text=Blaupunkt+TX65C"
    },
    { 
      id: "11", category: "led", name: "Ultra Audio 180W Tri Colour LED", price: "4,500.00",
      description: "Switch between white, warm white, and yellow beams instantly for optimal visibility in any weather.",
      image: "https://placehold.co/600x400/18181b/eab308?text=Ultra+180W+Tri-Colour"
    },
    { 
      id: "12", category: "led", name: "Ultra Audio 220W Diamond LED", price: "6,500.00",
      description: "Intense 220W brightness with a flawless diamond-cut beam pattern to prevent blinding oncoming traffic.",
      image: "https://placehold.co/600x400/18181b/eab308?text=Ultra+220W+Diamond"
    },
    { 
      id: "13", category: "led", name: "Battle Beast 250W LED", price: "6,900.00",
      description: "Turn night into day with insane illumination for highway cruising and off-road adventures.",
      image: "https://placehold.co/600x400/18181b/eab308?text=Battle+Beast+250W"
    },
    { 
      id: "14", category: "led", name: "Auto Yu 180W LED", price: "4,700.00",
      description: "A highly durable, focused 180W upgrade featuring active cooling for peak brightness longevity.",
      image: "https://placehold.co/600x400/18181b/eab308?text=Auto+Yu+180W"
    },
    { 
      id: "15", category: "led", name: "Vision I 320W LED", price: "7,900.00",
      description: "The absolute pinnacle of automotive lighting cutting through darkness with an ultra-wide beam.",
      image: "https://placehold.co/600x400/18181b/eab308?text=Vision+I+320W"
    }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "", category: "multimedia" as "multimedia" | "speaker" | "led", price: "", description: "", image: ""
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail.toLowerCase() === ADMIN_EMAIL && loginPassword === ADMIN_PASSWORD) {
      setUserRole("admin");
      setUserDisplay("Admin Portal");
      setAuthError(false);
      setLoginEmail("");
      setLoginPassword("");
      setShowLoginModal(false);
    } else {
      setUserRole("customer");
      setUserDisplay(loginEmail.split("@")[0]);
      setAuthError(false);
      setLoginEmail("");
      setLoginPassword("");
      setShowLoginModal(false);
    }
  };

  const handleLogout = () => {
    setUserRole("guest");
    setUserDisplay("");
    setCurrentView("menu"); 
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const savedProduct: Product = {
      id: editingId || Date.now().toString(),
      name: newProduct.name,
      category: newProduct.category,
      price: newProduct.price,
      description: newProduct.description || "No description provided.",
      image: newProduct.image || `https://placehold.co/600x400/18181b/eab308?text=${encodeURIComponent(newProduct.name)}`
    };

    if (editingId) {
      setProducts(products.map(p => p.id === editingId ? savedProduct : p));
      setEditingId(null);
    } else {
      setProducts([savedProduct, ...products]);
    }
    
    setNewProduct({ name: "", category: "multimedia", price: "", description: "", image: "" });
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 relative overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* LOGIN MODAL */}
        <AnimatePresence>
          {showLoginModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-sm sm:max-w-md p-6 sm:p-8 shadow-2xl relative"
              >
                <button 
                  onClick={() => setShowLoginModal(false)}
                  className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
                
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-yellow-500/15 rounded-full flex items-center justify-center">
                    <UserCircle className="text-yellow-400" size={28} />
                  </div>
                </div>
                
                <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-1">Sign In</h2>
                <p className="text-zinc-500 text-xs text-center mb-6">Log in to track builds or access the owner portal.</p>
                
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <input 
                      type="email"
                      required
                      placeholder="Email Address"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:border-yellow-500 outline-none"
                    />
                  </div>
                  <div>
                    <input 
                      type="password"
                      required
                      placeholder="Password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:border-yellow-500 outline-none"
                    />
                  </div>
                  
                  {authError && <p className="text-red-500 text-xs text-center font-bold">Invalid credentials.</p>}
                  
                  <button 
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3.5 rounded-xl transition-colors uppercase tracking-wider text-sm flex justify-center items-center gap-2 mt-2"
                  >
                    Continue <ArrowRight size={16} />
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-zinc-900 pb-4">
          <div className="text-[10px] sm:text-xs font-bold text-zinc-500 uppercase tracking-widest">
            Express Carzone Studio
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {userRole === "admin" && (
              <button
                onClick={() => setCurrentView(currentView === "admin" ? "menu" : "admin")}
                className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-zinc-900 hover:bg-yellow-500 hover:text-black text-yellow-400 font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all border border-zinc-800"
              >
                {currentView === "admin" ? <UserCircle size={14} /> : <Unlock size={14} />}
                {currentView === "admin" ? "Customer View" : "Manage Catalog"}
              </button>
            )}

            {userRole === "guest" ? (
              <button 
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm font-bold ml-auto sm:ml-0"
              >
                <UserCircle size={18} /> Sign In
              </button>
            ) : (
              <div className="flex items-center gap-3 ml-auto sm:ml-0">
                <span className="text-white font-medium text-xs sm:text-sm">
                  Hi, {userDisplay}
                </span>
                <button 
                  onClick={handleLogout}
                  className="text-zinc-500 hover:text-red-400 transition-colors"
                  title="Sign Out"
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* PRODUCT DETAILS MODAL */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()} 
                className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
              >
                <div className="relative h-48 sm:h-60 bg-zinc-900 border-b border-zinc-800 flex items-center justify-center overflow-hidden shrink-0">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setSelectedProduct(null)} 
                    className="absolute top-4 right-4 p-2 bg-black/70 hover:bg-yellow-500 hover:text-black rounded-full text-white transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                <div className="p-5 sm:p-6 overflow-y-auto">
                  <h2 className="text-xl sm:text-2xl font-black text-yellow-400 mb-1 leading-tight">{selectedProduct.name}</h2>
                  <p className="text-white font-black text-lg sm:text-xl mb-4 flex items-center">
                    <IndianRupee size={18} className="mr-1 text-yellow-400" />
                    {selectedProduct.price}
                  </p>
                  
                  <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl mb-6">
                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Description</h4>
                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">{selectedProduct.description}</p>
                  </div>

                  <button 
                    onClick={() => setSelectedProduct(null)} 
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl transition-colors uppercase tracking-wider text-xs"
                  >
                    Close Details
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          
          {/* MENU VIEW */}
          {currentView === "menu" && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="max-w-4xl mx-auto space-y-8 sm:space-y-12 py-4"
            >
              <div>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-wider mb-2 text-center">
                  Configure Your <span className="text-yellow-400">Upgrade</span>
                </h1>
                <p className="text-zinc-400 text-xs sm:text-sm text-center mb-8 sm:mb-12">Select an option below to start customizing your car.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <button onClick={() => setCurrentView("catalog")} className="bg-zinc-950 border border-zinc-800 hover:border-yellow-500 p-6 sm:p-8 rounded-2xl text-left transition-all group">
                    <div className="bg-black w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-yellow-500 transition-colors">
                      <PackageSearch size={28} className="text-yellow-400 group-hover:text-black transition-colors" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">Check out our Products</h2>
                    <p className="text-zinc-400 text-xs sm:text-sm">Browse our premium selection of multimedia players, speakers, and high-performance LEDs.</p>
                  </button>

                  <button onClick={() => router.push("/estimator")} className="bg-zinc-950 border border-zinc-800 hover:border-yellow-500 p-6 sm:p-8 rounded-2xl text-left transition-all group">
                    <div className="bg-black w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-yellow-500 transition-colors">
                      <Wrench size={28} className="text-yellow-400 group-hover:text-black transition-colors" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">Virtual Car Estimator</h2>
                    <p className="text-zinc-400 text-xs sm:text-sm">Select your car model and add upgrades to get an instant build estimate.</p>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* CATALOG VIEW */}
          {currentView === "catalog" && (
            <motion.div
              key="catalog"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, y: 15 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <button onClick={() => setCurrentView("menu")} className="p-2 bg-zinc-900 rounded-full hover:bg-yellow-500 hover:text-black text-white transition-colors">
                  <ChevronLeft size={20} />
                </button>
                <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
                  Product <span className="text-yellow-400">Catalog</span>
                </h1>
              </div>

              {/* Mobile scrollable tabs */}
              <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
                {(Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>).map((key) => {
                  const category = categoryConfig[key];
                  const Icon = category.icon;
                  const isActive = activeCategory === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveCategory(key)}
                      className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all border ${
                        isActive ? "bg-yellow-500 text-black border-yellow-500 shadow-[0_0_15px_rgba(250,204,21,0.2)]" : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-700"
                      }`}
                    >
                      <Icon size={16} /> {category.title}
                    </button>
                  );
                })}
              </div>

              <motion.div key={activeCategory} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.filter(p => p.category === activeCategory).map((product) => (
                  <div key={product.id} onClick={() => setSelectedProduct(product)} className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl hover:border-yellow-500/80 transition-all cursor-pointer flex flex-col justify-between group shadow-lg min-h-[120px]">
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug mb-3 group-hover:text-yellow-400 transition-colors">{product.name}</h3>
                    <div className="flex items-center mt-auto pt-3 border-t border-zinc-900">
                      <span className="text-yellow-400 font-black text-base sm:text-lg flex items-center">
                        <IndianRupee size={16} className="mr-0.5" />
                        {product.price}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* ADMIN PORTAL VIEW */}
          {currentView === "admin" && userRole === "admin" && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={() => setCurrentView("menu")} className="p-2 bg-zinc-900 rounded-full hover:bg-yellow-500 hover:text-black text-white transition-colors">
                    <ChevronLeft size={20} />
                  </button>
                  <h1 className="text-xl sm:text-3xl font-black text-white uppercase tracking-wider">
                    Inventory <span className="text-yellow-400">Manager</span>
                  </h1>
                </div>
                
                <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-yellow-400 text-[10px] sm:text-xs font-bold uppercase">
                  <Unlock size={12} /> Unlocked
                </div>
              </div>

              {/* Add / Edit Form */}
              <form onSubmit={handleSaveProduct} className="bg-zinc-950 border border-zinc-800 p-5 sm:p-8 rounded-2xl space-y-5 shadow-xl">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                  <div className="flex items-center gap-2">
                    {editingId ? <Edit3 className="text-yellow-400" size={20} /> : <PlusCircle className="text-yellow-400" size={20} />}
                    <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                      {editingId ? "Edit Product" : "Add Product"}
                    </h3>
                  </div>
                  {editingId && (
                    <button 
                      type="button" 
                      onClick={() => { setEditingId(null); setNewProduct({ name: "", category: "multimedia", price: "", description: "", image: "" }); }}
                      className="text-xs text-zinc-500 hover:text-white uppercase font-bold"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1.5">Product Name</label>
                    <input type="text" required placeholder="e.g. Sony System" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white text-xs sm:text-sm focus:border-yellow-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1.5">Category</label>
                    <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as any })} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white text-xs sm:text-sm focus:border-yellow-500 outline-none">
                      <option value="multimedia">Multimedia</option>
                      <option value="speaker">Speakers</option>
                      <option value="led">LED Lights</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1.5">Price (₹)</label>
                    <input type="text" required placeholder="e.g. 14,500.00" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white text-xs sm:text-sm focus:border-yellow-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1.5">Product Photo</label>
                    <label className="flex items-center justify-center gap-2 bg-black border border-zinc-800 hover:border-yellow-500 text-zinc-300 px-4 py-3 rounded-xl text-xs font-bold cursor-pointer transition-colors">
                      <ImageIcon size={16} className="text-yellow-400" />
                      {newProduct.image ? "Photo Attached" : "Upload Image"}
                      <input type="file" accept="image/*" onChange={handleImageFileUpload} className="hidden" />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1.5">Description</label>
                  <textarea rows={3} placeholder="Overview of specifications..." value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white text-xs sm:text-sm focus:border-yellow-500 outline-none resize-none" />
                </div>

                <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-3.5 rounded-xl transition-all uppercase tracking-wider text-xs shadow-lg">
                  {editingId ? "Update Product" : "+ Add Product to Live Website"}
                </button>
              </form>

              {/* Inventory List */}
              <div className="bg-zinc-950 border border-zinc-800 p-5 sm:p-8 rounded-2xl space-y-4">
                <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                  Inventory ({products.length} Products)
                </h3>

                <div className="space-y-3">
                  {products.map((product) => (
                    <div key={product.id} className="bg-black border border-zinc-900 p-3.5 sm:p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover bg-zinc-900 border border-zinc-800 shrink-0" />
                        <div>
                          <h4 className="text-white font-bold text-xs sm:text-sm leading-tight">{product.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-yellow-400 font-bold text-xs">₹{product.price}</span>
                            <span className="text-zinc-600 text-[10px] uppercase font-medium">{product.category}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 self-end sm:self-auto border-t sm:border-t-0 border-zinc-900 pt-2 sm:pt-0">
                        <button 
                          onClick={() => {
                            setEditingId(product.id);
                            setNewProduct({
                              name: product.name,
                              category: product.category,
                              price: product.price,
                              description: product.description,
                              image: product.image
                            });
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }} 
                          className="flex items-center gap-1.5 px-3 py-1.5 text-zinc-400 hover:text-yellow-400 hover:bg-zinc-900 rounded-lg transition-colors text-xs font-bold"
                        >
                          <Edit3 size={14} /> Edit
                        </button>
                        
                        <button 
                          onClick={() => handleDeleteProduct(product.id)} 
                          className="flex items-center gap-1.5 px-3 py-1.5 text-zinc-400 hover:text-red-400 hover:bg-zinc-900 rounded-lg transition-colors text-xs font-bold"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}