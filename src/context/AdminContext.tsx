import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AdminContextType {
  isAdminAuthenticated: boolean;
  loginAdmin: (token: string) => void;
  logoutAdmin: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      setIsAdminAuthenticated(true);
    }
  }, []);

  const loginAdmin = (token: string) => {
    localStorage.setItem("admin_token", token);
    setIsAdminAuthenticated(true);
  };

  const logoutAdmin = () => {
    localStorage.removeItem("admin_token");
    setIsAdminAuthenticated(false);
  };

  return (
    <AdminContext.Provider value={{ isAdminAuthenticated, loginAdmin, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin debe usarse dentro de AdminProvider");
  return context;
};
