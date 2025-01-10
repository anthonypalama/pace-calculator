import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";

export const AuthButton = () => {
  const { user, signInWithGoogle, signOut } = useAuth();
  const { t } = useTranslation();

  const handleAuth = async () => {
    try {
      console.log('Auth button clicked, current user:', user);
      if (user) {
        await signOut();
      } else {
        await signInWithGoogle();
      }
    } catch (error) {
      console.error('Auth button error:', error);
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