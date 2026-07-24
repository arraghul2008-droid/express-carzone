"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  desc: string;
}

interface CartItem extends Product {
  quantity: number;
}

const initialCategories = ["Exterior", "Interior", "Performance", "Lighting", "Audio"];

const initialProducts: Product[] = [
  { id: "1", name: "Ceramic Coating (9H)", price: 18500, category: "Exterior", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80", desc: "Ultimate paint protection with deep gloss finish." },
  { id: "2", name: "PPF (Paint Protection Film)", price: 65000, category: "Exterior", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80", desc: "Self-healing TPU film protecting against stone chips." },
  { id: "3", name: "Nappa Leather Seat Covers", price: 14000, category: "Interior", image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80", desc: "Custom-fitted luxury upholstery with memory foam." },
  { id: "4", name: "Ambient Lighting Kit (64-Color)", price: 6500, category: "Lighting", image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80", desc: "App-controlled dashboard and door trim lighting." },
  { id: "5", name: "Stage 1 ECU Remap", price: 25000, category: "Performance", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80", desc: "Optimized ignition timing and boost for extra horsepower." },
  { id: "6", name: "Android Touchscreen Infotainment", price: 22000, category: "Interior", image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=600&q=80", desc: "Wireless Apple CarPlay and Android Auto display." },
];

export default function EstimatorPage() {
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Owner state
  const [isOwner, setIsOwner] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [activeOwnerTab, setActiveOwnerTab] = useState<"products" | "categories">("products");

  // New product form
  const [newProdName, setNewProdName] = useState("");
  const [newProdPrice, setNewProdPrice] = useState("");
  const [newProdCat, setNewProdCat] = useState(initialCategories[0]);
  const [newProdDesc, setNewProdDesc] = useState("");
  const [newProdImage, setNewProdImage] = useState("");

  // New category form
  const [newCatName, setNewCatName] = useState("");

  useEffect(() => {
    const savedCats = localStorage.getItem("express_categories");
    const savedProds = localStorage.getItem("express_products");
    if (savedCats) setCategories(JSON.parse(savedCats));
    if (savedProds) setProducts(JSON.parse(savedProds));
  }, []);

  const saveToStorage = (updatedCats: string[], updatedProds: Product[]) => {
    setCategories(updatedCats);
    setProducts(updatedProds);
    localStorage.setItem("express_categories", JSON.stringify(updatedCats));
    localStorage.setItem("express_products", JSON.stringify(updatedProds));
  };

  const handleOwnerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "MountRoad99!") {
      setIsOwner(true);
    } else {
      alert("Incorrect passcode! Hint: MountRoad99!");
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;

    const newProduct: Product = {
      id: Date.now().toString(),
      name: newProdName,
      price: parseFloat(newProdPrice),
      category: newProdCat,
      image: newProdImage || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
      desc: newProdDesc || "Custom installed accessory.",
    };

    const updated = [newProduct, ...products];
    saveToStorage(categories, updated);
    setNewProdName("");
    setNewProdPrice("");
    setNewProdDesc("");
    setNewProdImage("");
    alert("Product added successfully!");
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    saveToStorage(categories, updated);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCatName.trim();
    if (!trimmed || categories.includes(trimmed)) {
      alert("Invalid category name or category already exists!");
      return;
    }
    const updatedCats = [...categories, trimmed];
    saveToStorage(updatedCats, products);
    setNewCatName("");
    alert(`Category "${trimmed}" added successfully!`);
  };

  const handleDeleteCategory = (catToDelete: string) => {
    if (confirm(`Are you sure you want to delete category "${catToDelete}"? Products under it will be moved to "Exterior".`)) {
      const updatedCats = categories.filter((c) => c !== catToDelete);
      const updatedProds = products.map((p) => p.category === catToDelete ? { ...p, category: "Exterior" } : p);
      saveToStorage(updatedCats, updatedProds);
      if (selectedCategory === catToDelete) setSelectedCategory("All");
    }
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) => prev.map((item) => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const checkoutWhatsApp = () => {
    const itemSummary = cart.map((i) => `• ${i.name} (x${i.quantity}) - ₹${i.price * i.quantity}`).join("\n");
    const message = `Hello Express Carzone! I built a custom package for my car:\n\n${itemSummary}\n\n*Estimated Total: ₹${totalPrice}*\n\nPlease confirm availability and installation time at Mount Road.`;
    const url = `https://wa.me/919840012345?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const filteredProducts = selectedCategory === "All" ? products : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-neutral-950 text-white pb-24">
      {/* Header */}
      <header className="bg-neutral-900 border-b border-neutral-800 sticky top-0 z-40 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black tracking-wider text-amber-400">EXPRESS CARZONE</h1>
          <p className="text-xs text-neutral-400">Interactive Build Estimator & Catalog</p>
        </div>
        {!isOwner ? (
          <form onSubmit={handleOwnerLogin} className="flex gap-2">
            <input 
              type="password" 
              placeholder="Owner Passcode" 
              value={passcode} 
              onChange={(e) => setPasscode(e.target.value)}
              className="bg-neutral-800 border border-neutral-700 text-xs px-3 py-1.5 rounded-lg text-white focus:outline-none focus:border-amber-400"
            />
            <button type="submit" className="bg-amber-400 text-black text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-amber-300 transition">
              Owner Login
            </button>
          </form>
        ) : (
          <button onClick={() => setIsOwner(false)} className="bg-red-600/20 text-red-400 border border-red-600/40 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-red-600 hover:text-white transition">
            Exit Owner Mode
          </button>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Owner Management Section */}
        {isOwner && (
          <div className="mb-12 bg-neutral-900 border border-amber-400/40 rounded-2xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                ⚙️ Owner Control Panel
              </h2>
              <div className="flex gap-2 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
                <button 
                  onClick={() => setActiveOwnerTab("products")}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition ${activeOwnerTab === "products" ? "bg-amber-400 text-black" : "text-neutral-400 hover:text-white"}`}
                >
                  Manage Products
                </button>
                <button 
                  onClick={() => setActiveOwnerTab("categories")}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition ${activeOwnerTab === "categories" ? "bg-amber-400 text-black" : "text-neutral-400 hover:text-white"}`}
                >
                  Manage Categories
                </button>
              </div>
            </div>

            {/* Tab 1: Products */}
            {activeOwnerTab === "products" && (
              <div>
                <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-neutral-950 p-6 rounded-xl border border-neutral-800">
                  <h3 className="col-span-full text-sm font-semibold text-amber-400">Add New Accessory</h3>
                  <input type="text" placeholder="Product Name" value={newProdName} onChange={(e) => setNewProdName(e.target.value)} required className="bg-neutral-900 border border-neutral-700 p-2.5 rounded-lg text-sm text-white" />
                  <input type="number" placeholder="Price (₹)" value={newProdPrice} onChange={(e) => setNewProdPrice(e.target.value)} required className="bg-neutral-900 border border-neutral-700 p-2.5 rounded-lg text-sm text-white" />
                  <select value={newProdCat} onChange={(e) => setNewProdCat(e.target.value)} className="bg-neutral-900 border border-neutral-700 p-2.5 rounded-lg text-sm text-white">
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input type="text" placeholder="Image URL (Unsplash link)" value={newProdImage} onChange={(e) => setNewProdImage(e.target.value)} className="bg-neutral-900 border border-neutral-700 p-2.5 rounded-lg text-sm text-white" />
                  <input type="text" placeholder="Short Description" value={newProdDesc} onChange={(e) => setNewProdDesc(e.target.value)} className="bg-neutral-900 border border-neutral-700 p-2.5 rounded-lg text-sm text-white col-span-2" />
                  <button type="submit" className="col-span-full bg-amber-400 text-black font-bold py-2.5 rounded-lg hover:bg-amber-300 transition">Publish Product</button>
                </form>

                <h3 className="text-sm font-semibold text-neutral-400 mb-4">Existing Products ({products.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {products.map((p) => (
                    <div key={p.id} className="bg-neutral-950 border border-neutral-800 p-4 rounded-xl flex justify-between items-center">
                      <div>
                        <span className="text-[10px] bg-amber-400/20 text-amber-400 px-2 py-0.5 rounded uppercase font-bold">{p.category}</span>
                        <h4 className="font-bold text-sm mt-1">{p.name}</h4>
                        <p className="text-xs text-amber-400 font-semibold">₹{p.price.toLocaleString("en-IN")}</p>
                      </div>
                      <button onClick={() => handleDeleteProduct(p.id)} className="bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white p-2 rounded-lg text-xs transition">Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Categories */}
            {activeOwnerTab === "categories" && (
              <div>
                <form onSubmit={handleAddCategory} className="flex gap-4 mb-8 bg-neutral-950 p-6 rounded-xl border border-neutral-800 items-end">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-neutral-400 mb-2">New Category Name</label>
                    <input type="text" placeholder="e.g. PPF & Wraps, Detailing, Wheels" value={newCatName} onChange={(e) => setNewCatName(e.target.value)} required className="w-full bg-neutral-900 border border-neutral-700 p-2.5 rounded-lg text-sm text-white" />
                  </div>
                  <button type="submit" className="bg-amber-400 text-black font-bold px-6 py-2.5 rounded-lg hover:bg-amber-300 transition">Add Category</button>
                </form>

                <h3 className="text-sm font-semibold text-neutral-400 mb-4">Current Categories ({categories.length})</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {categories.map((cat) => (
                    <div key={cat} className="bg-neutral-950 border border-neutral-800 p-4 rounded-xl flex justify-between items-center">
                      <span className="font-bold text-sm">{cat}</span>
                      {categories.length > 1 && (
                        <button onClick={() => handleDeleteCategory(cat)} className="text-red-400 hover:text-red-300 text-xs font-semibold">Delete</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Category Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <button 
            onClick={() => setSelectedCategory("All")}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition ${selectedCategory === "All" ? "bg-amber-400 text-black shadow-lg shadow-amber-400/20" : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white"}`}
          >
            All Accessories
          </button>
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition ${selectedCategory === cat ? "bg-amber-400 text-black shadow-lg shadow-amber-400/20" : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-amber-400/50 transition duration-300">
              <div>
                <div className="relative h-48 w-full bg-neutral-800">
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                  <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <p className="text-xs text-neutral-400 mb-4 line-clamp-2">{product.desc}</p>
                  <p className="text-amber-400 font-black text-lg">₹{product.price.toLocaleString("en-IN")}</p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-neutral-800 hover:bg-amber-400 hover:text-black font-bold py-3 rounded-xl transition text-sm flex items-center justify-center gap-2"
                >
                  <span>+ Add to Build</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Floating Build Summary Bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-neutral-900/95 backdrop-blur-lg border-t border-neutral-800 p-4 shadow-2xl z-50">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 overflow-x-auto w-full sm:w-auto">
              <div className="bg-amber-400 text-black px-3 py-1.5 rounded-lg font-black text-sm">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} Items
              </div>
              <div className="flex gap-2">
                {cart.map((item) => (
                  <div key={item.id} className="bg-neutral-800 px-3 py-1 rounded-lg text-xs flex items-center gap-2">
                    <span>{item.name} (x{item.quantity})</span>
                    <div className="flex gap-1">
                      <button onClick={() => updateQuantity(item.id, -1)} className="text-neutral-400 hover:text-white font-bold px-1">-</button>
                      <button onClick={() => updateQuantity(item.id, 1)} className="text-neutral-400 hover:text-white font-bold px-1">+</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div>
                <p className="text-[10px] text-neutral-400 uppercase tracking-wider">Estimated Total</p>
                <p className="text-amber-400 font-black text-lg">₹{totalPrice.toLocaleString("en-IN")}</p>
              </div>
              <button 
                onClick={checkoutWhatsApp}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-xl transition flex items-center gap-2 text-sm shadow-lg shadow-emerald-500/20"
              >
                <span>Request on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}