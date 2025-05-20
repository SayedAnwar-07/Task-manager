import React, { useContext, useState } from "react";
import { TaskContext } from "../../context/TaskContext";
import StatusBadge from "../ui/StatusBadge";
import {
  IoMdCheckmarkCircleOutline,
  IoMdTime,
  IoMdAlert,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import { RiProgress7Line } from "react-icons/ri";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const TaskItem = ({ task }) => {
  const { setCurrentTask, setIsModalOpen, deleteTask, updateTask } =
    useContext(TaskContext);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const formatTime = (date, time) => {
    if (!date && !time) return "No Due Time";

    if (time) {
      const [hourStr, minuteStr] = time.split(":");
      let hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);
      const ampm = hour >= 12 ? "pm" : "am";
      hour = hour % 12 || 12;
      return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
    }

    const d = new Date(date);
    return d.toLocaleDateString();
  };

  const getPriorityLabel = (priority) => {
    if (!priority) return "No Priority";
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "high":
        return "text-yellow-400 bg-yellow-900 bg-opacity-20";
      case "medium":
        return "text-blue-400 bg-blue-900 bg-opacity-20";
      case "low":
        return "text-gray-400 bg-gray-700";
      default:
        return "text-gray-400 bg-gray-700";
    }
  };

  const statusOptions = ["pending", "ongoing", "completed", "cancelled"];

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <IoMdTime className="text-yellow-500" />;
      case "ongoing":
        return <RiProgress7Line className="text-blue-500" />;
      case "completed":
        return <IoMdCheckmarkCircleOutline className="text-green-500" />;
      case "cancelled":
        return <IoMdCloseCircleOutline className="text-red-500" />;
      default:
        return <IoMdTime className="text-gray-500" />;
    }
  };

  const handleStatusChange = (newStatus) => {
    updateTask({ ...task, status: newStatus });
    setIsStatusDropdownOpen(false);

    if (newStatus === "completed" || newStatus === "cancelled") {
      setCurrentTask({ ...task, status: newStatus });
      setIsModalOpen(false);
    }
  };

  const handleEdit = () => {
    if (task.status === "completed" || task.status === "cancelled") {
      return;
    }
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    deleteTask(task.id);
    setIsDeleteModalOpen(false);
  };

  const renderStatusControls = () => {
    return (
      <div className="relative">
        <button
          onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
          className="focus:outline-none flex items-center cursor-pointer gap-1"
          disabled={task.status === "completed" || task.status === "cancelled"}
        >
          <StatusBadge status={task.status} />
        </button>

        {isStatusDropdownOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-gray-800 rounded-md shadow-lg z-10 border border-gray-700">
            <div className="py-1">
              {statusOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleStatusChange(option)}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center gap-2 cursor-pointer ${
                    task.status === option ? "text-blue-400" : "text-gray-300"
                  }`}
                >
                  {getStatusIcon(option)}
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-4 gap-2 text-sm text-gray-300 py-4 border-b border-gray-700 bg-gray-800 transition-all duration-150 px-4 rounded-md hover:bg-gray-750 flex-wrap">
        {/* Title */}
        <div className="flex items-center gap-2 min-w-[150px] sm:w-auto">
          {getStatusIcon(task.status)}
          <p className="font-medium text-white text-sm sm:text-base break-words">
            {task.title}
          </p>
        </div>

        {/* Priority */}
        <div className="text-xs sm:text-sm">
          <span
            className={`px-2 py-1 rounded-md font-semibold ${getPriorityClass(
              task.priority
            )}`}
          >
            {getPriorityLabel(task.priority)}
          </span>
        </div>

        {/* Due Time */}
        <div className="text-xs sm:text-sm text-gray-400">
          {formatTime(task.dueDate, task.dueTime)}
        </div>

        {/* Due Date */}
        <div className="text-xs sm:text-sm text-gray-400">
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "No Due Date"}
        </div>

        {/* Status */}
        <div className="flex items-center justify-start sm:justify-center gap-2">
          {renderStatusControls()}
        </div>

        {/* Actions */}
        <div className="flex gap-2 justify-end sm:justify-start">
          <button
            onClick={handleEdit}
            disabled={
              task.status === "completed" || task.status === "cancelled"
            }
            className={`p-1 rounded ${
              task.status === "completed" || task.status === "cancelled"
                ? "text-gray-500 cursor-not-allowed"
                : "text-gray-300 hover:text-white hover:bg-gray-700"
            }`}
          >
            <FiEdit2 />
          </button>

          {/* Delete button with modal trigger */}
          <label
            htmlFor={`delete-modal-${task.id}`}
            className="p-1 rounded text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer"
          >
            <FiTrash2 />
          </label>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <input
        type="checkbox"
        id={`delete-modal-${task.id}`}
        className="modal-toggle"
        checked={isDeleteModalOpen}
        onChange={(e) => setIsDeleteModalOpen(e.target.checked)}
      />
      <div className="modal" role="dialog">
        <div className="modal-box bg-gray-800 border border-gray-700">
          <h3 className="text-lg font-bold text-white">Confirm Deletion</h3>
          <p className="py-4 text-gray-300">
            Are you sure you want to delete the task{" "}
            <span className="font-bold">"{task.title}"</span> ? This action
            cannot be undone.
          </p>
          <div className="modal-action">
            <label
              htmlFor={`delete-modal-${task.id}`}
              className="btn btn-outline border-gray-600 hover:bg-gray-700 text-gray-300"
              onClick={(e) => {
                e.preventDefault();
                setIsDeleteModalOpen(false);
              }}
            >
              Cancel
            </label>
            <label
              htmlFor={`delete-modal-${task.id}`}
              className="btn bg-red-600 hover:bg-red-700 border-red-600 text-white"
              onClick={handleDelete}
            >
              Delete
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskItem;
