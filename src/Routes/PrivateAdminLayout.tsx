// Routes/PrivateAdminLayout.tsx
import HeaderAdmin from "../Admin/Principal/HeaderAdmin";
import { ReactNode } from "react";

const PrivateAdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <HeaderAdmin />
      <main className="pt-16 px-4">{children}</main>
    </>
  );
};

export default PrivateAdminLayout;
