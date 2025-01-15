import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileCardProps {
  user: {
    name: string;
    email: string;
    birthDate: string;
    avatar: string;
  };
  isEditing: boolean;
  onSave: () => void;
  setIsEditing: (value: boolean) => void;
  setUser: (value: any) => void;
}

export const ProfileCard = ({ user, isEditing, onSave, setIsEditing, setUser }: ProfileCardProps) => {
  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {isEditing && (
            <Input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setUser(prev => ({
                      ...prev,
                      avatar: reader.result as string
                    }));
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          )}
        </div>
        <div className="flex-1 space-y-2 text-center sm:text-left">
          {isEditing ? (
            <>
              <Input
                value={user.name}
                onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
                className="text-xl font-bold"
                placeholder="Votre nom complet"
                disabled={!isEditing}
              />
              <Input
                type="email"
                value={user.email}
                onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                placeholder="votre@email.com"
                disabled={!isEditing}
              />
              <Input
                type="date"
                value={user.birthDate}
                onChange={(e) => setUser(prev => ({ ...prev, birthDate: e.target.value }))}
                placeholder="Date de naissance"
                disabled={!isEditing}
              />
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-[#8B5CF6]">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">
                Né(e) le : {new Date(user.birthDate).toLocaleDateString()}
              </p>
            </>
          )}
        </div>
        <Button
          onClick={() => isEditing ? onSave() : setIsEditing(true)}
          className="hover:bg-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 bg-[#D946EF] text-white"
          variant="ghost"
        >
          {isEditing ? "Sauvegarder" : "Modifier le profil"}
        </Button>
      </div>
    </Card>
  );
};