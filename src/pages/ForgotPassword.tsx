import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast.success("Un email de réinitialisation vous a été envoyé !");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pastel-peach to-pastel-purple p-4 flex items-center justify-center">
      <Card className="w-full max-w-md p-6 bg-white/80 backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-center mb-6">
          Mot de passe oublié
        </h1>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="w-full bg-[#D946EF] hover:bg-[#D946EF]/80"
            disabled={loading}
          >
            {loading ? "Envoi..." : "Réinitialiser le mot de passe"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-sm text-[#D946EF] hover:underline">
            Retour à la connexion
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;