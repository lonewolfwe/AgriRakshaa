
import { Code, Key, Zap, Shield, Globe, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";

const Api = () => {
  const handlePricingClick = () => {
    window.open("https://forms.gle/pxzjAQ5ZDQZkw5eFA", "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            CropWhisperer <span className="text-green-500">API</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Integrate our powerful AI crop analysis into your applications with our RESTful API.
          </p>
          <Button className="bg-green-500 hover:bg-green-600 text-lg px-8 py-3" onClick={handlePricingClick}>
            Get API Access <ExternalLink className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* API Features */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">API Features</h2>
            <p className="text-xl text-gray-600">Everything you need to build agricultural applications</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast Response</h3>
              <p className="text-gray-600">Get analysis results in under 3 seconds with our optimized AI models.</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure & Reliable</h3>
              <p className="text-gray-600">Enterprise-grade security with 99.9% uptime guarantee.</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Multi-Language</h3>
              <p className="text-gray-600">Support for 6+ languages with localized recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* API Documentation Preview */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Quick Start</h2>
          
          <div className="bg-gray-900 rounded-lg p-6 mb-8">
            <div className="flex items-center mb-4">
              <Code className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-green-400 font-medium">POST /api/v1/analyze</span>
            </div>
            <pre className="text-gray-300 text-sm overflow-x-auto">
{`curl -X POST https://api.cropwhisperer.com/v1/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: multipart/form-data" \\
  -F "image=@crop_image.jpg" \\
  -F "language=en"`}
            </pre>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Key className="w-5 h-5 text-green-600 mr-2" />
              Response Format
            </h3>
            <pre className="text-sm text-gray-700 overflow-x-auto">
{`{
  "disease": {
    "name": "Healthy",
    "description": "Plant appears healthy...",
    "severity": "Low",
    "confidence": 95
  },
  "growthStage": {
    "stage": "Flowering",
    "description": "Plant is in flowering stage...",
    "expectedDuration": "2-3 weeks"
  },
  "treatments": {
    "organic": [...],
    "chemical": [...]
  },
  "generalRecommendations": [...]
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">API Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Free Tier</h3>
              <div className="text-3xl font-bold text-green-500 mb-4">$0</div>
              <p className="text-gray-600 mb-6">100 requests/month</p>
              <Button variant="outline" className="w-full" onClick={handlePricingClick}>
                Get Started <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </div>
            
            <div className="bg-green-500 text-white rounded-lg p-6 border-2 border-green-500 transform scale-105">
              <h3 className="text-xl font-semibold mb-4">Pro</h3>
              <div className="text-3xl font-bold mb-4">$29</div>
              <p className="text-green-100 mb-6">5,000 requests/month</p>
              <Button className="w-full bg-white text-green-500 hover:bg-gray-100" onClick={handlePricingClick}>
                Choose Pro <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Enterprise</h3>
              <div className="text-3xl font-bold text-green-500 mb-4">Custom</div>
              <p className="text-gray-600 mb-6">Unlimited requests</p>
              <Button variant="outline" className="w-full" onClick={handlePricingClick}>
                Contact Sales <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Api;
