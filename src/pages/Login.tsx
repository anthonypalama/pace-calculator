import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        toast.success("Connexion réussie !");
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pastel-peach to-pastel-purple p-4 flex items-center justify-center">
      <Card className="w-full max-w-md p-6 bg-white/80 backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#D946EF] hover:bg-[#D946EF]/80"
            disabled={loading}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
        <div className="mt-4 text-center space-y-2">
          <Link to="/forgot-password" className="text-sm text-[#D946EF] hover:underline block">
            Mot de passe oublié ?
          </Link>
          <Link to="/register" className="text-sm text-[#D946EF] hover:underline block">
            Pas encore de compte ? S'inscrire
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;