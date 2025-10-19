"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Shield,
  Zap,
  Users,
  Check,
  Menu,
  X,
  Cloud,
  FileText,
  Image,
  Folder,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function FileShareLanding() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Upload className="w-6 h-6" />,
      title: "Easy Upload",
      description:
        "Drag and drop your files or click to upload. Support for images, documents, and more.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Storage",
      description:
        "Your files are encrypted and stored securely. Control who has access to your content.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description:
        "Upload and access your files instantly with our optimized cloud infrastructure.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Easy Sharing",
      description:
        "Share files with anyone using secure links. Collaborate effortlessly with your team.",
    },
  ];

  const plans = [
    {
      name: "Free",
      price: "$0",
      storage: "5 GB",
      features: [
        "5 GB Storage",
        "Basic file sharing",
        "Mobile app access",
        "Email support",
      ],
    },
    {
      name: "Pro",
      price: "$9.99",
      storage: "100 GB",
      features: [
        "100 GB Storage",
        "Advanced sharing options",
        "Priority support",
        "Version history",
        "Custom branding",
      ],
      popular: true,
    },
    {
      name: "Business",
      price: "$29.99",
      storage: "1 TB",
      features: [
        "1 TB Storage",
        "Team collaboration",
        "Admin controls",
        "24/7 support",
        "Advanced security",
        "API access",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <Cloud className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CloudShare
              </span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Pricing
              </a>

              <Button
                variant="outline"
                className="mr-2"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </Button>
              <Button className="mr-2" onClick={() => router.push("/login")}>
                Log In
              </Button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-3">
              <a
                href="#features"
                className="block text-gray-700 hover:text-blue-600"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="block text-gray-700 hover:text-blue-600"
              >
                Pricing
              </a>
              <a
                href="#about"
                className="block text-gray-700 hover:text-blue-600"
              >
                About
              </a>
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Store & Share Your Files{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Anywhere
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Securely store, access, and share your images, documents, and
                files from any device. Just like Google Drive, but simpler and
                faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-lg px-8"
                >
                  Start for Free
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Watch Demo
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 shadow-2xl">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl"></div>
                <div className="relative space-y-4">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="bg-white rounded-lg p-4 shadow-lg flex items-center space-x-3"
                  >
                    <Image className="w-8 h-8 text-blue-600" />
                    <div className="flex-1">
                      <div className="h-2 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, delay: 0.5, repeat: Infinity }}
                    className="bg-white rounded-lg p-4 shadow-lg flex items-center space-x-3"
                  >
                    <FileText className="w-8 h-8 text-purple-600" />
                    <div className="flex-1">
                      <div className="h-2 bg-gray-200 rounded w-2/3 mb-2"></div>
                      <div className="h-2 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, delay: 1, repeat: Infinity }}
                    className="bg-white rounded-lg p-4 shadow-lg flex items-center space-x-3"
                  >
                    <Folder className="w-8 h-8 text-orange-600" />
                    <div className="flex-1">
                      <div className="h-2 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Everything You Need
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600">
              Powerful features to manage and share your files effortlessly
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Simple, Transparent Pricing
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600">
              Choose the plan that works best for you
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8"
          >
            {plans.map((plan, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card
                  className={`h-full ${
                    plan.popular ? "border-2 border-blue-600 shadow-xl" : ""
                  }`}
                >
                  <CardContent className="p-8">
                    {plan.popular && (
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    )}
                    <h3 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
                      {plan.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">
                        {plan.price}
                      </span>
                      <span className="text-gray-600">/month</span>
                    </div>
                    <p className="text-gray-600 mb-6">{plan.storage} Storage</p>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${
                        plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who trust CloudShare with their files
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8"
          >
            Start Free Trial
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Cloud className="w-6 h-6 text-blue-500" />
                <span className="text-xl font-bold text-white">CloudShare</span>
              </div>
              <p className="text-sm">
                Secure file storage and sharing made simple.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 CloudShare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
