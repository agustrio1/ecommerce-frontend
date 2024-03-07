import { create } from "zustand";
import Cookies from "js-cookie";

interface User {
  name: string;
  email: string;
  phone: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  register: (userData: User) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => {
  const token = Cookies.get("token",);
  const user = Cookies.get("user");

  console.log(token);
  console.log(user);

  return {
    user: user ? JSON.parse(user) : null,
    token: token || null,
    isLoggedIn: !!token && !!user,

    register: async (userData) => {
      try {
        const response = await fetch(`http://localhost:3000/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.ok) {
            Cookies.set('user', JSON.stringify(data.data.user), { 
                secure: false,  
              });
              Cookies.set('token', data.data.token, { 
                secure: false, 
              });
              
          set({ user: data.data.user, token: data.data.token, isLoggedIn: true });
        } else {
          throw new Error(data.message);
        }

      } catch (error) {
        console.error("Error registering user:", error);
        throw new Error("Failed to register user");
      }
    },

    login: async (email, password) => {
      try {
        const response = await fetch(`http://localhost:3000/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log(data)

        if (response.ok) {
            Cookies.set('user', JSON.stringify(data.data.user), {
              secure: false,
            });
              Cookies.set('token', data.data.token, { 
                secure: false,  
              });
              
          set({ user: data.data.user, token: data.data.token, isLoggedIn: true });
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error("Error logging in:", error);
        throw new Error("Failed to login");
      }
    },

    logout: () => {
      Cookies.remove("user");
      Cookies.remove("token");
      set({ user: null, token: null, isLoggedIn: false });
    },
  };
});

export default useAuthStore;
