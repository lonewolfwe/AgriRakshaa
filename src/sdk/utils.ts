
import { SupportedLanguage } from './types';

/**
 * Validate if a file is a supported image format
 */
export function validateImageFile(file: File): boolean {
  const supportedTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/webp'
  ];
  
  return supportedTypes.includes(file.type);
}

/**
 * Check if file size is within limits (10MB)
 */
export function validateFileSize(file: File, maxSizeMB: number = 10): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}

/**
 * Get language name from code
 */
export function getLanguageName(code: SupportedLanguage): string {
  const languageMap: Record<SupportedLanguage, string> = {
    'en': 'English',
    'mr': 'Marathi', 
    'hi': 'Hindi',
    'te': 'Telugu',
    'ta': 'Tamil',
    'gu': 'Gujarati'
  };
  
  return languageMap[code] || 'English';
}

/**
 * Format confidence percentage for display
 */
export function formatConfidence(confidence: number): string {
  return `${Math.round(confidence)}%`;
}

/**
 * Convert File to base64 string
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
  });
}

/**
 * Create a thumbnail from an image file
 */
export function createThumbnail(
  file: File, 
  maxWidth: number = 300,
  maxHeight: number = 300,
  quality: number = 0.8
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and convert to blob
      ctx?.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => blob ? resolve(blob) : reject(new Error('Failed to create thumbnail')),
        'image/jpeg',
        quality
      );
    };
    
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
