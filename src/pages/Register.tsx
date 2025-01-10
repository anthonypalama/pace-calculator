import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    setLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // Créer le profil utilisateur
        const { error: profileError } = await supabase.from("profiles").insert({
          id: authData.user.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          birth_date: formData.birthDate,
          full_name: `${formData.firstName} ${formData.lastName}`,
        });

        if (profileError) throw profileError;

        toast.success("Inscription réussie ! Veuillez vérifier votre email.");
        navigate("/login");
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
        <h1 className="text-2xl font-bold text-center mb-6">Inscription</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="firstName"
              placeholder="Prénom"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <Input
              name="lastName"
              placeholder="Nom"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirmer le mot de passe"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            className="w-full bg-[#D946EF] hover:bg-[#D946EF]/80"
            disabled={loading}
          >
            {loading ? "Inscription..." : "S'inscrire"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-sm text-[#D946EF] hover:underline">
            Déjà un compte ? Se connecter
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;