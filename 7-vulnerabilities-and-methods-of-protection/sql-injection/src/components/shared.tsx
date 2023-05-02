import React from "react";

export const Button1 = React.forwardRef(
  (
    props: undefined | { children: JSX.Element | string },
    ref: React.Ref<HTMLButtonElement> | null
  ) => {
    const { children, ...attrs } = props;
    return (
      <button
        className="
          text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
          focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center 
          dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        ref={ref}
        {...attrs}
      >
        {children}
      </button>
    );
  }
);

Button1.displayName = "Button1";
