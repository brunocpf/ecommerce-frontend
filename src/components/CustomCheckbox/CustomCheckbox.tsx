import React from 'react';

export interface CustomCheckboxProps extends React.ComponentProps<'input'> {}

const CustomCheckbox = React.forwardRef<HTMLInputElement, CustomCheckboxProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <input
        className={`text-indigo-500 focus:ring-indigo-400 focus:ring-opacity-25 border border-gray-300 rounded ${className}`}
        ref={ref}
        type="checkbox"
        {...rest}
      />
    );
  },
);

CustomCheckbox.displayName = 'CustomCheckbox';

export default CustomCheckbox;
