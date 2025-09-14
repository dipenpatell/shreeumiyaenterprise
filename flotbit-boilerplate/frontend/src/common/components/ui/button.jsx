
export const Button = ({ type="button", variant="default", label, style = {}, className, onclick }) => {
  return (
    <button
      className={ 
        `${variant === "default" && " fb-normal-btn" }
        ${variant === "primary" && " fb-primary-btn" }
        ${" cursor-pointer "}` +
        className
      }
      style={{ ...style }}
      onClick={onclick}
      type={type}
    >
      {label}
    </button>
  );
}