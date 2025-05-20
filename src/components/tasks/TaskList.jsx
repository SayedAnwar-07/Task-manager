import { useContext } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import {  FaSpinner, FaCheck, FaTimes } from "react-icons/fa";
import { IoTimerOutline } from "react-icons/io5";
import { TaskContext } from "../../context/TaskContext";
import TaskItem from "./TaskItem";
import Sheet from "../ui/Sheet";
import TaskForm from "./TaskForm";
import dayjs from "dayjs";

const TaskList = () => {
  const {
    getFilteredTasks,
    isModalOpen,
    setIsModalOpen,
    setCurrentTask,
    activeView,
    setActiveView,
  } = useContext(TaskContext);

  const tasks = getFilteredTasks();
  const today = dayjs().startOf("day");

  const todayTasks = tasks.filter((task) =>
    dayjs(task.dueDate).isSame(today, "day")
  );

  const upcomingTasks = tasks.filter((task) =>
    dayjs(task.dueDate).isAfter(today, "day")
  );

  const previousTasks = tasks.filter((task) =>
    dayjs(task.dueDate).isBefore(today, "day")
  );

  const statusTasks = tasks.filter((task) => task.status === activeView);

  const statusItems = [
    { id: "all", label: "All", icon: null },
    {
      id: "pending",
      label: "Pending",
      icon: <IoTimerOutline className="text-yellow-400" />,
    },
    {
      id: "ongoing",
      label: "On going",
      icon: <FaSpinner className="text-blue-400 animate-spin" />,
    },
    {
      id: "completed",
      label: "Completed",
      icon: <FaCheck className="text-green-400" />,
    },
    {
      id: "cancelled",
      label: "Cancelled",
      icon: <FaTimes className="text-red-400" />,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 hover:bg-yellow-500/15 text-yellow-100 border-l-4 border-yellow-400 shadow-lg shadow-yellow-500/5";
      case "ongoing":
        return "bg-blue-500/10 hover:bg-blue-500/15 text-blue-100 border-l-4 border-blue-400 shadow-lg shadow-blue-500/5";
      case "completed":
        return "bg-green-500/10 hover:bg-green-500/15 text-green-100 border-l-4 border-green-400 shadow-lg shadow-green-500/5";
      case "cancelled":
        return "bg-red-500/10 hover:bg-red-500/15 text-red-100 border-l-4 border-red-400 shadow-lg shadow-red-500/5";
      default:
        return "bg-gray-700/50 hover:bg-gray-700/70 text-gray-200 border-l-4 border-gray-500";
    }
  };

  const renderTaskSection = (title, taskList) => (
    <div className="space-y-4 mb-8">
      <div className="flex items-center gap-3">
        <h4 className="text-xl font-bold text-white">{title}</h4>
        <span className="px-2 py-1 bg-gray-700/50 rounded-full text-xs font-medium text-gray-300">
          {taskList.length}
        </span>
      </div>
      {taskList.length === 0 ? (
        <div className="p-6 rounded-xl bg-gray-800/30 border border-dashed border-gray-700 text-center">
          <p className="text-gray-400">No tasks found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {taskList.map((task) => (
            <div
              key={task.id}
              className={`relative rounded-xl transition-all duration-200 ${getStatusColor(
                task.status
              )}`}
            >
              <TaskItem
                task={task}
                onEdit={() => {
                  setCurrentTask(task);
                  setIsModalOpen(true);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    if (["pending", "ongoing", "completed", "cancelled"].includes(activeView)) {
      const statusLabel =
        activeView.charAt(0).toUpperCase() + activeView.slice(1);
      return renderTaskSection(`${statusLabel} Tasks`, statusTasks);
    }
    switch (activeView) {
      case "today":
        return renderTaskSection("Today's Tasks", todayTasks);
      case "upcoming":
        return renderTaskSection("Upcoming Tasks", upcomingTasks);
      case "previous":
        return renderTaskSection("Previous Tasks", previousTasks);
      default:
        return (
          <>
            {renderTaskSection("Today's Tasks", todayTasks)}
            {renderTaskSection("Upcoming Tasks", upcomingTasks)}
            {renderTaskSection("Previous Tasks", previousTasks)}
          </>
        );
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header with filters and add button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="w-full overflow-x-auto pb-2">
              <div className="flex gap-2 min-w-max">
                {statusItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    className={`flex items-center cursor-pointer gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeView === item.id
                        ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-600/20"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {item.icon && <span className="text-sm">{item.icon}</span>}
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setCurrentTask(null);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-green-600/20 hover:shadow-green-600/30 whitespace-nowrap"
            >
              <span>New Task</span>
              <BsFillPlusCircleFill className="text-lg" />
            </button>
          </div>

          {/* Main content */}
          <div className="mt-6">{renderContent()}</div>
        </div>
      </div>

      {/* Modal Sheet for TaskForm */}
      <Sheet
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Task Details"
      >
        <TaskForm />
      </Sheet>
    </>
  );
};

export default TaskList;
