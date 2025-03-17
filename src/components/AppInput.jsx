import { forwardRef } from "react";

const AppInput = forwardRef(
  ({ type = "input", register, title, error }, ref) => {
    return (
      <div className="flex flex-col gap-1 items-end ">
        <div className="flex flex-col gap-1 w-full">
          <label className="font-semibold capitalize" htmlFor={title}>
            {title}
          </label>
          {type === "textarea" ? (
            <textarea
              // name={title}
              {...register}
              ref={(el) => {
                if (ref) {
                  if (typeof ref === "function") {
                    ref(el);
                  } else {
                    ref.current = el;
                  }
                }
                register?.ref?.(el);
              }}
              className={`border-2  p-2 rounded-md w-full min-h-24 ${
                error
                  ? "focus:border-red-500 border-red-500"
                  : "focus:border-background border-grey-200"
              } focus:outline-none`}
            />
          ) : type === "password" ? (
            <input
              name={title}
              {...register}
              ref={(el) => {
                if (ref) {
                  if (typeof ref === "function") {
                    ref(el);
                  } else {
                    ref.current = el;
                  }
                }
                register?.ref?.(el);
              }}
              className={`border-2  p-2 rounded-md w-full ${
                error
                  ? "focus:border-red-500 border-red-500"
                  : "focus:border-background border-grey-200"
              } focus:outline-none`}
              type={type}
            />
          ) : (
            <input
              name={title}
              {...register}
              ref={(el) => {
                if (ref) {
                  if (typeof ref === "function") {
                    ref(el);
                  } else {
                    ref.current = el;
                  }
                }
                register?.ref?.(el);
              }}
              className={`border-2  p-2 rounded-md w-full ${
                error
                  ? "focus:border-red-500 border-red-500"
                  : "focus:border-background border-grey-200"
              } focus:outline-none`}
              type={type}
            />
          )}
        </div>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
);

export default AppInput;
