
import { AgriRakshaSDK } from './CropWhispererSDK';
import { validateImageFile, validateFileSize } from './utils';

/**
 * Basic usage example
 */
export async function basicAnalysisExample() {
  // Initialize the SDK
  const sdk = new AgriRakshaSDK({
    apiKey: 'your-api-key-here',
    timeout: 30000 // 30 seconds
  });

  // Get file from input element
  const fileInput = document.getElementById('image-upload') as HTMLInputElement;
  const file = fileInput.files?.[0];
  
  if (!file) {
    throw new Error('No file selected');
  }

  // Validate the file
  if (!validateImageFile(file)) {
    throw new Error('Unsupported file format. Please use JPEG, PNG, or WebP.');
  }

  if (!validateFileSize(file)) {
    throw new Error('File too large. Maximum size is 10MB.');
  }

  try {
    // Analyze the image
    const result = await sdk.analyzeImage(file, {
      language: 'en' // Optional: specify language
    });

    console.log('Disease detected:', result.disease.name);
    console.log('Growth stage:', result.growthStage.stage);
    console.log('Confidence:', result.disease.confidence);
    
    return result;
  } catch (error) {
    console.error('Analysis failed:', error);
    throw error;
  }
}

/**
 * Advanced usage with error handling and progress
 */
export async function advancedAnalysisExample(
  file: File,
  onProgress?: (stage: string) => void
) {
  const sdk = new AgriRakshaSDK({
    apiKey: process.env.AGRIRAKSHA_API_KEY || '',
    baseUrl: 'https://api.agriraksha.com/v1'
  });

  try {
    onProgress?.('Validating API key...');
    const isValid = await sdk.validateApiKey();
    if (!isValid) {
      throw new Error('Invalid API key');
    }

    onProgress?.('Checking usage limits...');
    const usage = await sdk.getUsage();
    if (usage.requestsUsed >= usage.requestsLimit) {
      throw new Error('Monthly request limit exceeded');
    }

    onProgress?.('Analyzing image...');
    const result = await sdk.analyzeImage(file, {
      language: 'en'
    });

    onProgress?.('Analysis complete!');
    return result;

  } catch (error) {
    console.error('Analysis pipeline failed:', error);
    throw error;
  }
}

/**
 * Batch analysis example
 */
export async function batchAnalysisExample(files: File[]) {
  const sdk = new AgriRakshaSDK({
    apiKey: 'your-api-key-here'
  });

  const results = [];
  
  for (const file of files) {
    try {
      const result = await sdk.analyzeImage(file);
      results.push({ file: file.name, result, error: null });
    } catch (error) {
      results.push({ 
        file: file.name, 
        result: null, 
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  return results;
}
