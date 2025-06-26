
# Agri Raksha SDK

The official JavaScript/TypeScript SDK for the Agri Raksha API. Analyze crop images for diseases, growth stages, and get treatment recommendations with AI-powered analysis.

## Installation

```bash
npm install agriraksha-sdk
# or
yarn add agriraksha-sdk
```

## Quick Start

```typescript
import { AgriRakshaSDK } from 'agriraksha-sdk';

// Initialize the SDK
const sdk = new AgriRakshaSDK({
  apiKey: 'your-api-key-here'
});

// Analyze an image
const fileInput = document.getElementById('image') as HTMLInputElement;
const file = fileInput.files[0];

try {
  const result = await sdk.analyzeImage(file, {
    language: 'en' // Optional: 'en', 'mr', 'hi', 'te', 'ta', 'gu'
  });
  
  console.log('Disease:', result.disease.name);
  console.log('Growth Stage:', result.growthStage.stage);
  console.log('Confidence:', result.disease.confidence);
} catch (error) {
  console.error('Analysis failed:', error.message);
}
```

## Configuration

```typescript
const sdk = new AgriRakshaSDK({
  apiKey: 'your-api-key',           // Required: Your API key
  baseUrl: 'https://api.example.com', // Optional: Custom API endpoint
  timeout: 30000                    // Optional: Request timeout in ms (default: 30s)
});
```

## API Methods

### `analyzeImage(file, options)`

Analyze a crop image for diseases, growth stage, and treatment recommendations.

**Parameters:**
- `file` (File | Blob): The image file to analyze
- `options` (AnalyzeImageOptions): Analysis options
  - `language` ('en' | 'mr' | 'hi' | 'te' | 'ta' | 'gu'): Response language

**Returns:** `Promise<CropAnalysisResult>`

### `getUsage()`

Get current API usage statistics.

**Returns:** `Promise<UsageStats>`

### `validateApiKey()`

Validate your API key.

**Returns:** `Promise<boolean>`

## Response Format

```typescript
interface CropAnalysisResult {
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
```

## Utilities

### File Validation

```typescript
import { validateImageFile, validateFileSize } from 'agriraksha-sdk';

// Check if file is a supported image format
if (!validateImageFile(file)) {
  throw new Error('Unsupported file format');
}

// Check file size (default: 10MB limit)
if (!validateFileSize(file)) {
  throw new Error('File too large');
}
```

### Language Support

```typescript
import { getLanguageName } from 'agriraksha-sdk';

const languageName = getLanguageName('hi'); // Returns "Hindi"
```

## Error Handling

```typescript
try {
  const result = await sdk.analyzeImage(file);
} catch (error) {
  if (error.message.includes('timeout')) {
    // Handle timeout
  } else if (error.message.includes('401')) {
    // Handle authentication error
  } else {
    // Handle other errors
  }
}
```

## Advanced Usage

### Batch Processing

```typescript
import { batchAnalysisExample } from 'agriraksha-sdk';

const files = [file1, file2, file3];
const results = await batchAnalysisExample(files);

results.forEach(({ file, result, error }) => {
  if (error) {
    console.error(`Failed to analyze ${file}:`, error);
  } else {
    console.log(`${file}: ${result.disease.name}`);
  }
});
```

### Progress Tracking

```typescript
import { advancedAnalysisExample } from 'agriraksha-sdk';

const result = await advancedAnalysisExample(file, (stage) => {
  console.log('Progress:', stage);
  // Update UI progress indicator
});
```

## Supported Languages

- English (`en`)
- Marathi (`mr`)
- Hindi (`hi`)
- Telugu (`te`)
- Tamil (`ta`)
- Gujarati (`gu`)

## Requirements

- Modern browser with File API support
- Valid Agri Raksha API key
- Image files in JPEG, PNG, or WebP format
- Maximum file size: 10MB

## Support

- Documentation: https://docs.agriraksha.com
- API Reference: https://api.agriraksha.com/docs
- Issues: https://github.com/agriraksha/sdk/issues

## License

MIT License - see LICENSE file for details.
