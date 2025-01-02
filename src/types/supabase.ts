export type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  birth_date: string | null;
  updated_at: string | null;
};

export type Record = {
  id: string;
  user_id: string;
  distance: string;
  time: string;
  updated_at: string;
};