import React from 'react';
import { classnames } from 'tailwindClassNames';

export type TextInputProps = {
  error?: boolean;
} & React.ComponentProps<'input'>;

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <input
        className={`${classnames(
          'p-3',
          'rounded',
          'ring-2',
          'border-none',
          'focus:ring-2',
          'focus:ring-indigo-500',
          'focus:outline-none',
          {
            ['ring-red-500']: error,
            ['ring-gray-300']: !error,
          },
        )} ${className ?? ''}`}
        {...props}
        ref={ref}
      />
    );
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;
