"use client";

import { useState, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  desc: string;
}

const initialCategories = ["Exterior", "Interior", "Performance", "Lighting", "Audio", "Multimedia"];

const initialProducts: Product[] = [
  { id: "1", name: "Ceramic Coating (9H)", price: 18500, category: "Exterior", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80", desc: "Ultimate paint protection with deep gloss finish." },
  { id: "2", name: "PPF (Paint Protection Film)", price: 65000, category: "Exterior", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80", desc: "Self-healing TPU film protecting against stone chips." },
  { id: "3", name: "Nappa Leather Seat Covers", price: 14000, category: "Interior", image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80", desc: "Custom-fitted luxury upholstery with memory foam." },
  { id: "4", name: "Sony Multimedia System", price: 22000, category: "Multimedia", image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=600&q=80", desc: "Wireless Apple CarPlay and Android Auto display." },
];

export default function EstimatorPage() {
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  
  // Form fields
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(initialCategories[0]);
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");

  // New category field
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    const savedCats = localStorage.getItem("express_categories");
    const savedProds = localStorage.getItem("express_products");
    if (savedCats) setCategories(JSON.parse(savedCats));
    if (savedProds) setProducts(JSON.parse(savedProds));
  }, []);

  const saveToStorage = (cats: Product["category"][], prods: Product[]) => {
    setCategories(cats);
    setProducts(prods);
    localStorage.setItem("express_categories", JSON.stringify(cats));
    localStorage.setItem("express_products", JSON.stringify(prods));
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      price: parseFloat(price),
      category,
      image: image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
      desc: desc || "Custom accessory.",
    };
    const updated = [newProduct, ...products];
    saveToStorage(categories, updated);
    setName("");
    setPrice("");
    setDesc("");
    setImage("");
    alert("Product added successfully!");
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCategoryName.trim();
    if (!trimmed || categories.includes(trimmed)) {
      alert("Invalid category name or category already exists!");
      return;
    }
    const updatedCats = [...categories, trimmed];
    saveToStorage(updatedCats, products);
    setNewCategoryName("");
    alert(`Category "${trimmed}" added successfully!`);
  };

  const handleDeleteCategory = (catToDelete: string) => {
    if (confirm(`Delete category "${catToDelete}"? Products under it will move to Exterior.`)) {
      const updatedCats = categories.filter((c) => c !== catToDelete);
      const updatedProds = products.map((p) => p.category === catToDelete ? { ...p, category: "Exterior" } : p);
      saveToStorage(updatedCats, updatedProds);
    }
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    saveToStorage(categories, updated);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 pb-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-black text-amber-400 mb-6">INVENTORY & CATEGORY MANAGER</h1>

        {/* Add Category Section */}
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl mb-8">
          <h2 className="text-sm font-bold text-amber-400 mb-4">📂 Manage Categories</h2>
          <form onSubmit={handleAddCategory} className="flex gap-4 mb-4">
            <input 
              type="text" 
              placeholder="New Category Name (e.g. Detailing, Wraps)" 
              value={newCategoryName} 
              onChange={(e) => setNewCategoryName(e.target.value)} 
              className="flex-1 bg-neutral-950 border border-neutral-700 p-3 rounded-xl text-sm text-white"
              required
            />
            <button type="submit" className="bg-amber-400 text-black font-bold px-6 py-3 rounded-xl hover:bg-amber-300 transition text-sm">
              Add Category
            </button>
          </form>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <div key={cat} className="bg-neutral-950 border border-neutral-800 px-3 py-1.5 rounded-lg flex items-center gap-3 text-xs">
                <span className="font-semibold">{cat}</span>
                {categories.length > 1 && (
                  <button onClick={() => handleDeleteCategory(cat)} className="text-red-400 hover:text-red-300 font-bold">×</button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Add Product Section */}
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl mb-8">
          <h2 className="text-sm font-bold text-amber-400 mb-4">➕ Add Product</h2>
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required className="bg-neutral-950 border border-neutral-700 p-3 rounded-xl text-sm text-white" />
            <input type="number" placeholder="Price (₹)" value={price} onChange={(e) => setPrice(e.target.value)} required className="bg-neutral-950 border border-neutral-700 p-3 rounded-xl text-sm text-white" />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-neutral-950 border border-neutral-700 p-3 rounded-xl text-sm text-white">
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} className="bg-neutral-950 border border-neutral-700 p-3 rounded-xl text-sm text-white" />
            <textarea placeholder="Description..." value={desc} onChange={(e) => setDesc(e.target.value)} className="md:col-span-2 bg-neutral-950 border border-neutral-700 p-3 rounded-xl text-sm text-white h-24" />
            <button type="submit" className="md:col-span-2 bg-amber-400 text-black font-bold py-3 rounded-xl hover:bg-amber-300 transition text-sm">
              + Add Product to Website
            </button>
          </form>
        </div>

        {/* Product List */}
        <h2 className="text-sm font-bold text-neutral-400 mb-4">Existing Products ({products.length})</h2>
        <div className="space-y-3">
          {products.map((p) => (
            <div key={p.id} className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex justify-between items-center">
              <div>
                <span className="text-[10px] bg-amber-400/20 text-amber-400 px-2 py-0.5 rounded font-bold uppercase">{p.category}</span>
                <h3 className="font-bold text-sm mt-1">{p.name}</h3>
                <p className="text-xs text-amber-400 font-semibold">₹{p.price.toLocaleString("en-IN")}</p>
              </div>
              <button onClick={() => handleDeleteProduct(p.id)} className="bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-500 hover:text-white transition">
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}