
import { ArrowRight, Camera, Smartphone, Users, Zap, Shield, Clock, Globe, BarChart3, Leaf, Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";

const Features = () => {
  const features = [
    {
      icon: Camera,
      title: "Instant AI Analysis",
      description: "Upload crop photos and get immediate AI-powered insights about plant health, diseases, and growth stages.",
      benefits: ["Real-time analysis", "95% accuracy rate", "Multiple crop types supported"]
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Get analysis results in your native language including English, Hindi, Marathi, Telugu, Tamil, and Gujarati.",
      benefits: ["6 languages supported", "Localized recommendations", "Cultural context awareness"]
    },
    {
      icon: Shield,
      title: "Disease Detection",
      description: "Advanced AI algorithms detect crop diseases early, helping prevent yield loss and optimize treatment timing.",
      benefits: ["Early detection", "Treatment recommendations", "Severity assessment"]
    },
    {
      icon: BarChart3,
      title: "Growth Stage Analysis",
      description: "Track your crop's development stages and get insights on optimal care practices for each phase.",
      benefits: ["Growth tracking", "Stage-specific advice", "Timeline predictions"]
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Designed specifically for farmers in the field with offline capabilities and mobile-first interface.",
      benefits: ["Works offline", "Touch-friendly interface", "Fast loading"]
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Access crop analysis anytime, anywhere. No need to wait for agricultural experts or office hours.",
      benefits: ["Always available", "Instant results", "No appointments needed"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for <span className="text-green-500">Smart Farming</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover how Agri Raksha's AI-powered features help farmers make better decisions and increase crop yields.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-green-200 hover:shadow-lg transition-shadow">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-green-500">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of farmers who are already benefiting from AI-powered crop analysis.
          </p>
          <Link to="/auth">
            <Button className="bg-white text-green-500 hover:bg-gray-100 text-lg px-8 py-3">
              Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
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
                <li><Link to="/help" className="hover:text-green-400 transition-colors">Help</Link></li>
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

export default Features;
