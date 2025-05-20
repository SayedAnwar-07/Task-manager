import React from "react";
import { TaskProvider } from "../context/TaskContext";
import HomePage from "../pages/HomePage";

const MainLayout = () => {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="flex h-full">
          <HomePage />
        </div>
      </div>
    </TaskProvider>
  );
};

export default MainLayout;
