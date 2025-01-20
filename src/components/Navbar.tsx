"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { ChevronRight, Menu } from "lucide-react";
import Link from "next/link";
import ProfileVerifier from "./ProfileVerifier";

const Navbar = () => {
  return (
    <>
      <nav className="w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center space-x-8">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent"
              >
                Mazdory
              </motion.h1>
              <div className="hidden xl:flex space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-orange-600 text-sm font-medium transition-colors relative group"
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
                  >
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetTitle className="text-lg font-semibold mb-4">
                    Mazdory
                  </SheetTitle>
                  <nav className="flex flex-col h-full">
                    <div className="flex-1 py-8">
                      {navItems.map((item) => (
                        <a
                          key={item}
                          href={`#${item.toLowerCase()}`}
                          className="flex items-center py-4 text-lg font-medium text-gray-600 hover:text-orange-600 transition-colors"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 py-6 space-y-4">
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
