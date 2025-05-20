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
    { value: "high", label: "High" },
    { value: "medium", label: "Medium", selected: true },
    { value: "low", label: "Low" },
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
    <section>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Title */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-200 mb-1 flex items-center">
              <FaAlignLeft className="mr-2 text-green-600" />
              Title
            </label>
            <input
              type="text"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              className="mt-1 block text-gray-200 w-full rounded-lg border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 py-2 px-3 border"
              required
              placeholder="Enter task title"
            />
          </div>

          {/* Category and Priority Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-1 flex items-center">
                <FaListUl className="mr-2 text-green-600" />
                Category
              </label>
              <select
                value={task.category}
                onChange={(e) => setTask({ ...task, category: e.target.value })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 py-2 px-3 border text-gray-200"
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-1 flex items-center">
                <FaFlag className="mr-2 text-green-600" />
                Priority
              </label>
              <select
                value={task.priority}
                onChange={(e) => setTask({ ...task, priority: e.target.value })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 py-2 px-3 border text-gray-200"
              >
                {priorityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date and Time Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-1 flex items-center">
                <FaCalendarAlt className="mr-2 text-green-600" />
                Due Date
              </label>
              <input
                type="date"
                value={task.dueDate ? task.dueDate.split("T")[0] : ""}
                onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 py-2 px-3 border text-gray-200"
              />
            </div>

            {/* Due Time */}
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-1">
                Due Time
              </label>
              <input
                type="time"
                value={task.dueTime || ""}
                onChange={(e) => setTask({ ...task, dueTime: e.target.value })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 py-2 px-3 border text-gray-200"
              />
            </div>
          </div>

          {/* Important Checkbox */}
          <div className="flex items-center p-3 rounded-lg border border-gray-200">
            <CheckBox
              id="important"
              checked={task.important}
              onChange={(e) =>
                setTask({ ...task, important: e.target.checked })
              }
            >
              <span className="text-sm font-medium text-gray-200">
                Mark as important
              </span>
            </CheckBox>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="submit"
              className="px-6 py-2 shadow-md cursor-pointer bg-green-600 hover:bg-green-700 w-full"
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
