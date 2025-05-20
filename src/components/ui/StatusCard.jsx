const StatusCard = ({ title, count, color }) => {
  return (
    <div className="bg-[#1e2939] text-gray-50 rounded-xl shadow-md p-6 flex flex-col justify-between w-full max-w-xs">
      <h4 className="text-gray-300 font-medium">{title}</h4>
      <div className="flex items-center justify-between mt-4">
        <span className="text-3xl font-bold">{count}</span>
        <svg
          width="48"
          height="24"
          viewBox="0 0 48 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 22C8 8 16 8 24 16C32 24 40 24 46 16"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
};

export default StatusCard;
