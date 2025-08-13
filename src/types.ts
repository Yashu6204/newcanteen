export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  available: boolean;
}

export interface User {
  username: string;
  isAuthenticated: boolean;
}