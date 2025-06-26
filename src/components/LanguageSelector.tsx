
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export const LanguageSelector = ({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'mr', name: 'Marathi' },
    { code: 'hi', name: 'Hindi' },
    { code: 'te', name: 'Telugu' },
    { code: 'ta', name: 'Tamil' },
    { code: 'gu', name: 'Gujarati' }
  ];

  return (
    <div className="space-y-2">
      <Label htmlFor="language">Analysis Language</Label>
      <Select value={selectedLanguage} onValueChange={onLanguageChange}>
        <SelectTrigger id="language" className="w-full bg-white/80 backdrop-blur-sm border-green-200">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent className="bg-white border-green-200">
          {languages.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              {language.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
