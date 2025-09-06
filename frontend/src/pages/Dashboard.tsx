import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import type { Note } from "../types/Notas";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
        <p>This is your dashboard where you can manage your notes and settings.</p>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
