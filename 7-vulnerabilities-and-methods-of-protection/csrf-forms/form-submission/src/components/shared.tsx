import React from "react";

export const Button1 = React.forwardRef(
  (
    props:
      | undefined
      | { children: JSX.Element | string }
      | React.ButtonHTMLAttributes<HTMLButtonElement>,
    ref: React.Ref<HTMLButtonElement> | null
  ) => {
    let children,
      attributes = undefined;
    if (props) {
      const { children: childrenDest, ...attrs } = props;
      children = childrenDest;
      attributes = attrs;
    }

    return (
      <button
        className="
          text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
          focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center 
          dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        ref={ref}
        {...attributes}
      >
        {children}
      </button>
    );
  }
);

Button1.displayName = "Button1";

export const Input1 = React.forwardRef(
  (
    props:
      | undefined
      | { children: JSX.Element | string }
      | React.InputHTMLAttributes<HTMLInputElement>,
    ref: React.Ref<HTMLInputElement> | null
  ) => {
    let children,
      attributes = undefined;
    if (props) {
      const { children: childrenDest, ...attrs } = props;
      children = childrenDest;
      attributes = attrs;
    }

    return (
      <input
        ref={ref}
        className="
        bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...attributes}
      >
        {children}
      </input>
    );
  }
);

Input1.displayName = "Input1";

export const Label1 = React.forwardRef(
  (
    props:
      | undefined
      | { children: JSX.Element | string }
      | React.LabelHTMLAttributes<HTMLLabelElement>,
    ref: React.Ref<HTMLLabelElement> | null
  ) => {
    let children,
      attributes = undefined;

    if (props) {
      const { children: childrenDest, ...attrs } = props;
      children = childrenDest;
      attributes = attrs;
    }

    return (
      <label
        ref={ref}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        {...attributes}
      >
        {children}
      </label>
    );
  }
);

Label1.displayName = "Label1";

export const Checkbox1 = React.forwardRef(
  (
    props:
      | undefined
      | { children: JSX.Element | string }
      | React.InputHTMLAttributes<HTMLInputElement>,
    ref: React.Ref<HTMLInputElement> | null
  ) => {
    let children,
      attributes = undefined;

    if (props) {
      const { children: childrenDest, ...attrs } = props;
      children = childrenDest;
      attributes = attrs;
    }

    return (
      <input
        ref={ref}
        type="checkbox"
        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 
        dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 
          dark:focus:ring-offset-gray-800"
        {...attributes}
      >
        {children}
      </input>
    );
  }
);

Checkbox1.displayName = "Checkbox1";
