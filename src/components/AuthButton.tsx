import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";

export const AuthButton = () => {
  const { user, signInWithGoogle, signOut } = useAuth();
  const { t } = useTranslation();

  return (
    <Button
      onClick={user ? signOut : signInWithGoogle}
      variant="outline"
      className="bg-white/50 backdrop-blur-sm"
    >
      {user ? t('auth.signOut') : t('auth.signIn')}
    </Button>
  );
};