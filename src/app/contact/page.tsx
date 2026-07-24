"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Send, Navigation } from "lucide-react"; // Added Navigation icon

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-900 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-wider mb-4">
            Get in <span className="text-yellow-400">Touch</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Ready to upgrade your ride? Visit our shop on GP Road or call us directly to book an appointment or check product availability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            {/* The "Click to Call" Buttons */}
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Phone className="text-yellow-400" />
                Direct Lines
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="tel:+919952136675" 
                  className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-4 px-6 rounded-xl text-center transition-all hover:-translate-y-1 shadow-[0_0_15px_rgba(250,204,21,0.2)]"
                >
                  Call 99521 36675
                </a>
                <a 
                  href="tel:+919952036675" 
                  className="flex-1 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white font-bold py-4 px-6 rounded-xl text-center transition-all hover:-translate-y-1"
                >
                  Call 99520 36675
                </a>
              </div>
            </div>

            {/* Address & Hours */}
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl space-y-8">
              
              {/* Location Block with Google Maps Button */}
              <div className="flex items-start gap-4">
                <div className="bg-slate-900 p-3 rounded-lg text-yellow-400 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Our Location</h4>
                  <p className="text-slate-400 mb-4">Express Carzone<br/>No. 132, GP Road, Mount Road<br/>Chennai - 600002</p>
                  
                  {/* Google Maps Button */}
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Express+Carzone+132+GP+Road+Mount+Road+Chennai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white font-bold py-2.5 px-5 rounded-lg text-sm transition-colors"
                  >
                    <Navigation size={16} className="text-yellow-400" />
                    Locate Us on Maps
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-slate-900 p-3 rounded-lg text-yellow-400 shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Business Hours</h4>
                  <p className="text-slate-400">Monday - Saturday: 10:00 AM - 9:00 PM<br/>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-slate-800 border border-slate-700 p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Your Name</label>
                <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors" placeholder="John Doe" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Phone Number</label>
                  <input type="tel" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Car Make & Model</label>
                  <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors" placeholder="e.g., Hyundai Creta" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">What are you looking for?</label>
                <textarea rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors resize-none" placeholder="Tell us about the upgrades you want..."></textarea>
              </div>
              <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors mt-6">
                <Send size={20} />
                Send Inquiry
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}