
import { Search, Book, MessageCircle, Video, Download, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";

const HelpCenter = () => {
  const categories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn the basics of using CropWhisperer",
      articles: 12
    },
    {
      icon: MessageCircle,
      title: "FAQ",
      description: "Frequently asked questions and answers",
      articles: 25
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      articles: 8
    },
    {
      icon: Download,
      title: "API Documentation",
      description: "Technical documentation for developers",
      articles: 15
    }
  ];

  const popularArticles = [
    "How to take the best crop photos for analysis",
    "Understanding disease severity levels",
    "Setting up multi-language analysis",
    "Interpreting AI recommendations",
    "Troubleshooting upload issues"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How can we <span className="text-green-500">help you?</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Find answers, tutorials, and get the support you need to make the most of CropWhisperer.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input 
              placeholder="Search for help articles, tutorials, or FAQs..."
              className="pl-12 pr-4 py-4 text-lg bg-white/80 backdrop-blur-sm border-green-200"
            />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-green-600">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Browse by Category</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-green-200 hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <category.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-3">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{category.articles} articles</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-500 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Popular Articles</h2>
          
          <div className="space-y-4">
            {popularArticles.map((article, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-green-200 hover:shadow-md transition-shadow cursor-pointer group">
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 group-hover:text-green-600 transition-colors">{article}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-500 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 px-4 bg-green-500">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Still Need Help?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Our support team is here to help you succeed with CropWhisperer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-green-500 hover:bg-gray-100 text-lg px-8 py-3">
              Contact Support
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-500 text-lg px-8 py-3">
              Join Community
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
