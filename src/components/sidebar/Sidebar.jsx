import { useContext } from "react";
import { FaList } from "react-icons/fa";
import { RxLapTimer } from "react-icons/rx";
import { AiOutlineStepBackward } from "react-icons/ai";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { TaskContext } from "../../context/TaskContext";
import SidebarItem from "./SidebarItem";

const Sidebar = ({ isOpen, onClose }) => {
  const { activeView, setActiveView } = useContext(TaskContext);

  const mainItems = [
    { id: "all", label: "All Tasks", icon: <FaList /> },
    { id: "today", label: "Today", icon: <RxLapTimer /> },
    { id: "upcoming", label: "Upcoming", icon: <MdOutlineSystemUpdateAlt /> },
    { id: "previous", label: "Previous", icon: <AiOutlineStepBackward /> },
    {
      id: "https://weatherapp-zephyr.netlify.app",
      label: "Weather Report",
      icon: <TiWeatherWindyCloudy />,
    },
  ];

  return (
    <div
      className={`bg-[#0b1023] text-white shadow-md h-full z-50 transform transition-transform duration-300
        fixed md:relative top-0 left-0 w-64 p-6 border-r border-gray-800
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
    >
      {/* Close button (mobile only) */}
      <div className="md:hidden flex justify-end mb-4">
        <button
          onClick={onClose}
          className="text-white hover:text-gray-400 text-xl"
        >
          ✕
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-6">Tasks</h2>

      <p className="mb-2 text-sm font-medium">Time Filters</p>
      <div className="mb-6">
        <ul className="space-y-1">
          {mainItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeView === item.id}
              onClick={() => {
                if (item.id.startsWith("http")) {
                  window.open(item.id, "_blank");
                } else {
                  setActiveView(item.id);
                  onClose();
                }
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
