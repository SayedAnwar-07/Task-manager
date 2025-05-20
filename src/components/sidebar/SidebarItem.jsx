import React from "react";

const SidebarItem = ({ icon, label, active, onClick }) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors duration-150 ${
          active
            ? "text-green-100 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
            : "text-gray-100 hover:bg-gray-600"
        }`}
      >
        <span className="mr-3 text-lg">{icon}</span>
        <span className="text-sm">{label}</span>
      </button>
    </li>
  );
};

export default SidebarItem;
