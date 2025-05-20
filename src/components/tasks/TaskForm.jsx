import React, { useState, useContext } from "react";
import { TaskContext } from "../../context/TaskContext";
import Button from "../ui/Button";
import CheckBox from "../ui/CheckBox";
import {
  FaExclamationCircle,
  FaCalendarAlt,
  FaAlignLeft,
  FaFlag,
  FaListUl,
} from "react-icons/fa";

const TaskForm = () => {
  const { addTask, updateTask, currentTask, setCurrentTask, setIsModalOpen } =
    useContext(TaskContext);
  const [task, setTask] = useState(
    currentTask || {
      title: "",
      category: "today",
      priority: "medium",
      dueDate: "",
      dueTime: "",
      important: false,
    }
  );

  const priorityOptions = [
    { value: "high", label: "High", color: "text-red-500" },
    { value: "medium", label: "Medium", color: "text-yellow-500" },
    { value: "low", label: "Low", color: "text-green-500" },
  ];

  const categoryOptions = [
    { value: "today", label: "Today" },
    { value: "upcoming", label: "Upcoming" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentTask) {
      updateTask(task);
    } else {
      addTask(task);
    }
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  return (
    <section className="p-1">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Title */}
          <div className="col-span-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-emerald-500">
                <FaAlignLeft />
              </div>
              <input
                type="text"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                className="bg-gray-800 border border-gray-700 text-gray-100 text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 p-3 placeholder-gray-500"
                required
                placeholder="Enter task title"
              />
            </div>
          </div>

          {/* Category and Priority Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300 flex items-center">
                <FaListUl className="mr-2 text-emerald-500" />
                Category
              </label>
              <div className="relative">
                <select
                  value={task.category}
                  onChange={(e) =>
                    setTask({ ...task, category: e.target.value })
                  }
                  className="bg-gray-800 border border-gray-700 text-gray-100 text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block w-full p-3 appearance-none"
                >
                  {categoryOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-gray-800"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Priority */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300 flex items-center">
                <FaFlag className="mr-2 text-emerald-500" />
                Priority
              </label>
              <div className="relative">
                <select
                  value={task.priority}
                  onChange={(e) =>
                    setTask({ ...task, priority: e.target.value })
                  }
                  className="bg-gray-800 border border-gray-700 text-gray-100 text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block w-full p-3 appearance-none"
                >
                  {priorityOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className={`${option.color} bg-gray-800`}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Date and Time Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Due Date */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300 flex items-center">
                <FaCalendarAlt className="mr-2 text-emerald-500" />
                Due Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  type="date"
                  value={task.dueDate ? task.dueDate.split("T")[0] : ""}
                  onChange={(e) =>
                    setTask({ ...task, dueDate: e.target.value })
                  }
                  className="bg-gray-800 border border-gray-700 text-gray-100 text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 p-3"
                />
              </div>
            </div>

            {/* Due Time */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Due Time
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <input
                  type="time"
                  value={task.dueTime || ""}
                  onChange={(e) =>
                    setTask({ ...task, dueTime: e.target.value })
                  }
                  className="bg-gray-800 border border-gray-700 text-gray-100 text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 p-3"
                />
              </div>
            </div>
          </div>

          {/* Important Checkbox */}
          <div className="flex items-center p-3 rounded-lg border border-gray-700 bg-gray-800/50 hover:bg-gray-800 transition-colors">
            <CheckBox
              id="important"
              checked={task.important}
              onChange={(e) =>
                setTask({ ...task, important: e.target.checked })
              }
            >
              <span className="text-sm font-medium text-gray-200 ml-2">
                Mark as important
              </span>
            </CheckBox>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-2">
            <Button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-3 shadow-md cursor-pointer bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-700/50 transition-colors rounded-lg w-1/2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-6 py-3 shadow-md cursor-pointer bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-medium rounded-lg w-1/2 transition-all hover:shadow-emerald-500/20"
            >
              {currentTask ? "Update Task" : "Add Task"}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default TaskForm;
