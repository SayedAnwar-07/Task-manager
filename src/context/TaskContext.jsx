import { createContext, useState, useEffect } from "react";
import { isToday, isAfter, parseISO, isYesterday } from "date-fns";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error("Failed to parse tasks from localStorage", error);
      return [];
    }
  });

  const [activeView, setActiveView] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks to localStorage", error);
    }
  }, [tasks]);

  const addTask = (task) => {
    if (!task.title) return;

    setTasks([
      ...tasks,
      {
        ...task,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        important: task.important || false,
        status: task.status || "pending",
      },
    ]);
  };

  const updateTask = (updatedTask) => {
    if (!updatedTask.id) return;

    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleImportant = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, important: !task.important } : task
      )
    );
  };

  const getTodayTasks = () => {
    return tasks.filter(
      (task) => task.dueDate && isToday(parseISO(task.dueDate))
    );
  };

  const getUpcomingTasks = () => {
    return tasks.filter(
      (task) =>
        task.dueDate &&
        isAfter(parseISO(task.dueDate), new Date()) &&
        !isToday(parseISO(task.dueDate))
    );
  };

  const getPreviousDayTasks = () => {
    return tasks.filter(
      (task) => task.dueDate && isYesterday(parseISO(task.dueDate))
    );
  };

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  const getFilteredTasks = () => {
    switch (activeView) {
      case "today":
        return getTodayTasks();
      case "upcoming":
        return getUpcomingTasks();
      case "previous":
        return getPreviousDayTasks();
      default:
        return tasks;
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleImportant,
        getTodayTasks,
        getUpcomingTasks,
        getPreviousDayTasks,
        getTasksByStatus,
        getFilteredTasks,
        activeView,
        setActiveView,
        isModalOpen,
        setIsModalOpen,
        currentTask,
        setCurrentTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
