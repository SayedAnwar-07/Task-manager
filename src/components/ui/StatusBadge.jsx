import React from "react";

const statusColors = {
  ongoing: "bg-gray-600 text-white",
  completed: "bg-green-600 text-white",
  cancelled: "bg-red-600 text-white",
  pending: "bg-yellow-600 text-white",
};

const StatusBadge = ({ status = "ongoing" }) => {
  const key = status.toLowerCase();
  return (
    <span
      className={`px-2 py-1 text-xs rounded-full font-semibold ${
        statusColors[key] || "bg-gray-500 text-white"
      }`}
    >
      {status.replace("-", " ")}
    </span>
  );
};

export default StatusBadge;
