import clsx from "clsx";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import nanoid from "../utils/nanoid";

const name = "signup";

const SignInForm = forwardRef(
  (
    {
      credentials = { email: "", password: "" },
      className,
      onSubmit,
      onCancel,
    },
    ref
  ) => {
    const id = nanoid(8);

    const handleSubmit = (e) => {
      e.preventDefault();
      const credentials = {
        email: e.target["email"].value,
        password: e.target["password"].value,
      };
      console.log("SignUpForm: Submit");
      onSubmit(credentials);
    };

    const handleCancel = (e) => {
      e.preventDefault();
      console.log("SignUpform: Cancel");
      onCancel();
    };

    return (
      <form
        ref={ref}
        id={`${name}-${id}`}
        name={name}
        className={clsx("w-1/3 rounded-xl bg-white p-4 shadow", className)}
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="mb-4 text-3xl font-semibold">Sign Up</h2>
        <div className="mb-5">
          <label
            htmlFor={`email-${id}`}
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id={`email-${id}`}
            name="email"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Your address email"
            defaultValue={credentials.email}
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor={`password-${id}`}
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id={`password-${id}`}
            name="password"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            defaultValue={credentials.password}
            placeholder="Your password"
            required
          />
        </div>
        <div className="mb-5 flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="size-4 rounded border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
        <div className="flex items-center justify-end gap-4">
          <button
            type="submit"
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
          <button
            type="button"
            className="rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-black hover:border-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }
);

SignInForm.displayName = "SignUpForm";

SignInForm.propTypes = {
  credentials: PropTypes.objectOf({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  className: PropTypes.any,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default SignInForm;
