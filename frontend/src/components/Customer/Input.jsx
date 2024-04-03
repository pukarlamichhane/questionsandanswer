

// eslint-disable-next-line react/prop-types
const Input = ({  value, title, name, color }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <input type="radio" value={value} name={name} />
      <span className={`w-5 h-5 rounded-full mr-2 ${color}`}></span>
      {title}
    </label>
  );
};

export default Input;
