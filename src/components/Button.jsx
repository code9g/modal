import clsx from "clsx";
import PropTypes from "prop-types";

const styles = {
  default: "bg-blue-700  text-white hover:bg-blue-800  focus:ring-blue-300",
  outline:
    "bg-transparent  text-blue-700 hover:border-blue-800 focus:ring-blue-300",
};

function Button({
  className,
  type = "button",
  variant = "default",
  children,
  ...rest
}) {
  return (
    <button
      type={type}
      className={clsx(
        "rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4 sm:w-auto",
        className,
        styles[variant] ?? null
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.any,
  type: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.any,
};

export default Button;
