import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image"; 
import { MapPin, Phone } from "lucide-react"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Express Carzone | Premium Car Accessories | Chennai",
  description: "Everything for your car at one place in the heart of Mount Road.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {/* Navigation Bar - Changed to pure black/zinc */}
        <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              
              {/* BRANDING: IMAGE + TEXT */}
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="flex items-center gap-3 group hover:scale-105 transition-transform duration-300">
                  <Image 
                    src="/logo.png" 
                    alt="Express Carzone Logo" 
                    width={60} 
                    height={60} 
                    className="object-contain h-12 w-auto rounded-md"
                    priority
                  />
                  <div className="flex flex-col">
                    <span className="text-yellow-400 font-black text-2xl tracking-wider uppercase group-hover:text-white transition-colors">EXPRESS CARZONE</span>
                    <span className="text-xs text-zinc-300 font-semibold tracking-widest uppercase hidden sm:block">A UNIT OF M3 CAR ACCESSORIES</span>
                  </div>
                </Link>
              </div>

              {/* NAV LINKS */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-6">
                  <Link href="/contact" className="bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 shadow-[0_0_15px_rgba(250,204,21,0.2)]">Contact Us</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Page Content */}
        <main className="min-h-screen pt-20">
          {children}
        </main>

        {/* Footer - Changed to pure black/zinc */}
        <footer className="bg-black border-t border-zinc-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <Link href="/" className="text-yellow-400 font-black text-xl tracking-wider block uppercase">EXPRESS CARZONE</Link>
              <p className="text-zinc-400 text-sm mt-2 flex items-center gap-2">
                <MapPin size={16} className="text-yellow-400"/> No. 132, GP Road, Mount Road, Ch-02
              </p>
            </div>
            <div className="text-right flex flex-col items-center md:items-end gap-2">
              <p className="text-zinc-400 text-sm flex items-center gap-2 justify-end">
                <Phone size={16} className="text-yellow-400"/> 99 521 366 75
              </p>
              <p className="text-zinc-400 text-sm flex items-center gap-2 justify-end">
                <Phone size={16} className="text-yellow-400"/> 99 520 166 75
              </p>
              <p className="text-zinc-500 text-xs mt-3">&copy; {new Date().getFullYear()} Express Carzone. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}