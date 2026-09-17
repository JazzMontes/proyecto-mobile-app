export interface User {
  id?: number;
  username: string;
  email: string;
  name: string;
  password?: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}