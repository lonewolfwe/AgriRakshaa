
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CropAnalysis } from "@/types/analysis";

interface AnalysisResultsProps {
  analysis: CropAnalysis | null;
  isAnalyzing: boolean;
}

export const AnalysisResults = ({ analysis, isAnalyzing }: AnalysisResultsProps) => {
  if (isAnalyzing) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-green-200">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto"></div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Analyzing Your Crop</h3>
              <p className="text-gray-600">Our AI is examining your image for diseases, growth stage, and treatment options...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-green-200">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">🔍</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Ready for Analysis</h3>
              <p className="text-gray-600">Upload a crop image to get detailed AI analysis and treatment recommendations.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Disease Analysis */}
      <Card className="bg-white/80 backdrop-blur-sm border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <span>🦠</span>
              <span>Disease Analysis</span>
            </span>
            <Badge className={getSeverityColor(analysis.disease.severity)}>
              {analysis.disease.severity} Risk
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800">{analysis.disease.name}</h4>
            <p className="text-gray-600 text-sm mt-1">{analysis.disease.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Confidence:</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${analysis.disease.confidence}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{analysis.disease.confidence}%</span>
          </div>
        </CardContent>
      </Card>

      {/* Growth Stage */}
      <Card className="bg-white/80 backdrop-blur-sm border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🌱</span>
            <span>Growth Stage</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-semibold text-gray-800">{analysis.growthStage.stage}</h4>
            <p className="text-gray-600 text-sm mt-1">{analysis.growthStage.description}</p>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Expected Duration: </span>
            <span className="font-medium">{analysis.growthStage.expectedDuration}</span>
          </div>
        </CardContent>
      </Card>

      {/* Treatment Recommendations */}
      <Card className="bg-white/80 backdrop-blur-sm border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>💊</span>
            <span>Treatment Options</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Organic Treatments */}
          <div>
            <h4 className="font-semibold text-green-800 mb-3 flex items-center space-x-2">
              <span>🌿</span>
              <span>Organic Treatments</span>
            </h4>
            <div className="space-y-3">
              {analysis.treatments.organic.map((treatment, index) => (
                <div key={index} className="p-3 bg-green-50 rounded-lg">
                  <h5 className="font-medium text-gray-800">{treatment.name}</h5>
                  <p className="text-sm text-gray-600 mt-1">{treatment.instructions}</p>
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">Materials needed: </span>
                    <span className="text-xs text-gray-700">{treatment.materials.join(', ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Chemical Treatments */}
          <div>
            <h4 className="font-semibold text-blue-800 mb-3 flex items-center space-x-2">
              <span>⚗️</span>
              <span>Chemical Treatments</span>
            </h4>
            <div className="space-y-3">
              {analysis.treatments.chemical.map((treatment, index) => (
                <div key={index} className="p-3 bg-blue-50 rounded-lg">
                  <h5 className="font-medium text-gray-800">{treatment.name}</h5>
                  <p className="text-sm text-gray-600 mt-1">{treatment.instructions}</p>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Active Ingredient: </span>
                      <span className="text-gray-700">{treatment.activeIngredient}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Dosage: </span>
                      <span className="text-gray-700">{treatment.dosage}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* General Recommendations */}
      <Card className="bg-white/80 backdrop-blur-sm border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>📋</span>
            <span>General Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {analysis.generalRecommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-green-600 mt-1">•</span>
                <span className="text-gray-700 text-sm">{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
