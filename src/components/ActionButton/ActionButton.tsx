import ButtonBase from 'components/ButtonBase';
import { OverrideProps } from 'components/OverridableComponent';
import React from 'react';
import { classnames } from 'tailwindClassNames';

export interface ActionButtonTypeMap<P, D extends React.ElementType> {
  props: P & {
    variant?: 'primary' | 'secondary' | 'default';
  };
  defaultComponent: D;
}

export type ActionButtonProps<
  D extends React.ElementType = 'button',
  P = {},
> = OverrideProps<ActionButtonTypeMap<P, D>, D>;

function ActionButton<T extends React.ElementType = 'button'>({
  variant = 'default',
  className,
  ...rest
}: ActionButtonProps<T, {}>) {
  const classes = {
    ['primary']: classnames('text-white', 'bg-emerald-500'),
    ['secondary']: classnames(
      'text-emerald-500',
      'bg-white',
      'border-emerald-500',
      'border-2',
    ),
    ['default']: classnames('text-white', 'bg-gray-400'),
  }[variant];

  return (
    <ButtonBase
      className={`rounded-md p-2 ${classes} ${className ?? ''}`}
      {...rest}
    />
  );
}

export default ActionButton;
