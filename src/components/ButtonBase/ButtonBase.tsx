import { OverrideProps } from 'components/OverridableComponent';
import React from 'react';
import { classnames } from 'tailwindClassNames';

export interface ButtonBaseTypeMap<P, D extends React.ElementType> {
  props: P & {};
  defaultComponent: D;
}

export type ButtonBaseProps<
  D extends React.ElementType = 'button',
  P = {},
> = OverrideProps<ButtonBaseTypeMap<P, D>, D>;

function ButtonBase<T extends React.ElementType = 'button'>({
  className,
  component = 'button',
  ...rest
}: ButtonBaseProps<T, {}>) {
  const Component = component;

  return (
    <Component
      className={`${classnames(
        'active:opacity-80',
        'hover:opacity-50',
        'transition-opacity',
        'disabled:opacity-40',
      )} ${className ?? ''}`}
      {...rest}
    />
  );
}

export default ButtonBase;
