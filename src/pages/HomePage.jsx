import { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import TaskList from "../components/tasks/TaskList";
import CalendarView from "../components/calendar/CalendarView";
import { FaBars } from "react-icons/fa";
import TaskStats from "../components/tasks/TaskStats";

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex w-full min-h-screen bg-[#0b1023]">
      {/* Sidebar - hidden on small, fixed on md+ */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Overlay when drawer is open on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Menu Button */}
        <div className="p-4 md:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-white text-2xl"
          >
            <FaBars />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 p-4 md:p-8 gap-6">
          <div className="md:col-span-3">
            <TaskList />
          </div>
          <div>
            <CalendarView />
            <TaskStats />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
