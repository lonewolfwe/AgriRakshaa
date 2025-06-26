
import { useState, useCallback } from 'react';
import { Upload, Camera, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LanguageSelector } from '@/components/LanguageSelector';

interface ImageUploadProps {
  onImageUpload: (file: File, language: string) => void;
  isAnalyzing: boolean;
  uploadedImage: string | null;
  onNewAnalysis: () => void;
}

export const ImageUpload = ({ onImageUpload, isAnalyzing, uploadedImage, onNewAnalysis }: ImageUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  }, [selectedLanguage]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  }, [selectedLanguage]);

  const handleFileUpload = (file: File) => {
    if (file.type.startsWith('image/')) {
      onImageUpload(file, selectedLanguage);
    }
  };

  if (uploadedImage) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-green-200">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <img
                src={uploadedImage}
                alt="Uploaded crop"
                className="w-full h-64 object-cover rounded-lg"
              />
              {!isAnalyzing && (
                <Button
                  onClick={onNewAnalysis}
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <LanguageSelector 
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
            />
            
            {isAnalyzing && (
              <div className="text-center">
                <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">Analyzing your crop image...</p>
              </div>
            )}
            
            {!isAnalyzing && (
              <Button 
                onClick={onNewAnalysis}
                variant="outline" 
                className="w-full flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Analyze Another Image</span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-green-200">
      <CardContent className="p-6">
        <div className="space-y-6">
          <LanguageSelector 
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
          
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-green-500 bg-green-50' 
                : 'border-green-300 hover:border-green-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isAnalyzing}
            />
            
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-green-100 rounded-full">
                  <Upload className="w-8 h-8 text-green-600" />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Upload Crop Image
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Drag and drop your crop image here, or click to browse
                </p>
                <p className="text-xs text-gray-500">
                  Supports PNG, JPG, JPEG files up to 10MB
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button 
                  variant="outline" 
                  className="flex items-center space-x-2"
                  disabled={isAnalyzing}
                >
                  <Upload className="w-4 h-4" />
                  <span>Choose File</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex items-center space-x-2"
                  disabled={isAnalyzing}
                >
                  <Camera className="w-4 h-4" />
                  <span>Take Photo</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
