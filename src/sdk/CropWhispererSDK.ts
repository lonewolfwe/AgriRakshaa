export interface CropAnalysisResult {
  disease: {
    name: string;
    description: string;
    severity: "Low" | "Medium" | "High";
    confidence: number;
  };
  growthStage: {
    stage: string;
    description: string;
    expectedDuration: string;
  };
  treatments: {
    organic: Array<{
      name: string;
      instructions: string;
      materials: string[];
    }>;
    chemical: Array<{
      name: string;
      instructions: string;
      activeIngredient: string;
      dosage: string;
    }>;
  };
  generalRecommendations: string[];
}

export interface SDKConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
}

export interface AnalyzeImageOptions {
  language?: 'en' | 'mr' | 'hi' | 'te' | 'ta' | 'gu';
}

export class AgriRakshaSDK {
  private apiKey: string;
  private baseUrl: string;
  private timeout: number;

  constructor(config: SDKConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://api.agriraksha.com/v1';
    this.timeout = config.timeout || 30000;
  }

  /**
   * Analyze a crop image for diseases, growth stage, and treatment recommendations
   * @param imageFile - The image file to analyze
   * @param options - Analysis options including language preference
   * @returns Promise<CropAnalysisResult>
   */
  async analyzeImage(
    imageFile: File | Blob, 
    options: AnalyzeImageOptions = {}
  ): Promise<CropAnalysisResult> {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('language', options.language || 'en');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}/analyze`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || 
          `API request failed with status ${response.status}`
        );
      }

      const result = await response.json();
      return result as CropAnalysisResult;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout - analysis took too long');
        }
        throw error;
      }
      
      throw new Error('Unknown error occurred during analysis');
    }
  }

  /**
   * Get account usage statistics
   * @returns Promise with usage data
   */
  async getUsage(): Promise<{
    requestsUsed: number;
    requestsLimit: number;
    resetDate: string;
  }> {
    const response = await fetch(`${this.baseUrl}/usage`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get usage data: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Validate API key
   * @returns Promise<boolean>
   */
  async validateApiKey(): Promise<boolean> {
    try {
      await this.getUsage();
      return true;
    } catch {
      return false;
    }
  }
}

// Keep the old class name for backward compatibility
export class CropWhispererSDK extends AgriRakshaSDK {}
