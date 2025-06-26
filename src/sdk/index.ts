
// Main SDK class
export { AgriRakshaSDK, CropWhispererSDK } from './CropWhispererSDK';

// Types
export type {
  CropAnalysisResult,
  SDKConfig,
  AnalyzeImageOptions
} from './CropWhispererSDK';

export type {
  SupportedLanguage,
  DiseaseSeverity,
  Disease,
  GrowthStage,
  OrganicTreatment,
  ChemicalTreatment,
  Treatments,
  CropAnalysis,
  UsageStats,
  SDKError
} from './types';

// Utilities
export {
  validateImageFile,
  validateFileSize,
  getLanguageName,
  formatConfidence,
  fileToBase64,
  createThumbnail
} from './utils';

// Examples
export {
  basicAnalysisExample,
  advancedAnalysisExample,
  batchAnalysisExample
} from './examples';

// Version
export const SDK_VERSION = '1.0.0';

// Default export
import { AgriRakshaSDK } from './CropWhispererSDK';
export default AgriRakshaSDK;
