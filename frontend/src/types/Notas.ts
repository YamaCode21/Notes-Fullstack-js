export type Note = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  pinned: boolean;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
};