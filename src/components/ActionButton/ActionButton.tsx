import ButtonBase from 'components/ButtonBase';
import { OverrideProps } from 'components/OverridableComponent';
import React from 'react';
import { classnames } from 'tailwindClassNames';

export interface ActionButtonTypeMap<P, D extends React.ElementType> {
  props: P & {
    variant?: 'primary' | 'secondary' | 'default' | 'error';
  };
  defaultComponent: D;
}

export type ActionButtonProps<
  D extends React.ElementType = 'button',
  P = {},
> = OverrideProps<ActionButtonTypeMap<P, D>, D>;

function ActionButton<T extends React.ElementType = 'button'>(
  {
    variant = 'default',
    className,
    ...rest
  }: ActionButtonProps<T, { component?: T }>,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const classes = {
    ['primary']: classnames('text-white', 'bg-blue-700'),
    ['secondary']: classnames(
      'text-indigo-900',
      'border-gray-300',
      'border-2',
      'font-bold',
      'bg-gray-200',
    ),
    ['error']: classnames('text-white', 'bg-red-500'),
    ['default']: classnames('text-white', 'bg-gray-400'),
  }[variant];

  return (
    <ButtonBase
      className={`rounded px-4 py-2 ${classes} ${className ?? ''}`}
      {...rest}
      ref={ref}
    />
  );
}

export default React.forwardRef(ActionButton) as <
  T extends React.ElementType = 'button',
>(
  props: ActionButtonProps<
    T,
    {
      component?: T;
    }
  >,
) => JSX.Element;
