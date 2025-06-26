
export type SupportedLanguage = 'en' | 'mr' | 'hi' | 'te' | 'ta' | 'gu';

export type DiseaseSeverity = 'Low' | 'Medium' | 'High';

export interface Disease {
  name: string;
  description: string;
  severity: DiseaseSeverity;
  confidence: number;
}

export interface GrowthStage {
  stage: string;
  description: string;
  expectedDuration: string;
}

export interface OrganicTreatment {
  name: string;
  instructions: string;
  materials: string[];
}

export interface ChemicalTreatment {
  name: string;
  instructions: string;
  activeIngredient: string;
  dosage: string;
}

export interface Treatments {
  organic: OrganicTreatment[];
  chemical: ChemicalTreatment[];
}

export interface CropAnalysis {
  disease: Disease;
  growthStage: GrowthStage;
  treatments: Treatments;
  generalRecommendations: string[];
}

export interface UsageStats {
  requestsUsed: number;
  requestsLimit: number;
  resetDate: string;
}

export interface SDKError {
  message: string;
  code?: string;
  statusCode?: number;
}
