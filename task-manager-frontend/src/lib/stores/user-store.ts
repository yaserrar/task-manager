import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

type User = {
  name: string;
  id: number;
  sub: string;
};

type State = {
  isLoggerIn: boolean;
  jwt: string | null;
  user: User | null;

  login: (jwt: string) => void;
  logout: () => void;
};

const jwt = localStorage.getItem("jwt");

const useUserStore = create<State>((set) => ({
  isLoggerIn: jwt ? true : false,
  jwt: jwt ? jwt : null,
  user: jwt ? jwtDecode(jwt) : null,

  login: (jwt: string) => {
    set({ jwt, user: jwtDecode(jwt), isLoggerIn: true });
    localStorage.setItem("jwt", jwt);
  },
  logout: () => {
    set({ jwt: null, user: null, isLoggerIn: false });
    localStorage.removeItem("jwt");
  },
}));

export default useUserStore;
