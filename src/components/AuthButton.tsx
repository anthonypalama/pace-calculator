import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const AuthButton = () => {
  const { user, signInWithGoogle, signOut } = useAuth();
  const { t } = useTranslation();

  const handleAuth = async () => {
    try {
      if (user) {
        await signOut();
      } else {
        await signInWithGoogle();
      }
    } catch (error) {
      console.error('Erreur d\'authentification:', error);
      toast.error('Une erreur est survenue lors de l\'authentification');
    }
  };

  return (
    <Button
      onClick={handleAuth}
      variant="outline"
      className="bg-white/50 backdrop-blur-sm"
      data-auth-button="true"
    >
      {user ? t('auth.signOut') : t('auth.signIn')}
    </Button>
  );
};