"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import ProfileVerifier from "./ProfileVerifier";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <nav className="w-full bg-[#1E1E1E]/80 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center space-x-8">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent"
              >
                <Link href="/">Mazdory</Link>
              </motion.h1>
              <div className="hidden xl:flex space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-orange-400 text-sm font-medium transition-colors relative group"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </a>
                ))}
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <ProfileVerifier device="desktop" />
            </div>

            {/* Mobile Menu */}
            <div className="xl:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Open navigation menu"
                    aria-describedby="mobile-menu"
                    className="text-gray-300 hover:bg-gray-800 hover:text-orange-400"
                  >
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[300px] sm:w-[400px] bg-[#121212] text-gray-100 border-l border-gray-800"
                >
                  <SheetTitle className="text-lg font-semibold mb-4 text-white">
                    Mazdory
                  </SheetTitle>
                  <nav className="flex flex-col h-full">
                    <div className="flex-1 py-8">
                      {navItems.map((item) => (
                        <a
                          key={item}
                          href={`#${item.toLowerCase()}`}
                          className="flex items-center py-4 text-lg font-medium text-gray-300 hover:text-orange-400 transition-colors"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                    <div className="border-t border-gray-800 py-6 space-y-3 mb-3 flex flex-col">
                      <ProfileVerifier device="mobile" />
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

const navItems = [
  "Solutions",
  "Features",
  "Testimonials",
  "Pricing",
  "Contact",
];

export default Navbar;
