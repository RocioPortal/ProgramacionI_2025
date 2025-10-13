export interface LoginResponse {
  message: string;
  token: string;
  role: string;
  user: {
    email: string;
    id_user: number;
  };
}