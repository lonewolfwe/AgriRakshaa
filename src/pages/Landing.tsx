
import { ArrowRight, Camera, Leaf, Smartphone, Sprout, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CarouselBanner } from "@/components/CarouselBanner";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500 p-2 rounded-lg">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Agri Raksha</h1>
                <p className="text-sm text-gray-600">AI-Powered Crop Analysis</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex items-center space-x-6">
                <Link to="/features" className="text-gray-600 hover:text-green-600 transition-colors">
                  Features
                </Link>
                <Link to="/help" className="text-gray-600 hover:text-green-600 transition-colors">
                  Help
                </Link>
              </nav>
              <Link to="/auth">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-green-500 hover:bg-green-600" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Carousel Banner */}
      <CarouselBanner 
        location="homepage" 
        className="container mx-auto px-4" 
      />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">

          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Your Farming with{" "}
            <span className="text-green-500">AI-Powered</span> Crop Analysis
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload photos of your crops and get instant insights on health, diseases, and actionable recommendations to maximize your harvest.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/auth">
              <Button className="bg-green-500 hover:bg-green-600 text-lg px-8 py-3">
                Start Analyzing <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Farmers Choose Agri Raksha
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI technology makes crop management simple, accurate, and accessible for farmers of all sizes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Instant Analysis
              </h3>
              <p className="text-gray-600">
                Simply take a photo of your crop and get immediate AI-powered insights about plant health and potential issues.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Mobile Optimized
              </h3>
              <p className="text-gray-600">
                Designed for farmers in the field. Works perfectly on mobile devices.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Expert Recommendations
              </h3>
              <p className="text-gray-600">
                Get actionable advice based on the latest agricultural research and AI-powered analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-green-500">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Revolutionize Your Farming?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already using AI to improve their crop yields and reduce losses.
          </p>
          
          <Link to="/auth">
            <Button className="bg-white text-green-500 hover:bg-gray-100 text-lg px-8 py-3">
              Get Started for Free <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-500 p-2 rounded-lg">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Agri Raksha</h3>
                  <p className="text-sm text-gray-400">AI-Powered Crop Analysis</p>
                </div>
              </div>
              <p className="text-gray-400 max-w-md">
                Empowering farmers with cutting-edge AI technology to optimize crop health and maximize yields.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link to="/features" className="hover:text-green-400 transition-colors">Features</Link></li>
                <li><Link to="/api" className="hover:text-green-400 transition-colors">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/help" className="hover:text-green-400 transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-green-400 transition-colors">Contact</Link></li>
                <li><Link to="/help" className="hover:text-green-400 transition-colors">Community</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AgriRaksha. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
