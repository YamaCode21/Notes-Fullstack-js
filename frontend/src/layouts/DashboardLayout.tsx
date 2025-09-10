import Sidebar from "../components/Sidebar";
import Navbar from "../layouts/Navbar";
import type { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex items-center justify-between h-screen bg-gray-100">
      <Sidebar />
      <div className="bg-gray-900 w-full h-full flex flex-col">
        <Navbar />
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
