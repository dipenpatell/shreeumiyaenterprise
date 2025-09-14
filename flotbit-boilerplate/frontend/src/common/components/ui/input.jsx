export default function InputField({
  type,
  placeholder,
  icon,
  onchange,
  value,
  style,
  className,
  error = "",
  required = false,
}) {
  return (
    <div className={className + " "} style={style}>
      <div className={" fb-normal-input mb-3 flex items-center"}>
        {icon}
        <input
          className="ml-2 w-full py-1"
          value={value}
          type={type}
          placeholder={placeholder}
          onChange={onchange}
          // required={required}
        />
      </div>
      {Boolean(error !== null && error !== "") && <div className="text-right text-red-500">{error}</div>}
    </div>
  );
}
