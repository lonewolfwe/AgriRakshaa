
import { CropAnalysis } from "@/types/analysis";

const GEMINI_API_KEY = "AIzaSyBjsb5ckSuUWqVFDbF9WsNOS8Nwlmm9-gw";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export const analyzeCropImage = async (imageFile: File, language: string = 'en'): Promise<CropAnalysis> => {
  try {
    // Convert image to base64
    const base64Image = await fileToBase64(imageFile);
    
    const languageMap: { [key: string]: string } = {
      'en': 'English',
      'mr': 'Marathi',
      'hi': 'Hindi',
      'te': 'Telugu',
      'ta': 'Tamil',
      'gu': 'Gujarati'
    };

    const selectedLanguageName = languageMap[language] || 'English';
    
    const prompt = `
      You are an expert agricultural AI assistant. Analyze this crop image and provide a detailed analysis in ${selectedLanguageName} language in the following JSON format. Be specific and practical in your recommendations.

      IMPORTANT: Respond with all text content in ${selectedLanguageName} language, but keep the JSON structure keys in English.

      Please respond with a valid JSON object only, with this exact structure:
      {
        "disease": {
          "name": "Disease name or 'Healthy' if no disease detected (in ${selectedLanguageName})",
          "description": "Detailed description of the disease or health status (in ${selectedLanguageName})",
          "severity": "Low|Medium|High",
          "confidence": 85
        },
        "growthStage": {
          "stage": "Specific growth stage name (in ${selectedLanguageName})",
          "description": "Description of this growth stage (in ${selectedLanguageName})",
          "expectedDuration": "Duration information (in ${selectedLanguageName})"
        },
        "treatments": {
          "organic": [
            {
              "name": "Treatment name (in ${selectedLanguageName})",
              "instructions": "Step-by-step instructions (in ${selectedLanguageName})",
              "materials": ["material1 (in ${selectedLanguageName})", "material2 (in ${selectedLanguageName})"]
            }
          ],
          "chemical": [
            {
              "name": "Treatment name (in ${selectedLanguageName})",
              "instructions": "Application instructions (in ${selectedLanguageName})",
              "activeIngredient": "Chemical name (in ${selectedLanguageName})",
              "dosage": "Specific dosage (in ${selectedLanguageName})"
            }
          ]
        },
        "generalRecommendations": [
          "Recommendation 1 (in ${selectedLanguageName})",
          "Recommendation 2 (in ${selectedLanguageName})",
          "Recommendation 3 (in ${selectedLanguageName})"
        ]
      }

      Focus on:
      1. Identifying any diseases, pests, or nutrient deficiencies
      2. Determining the growth stage accurately
      3. Providing practical, actionable treatments
      4. Including preventive measures
      5. Considering environmental factors
      
      Remember: All descriptive text should be in ${selectedLanguageName}, but JSON keys should remain in English.
    `;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt
            },
            {
              inline_data: {
                mime_type: imageFile.type,
                data: base64Image
              }
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.4,
        topK: 32,
        topP: 1,
        maxOutputTokens: 2048,
      },
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response format from Gemini API');
    }

    const analysisText = data.candidates[0].content.parts[0].text;
    
    // Clean the response text to extract JSON
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }

    const cleanedJson = jsonMatch[0];
    
    try {
      const analysis: CropAnalysis = JSON.parse(cleanedJson);
      
      // Validate the response structure
      if (!analysis.disease || !analysis.growthStage || !analysis.treatments) {
        throw new Error('Invalid analysis structure');
      }
      
      return analysis;
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Response text:', analysisText);
      throw new Error('Failed to parse analysis results');
    }

  } catch (error) {
    console.error('Error analyzing crop image:', error);
    throw error;
  }
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};
