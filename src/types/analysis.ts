
export interface Disease {
  name: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
  confidence: number;
}

export interface GrowthStage {
  stage: string;
  description: string;
  expectedDuration: string;
}

export interface Treatment {
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
  organic: Treatment[];
  chemical: ChemicalTreatment[];
}

export interface CropAnalysis {
  disease: Disease;
  growthStage: GrowthStage;
  treatments: Treatments;
  generalRecommendations: string[];
}
