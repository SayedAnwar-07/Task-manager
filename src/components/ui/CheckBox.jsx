import "../styles/CheckBox.css";

const CheckBox = ({ id, checked, onChange, children }) => {
  return (
    <label
      htmlFor={id}
      className="checkbox-btn relative block pl-[30px] mb-2 cursor-pointer select-none text-gray-800"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="absolute opacity-0 cursor-pointer h-0 w-0"
      />
      <span className="checkmark absolute top-0 left-0 h-[1rem] w-[1rem] border-[2.5px] border-white transition duration-200 linear"></span>
      <div className="ml-2 flex items-center text-sm">{children}</div>
    </label>
  );
};

export default CheckBox;
