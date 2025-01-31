"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Globe,
  Shield,
  Star,
  CheckCircle,
  Rocket,
  Users,
  Zap,
  Facebook,
  Calendar,
  ChevronRight,
  Instagram,
  Twitter,
} from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-gray-100 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 lg:pt-40 pb-20 bg-gradient-to-b from-[#1E1E1E] to-[#121212] overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block mb-6 px-4 py-2 bg-[#2C2C2C] text-orange-400 rounded-full text-sm font-medium transform hover:scale-105 transition-transform">
              Trusted by 50,000+ Innovative Companies
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Discover & Collaborate with
              <span className="block mt-2 bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                Elite Freelance Talent
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Revolutionize your projects with our AI-powered platform. Connect
              with top-tier professionals seamlessly and efficiently.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:opacity-90 shadow-lg shadow-orange-500/20 px-8 py-6 text-lg group">
                <span>Start Hiring</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="border-2 border-orange-500 text-orange-400 bg-[#1E1E1E] px-8 py-6 text-lg"
              >
                <Briefcase className="mr-2 w-5 h-5" />
                <span>Find Work</span>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              {trustIndicators.map((indicator, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <div className="text-orange-400 font-bold text-2xl mb-2">
                    {indicator.value}
                  </div>
                  <div className="text-gray-500 text-sm">{indicator.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#1E1E1E]" id="features">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-orange-500 font-medium mb-4 block">
              Platform Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Comprehensive Solution for Modern Work
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Streamline your workflow with advanced tools designed for
              efficiency and collaboration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#2C2C2C] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-[#121212]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Simple, Powerful Workflow
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Connect, collaborate, and succeed in just a few simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#1E1E1E] p-8 rounded-2xl text-center"
              >
                <div className="w-16 h-16 mx-auto bg-orange-600/20 text-orange-400 rounded-full flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {step.title}
                </h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#1E1E1E]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Success Stories
            </h2>
            <p className="text-gray-400">
              Real experiences from businesses transforming their workflow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#2C2C2C] p-8 rounded-2xl"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-orange-600/20 rounded-full flex items-center justify-center text-orange-400 font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-orange-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-400 leading-relaxed">
                  {testimonial.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-600 to-orange-500">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Transform Your Business Today
            </h2>
            <p className="text-xl mb-8 text-orange-100">
              Join thousands of forward-thinking businesses leveraging top
              global talent.
            </p>
            <Button className="bg-white text-orange-600 hover:bg-orange-50 shadow-lg px-8 py-6 text-lg">
              Get Started Now <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] text-gray-100 pt-20 pb-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                Mazdory
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Empowering the future of work through innovation and connection.
              </p>
              <div className="mt-6 flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            {footerLinks.map((column, idx) => (
              <div key={idx}>
                <h4 className="text-lg font-semibold mb-6">{column.title}</h4>
                <ul className="space-y-4">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-orange-400 text-sm transition-colors inline-flex items-center group"
                      >
                        {link}
                        <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 mt-16 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} Mazdory. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-orange-400"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-orange-400"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Component data
const workflowSteps = [
  {
    icon: <Users className="w-8 h-8" />,
    title: "Create Profile",
    description: "Set up your professional profile showcasing your skills.",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Find Opportunities",
    description:
      "Browse and apply to tailored projects matching your expertise.",
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Collaborate & Deliver",
    description: "Work seamlessly and deliver outstanding results.",
  },
];

const features = [
  {
    icon: <Shield className="w-6 h-6 text-white" />,
    title: "Secure Platform",
    description:
      "Bank-level security for all transactions and data protection for peace of mind.",
  },
  {
    icon: <Globe className="w-6 h-6 text-white" />,
    title: "Global Reach",
    description:
      "Access to a global network of contractors and talent from around the world.",
  },
  {
    icon: <Calendar className="w-6 h-6 text-white" />,
    title: "Efficient Scheduling",
    description:
      "Efficient scheduling and communication for contractors and clients.",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechCorp",
    text: "Mazdory has transformed how we hire contractors. The quality of talent and ease of use is unmatched.",
  },
  {
    name: "John Doe",
    role: "Founder, Acme Inc.",
    text: "Mazdory has revolutionized the way we find and hire talent. It has been a game-changer for our business.",
  },
  {
    name: "Jane Smith",
    role: "Marketing Manager, XYZ Corp.",
    text: "Mazdory has been a game-changer for our marketing efforts. They have made our job easier and more efficient.",
  },
];

const trustIndicators = [
  { value: "50K+", label: "Active Users" },
  { value: "98%", label: "Success Rate" },
  { value: "24/7", label: "Support" },
  { value: "150+", label: "Countries" },
];

const footerLinks = [
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Impact"],
  },
  {
    title: "Resources",
    links: ["Blog", "Help Center", "Privacy Policy", "Terms of Service"],
  },
  {
    title: "Contact",
    links: ["Contact", "Support", "Feedback"],
  },
];

const socialLinks = [
  {
    url: "#",
    icon: <Facebook className="w-6 h-6" />,
  },
  {
    url: "#",
    icon: <Twitter className="w-6 h-6" />,
  },
  {
    url: "#",
    icon: <Instagram className="w-6 h-6" />,
  },
];

export default HomePage;
