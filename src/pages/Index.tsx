
import React, { useState } from 'react';
import { ImageUpload } from '@/components/ImageUpload';
import { CarouselBanner } from '@/components/CarouselBanner';
import { AnalysisResults } from '@/components/AnalysisResults';
import { analyzeCropImage } from '@/services/geminiService';
import { CropAnalysis } from '@/types/analysis';

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<CropAnalysis | null>(null);

  const handleImageUpload = async (file: File, language: string) => {
    try {
      setIsAnalyzing(true);
      setUploadedImage(URL.createObjectURL(file));
      
      const result = await analyzeCropImage(file, language);
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing image:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNewAnalysis = () => {
    setUploadedImage(null);
    setAnalysis(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section with Banner */}
      <div className="relative">
        <CarouselBanner location="homepage" className="mb-8" />
        
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Agri Raksha
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Advanced crop disease detection powered by AI. Upload an image of your crop to get instant diagnosis and treatment recommendations.
            </p>
           </div>

          {/* Main Upload Section */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ImageUpload 
              onImageUpload={handleImageUpload}
              isAnalyzing={isAnalyzing}
              uploadedImage={uploadedImage}
              onNewAnalysis={handleNewAnalysis}
            />
            
            <AnalysisResults 
              analysis={analysis}
              isAnalyzing={isAnalyzing}
            />
          </div>

          {/* Results Banner */}
          {analysis && (
            <div className="mt-12">
              <CarouselBanner location="results" className="mb-8" />
            </div>
          )}

          {/* Features Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Accurate Detection</h3>
              <p className="text-gray-600">Our AI model can identify over 30 common crop diseases with 95% accuracy.</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
              <p className="text-gray-600">Get immediate diagnosis and treatment recommendations in seconds.</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Recommendations</h3>
              <p className="text-gray-600">Receive detailed treatment plans from agricultural experts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
