import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";

// Constantes para claves de localStorage
const LOCAL_STORAGE_USER_KEY = "usuario";
const LOCAL_STORAGE_TOKEN_KEY = "token";

// Tipo de usuario
interface User {
  id_usuario: number;
  nombre: string;
  correo: string;
  rol: "usuario" | "admin";
}

// Tipo de contexto
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

// Creación del contexto
const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe estar dentro de un UserProvider");
  }
  return context;
};

// Proveedor del contexto
export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Estado inicial derivado de localStorage
  const [user, setUserState] = useState<User | null>(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Función para actualizar el usuario y sincronizar con localStorage
  const setUser = (newUser: User | null) => {
    if (newUser) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    }
    setUserState(newUser);
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    setUserState(null);
  };

  // Memorizar el valor del contexto para evitar renders innecesarios
  const value = useMemo(
    () => ({ user, setUser, logout }),
    [user] // Solo se recalcula cuando el usuario cambia
  );

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};