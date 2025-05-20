import { useContext } from "react";
import StatusCard from "../ui/StatusCard";
import { TaskContext } from "../../context/TaskContext";

const TaskStats = () => {
  const { getTasksByStatus } = useContext(TaskContext);

  const stats = [
    { title: "Pending", color: "#facc15", status: "pending" },
    { title: "In Progress", color: "#4a5565", status: "ongoing" },
    { title: "Completed", color: "#4ade80", status: "completed" },
    { title: "Cancelled", color: "#e7000b", status: "cancelled" },
  ];

  return (
    <div className="grid grid-cols-2 gap-6 mt-10">
      {stats.map(({ title, color, status }) => (
        <StatusCard
          key={status}
          title={title}
          color={color}
          count={getTasksByStatus(status).length}
        />
      ))}
    </div>
  );
};

export default TaskStats;
