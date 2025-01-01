import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="outline"
      onClick={toggleLanguage}
      className="fixed top-4 right-20 z-50"
    >
      {i18n.language === 'fr' ? '🇬🇧 EN' : '🇫🇷 FR'}
    </Button>
  );
};