import { useContext, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
  addMonths,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { TaskContext } from "../../context/TaskContext";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

const CalendarView = () => {
  const { tasks } = useContext(TaskContext);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const monthDays = eachDayOfInterval({ start: startDate, end: endDate });

  const getTasksForDay = (day) => {
    return tasks.filter(
      (task) => task.dueDate && isSameDay(parseISO(task.dueDate), day)
    );
  };

  const statusColors = {
    waiting: "bg-green-400",
    "in-progress": "bg-blue-500",
    completed: "bg-green-700",
  };

  const statusCount = (dayTasks, status) => {
    return dayTasks.filter((task) => task.status === status).length;
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(addMonths(currentMonth, direction));
  };

  return (
    <div className="bg-[#1e2939] rounded-2xl p-6 w-full max-w-md mx-auto border border-gray-700 text-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">
          {format(currentMonth, "MMM yyyy")}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => navigateMonth(-1)}
            className="text-green-700 font-bold text-3xl hover:text-green-400 transition-colors"
          >
            <IoIosArrowDropleftCircle />
          </button>
          <button
            onClick={() => navigateMonth(1)}
            className="text-green-700 font-bold text-3xl hover:text-green-400 transition-colors"
          >
            <IoIosArrowDroprightCircle />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-300 mb-2">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-4 text-center text-sm">
        {monthDays.map((day) => {
          const dayTasks = getTasksForDay(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isToday = isSameDay(day, new Date());

          return (
            <div key={day.toISOString()} className="relative">
              <div
                className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full ${
                  isToday
                    ? "bg-green-700 text-white font-bold"
                    : isCurrentMonth
                    ? "text-white hover:bg-gray-600 cursor-pointer"
                    : "text-gray-500"
                } transition-colors`}
              >
                {format(day, "d")}
              </div>

              {/* Task dots */}
              <div className="flex justify-center space-x-1 mt-1">
                {["waiting", "in-progress", "completed"].map(
                  (status) =>
                    statusCount(dayTasks, status) > 0 && (
                      <span
                        key={status}
                        className={`w-1.5 h-1.5 rounded-full ${statusColors[status]}`}
                      />
                    )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
