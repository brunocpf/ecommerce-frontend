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

function ButtonBase<T extends React.ElementType = 'button'>(
  { className, component, ...rest }: ButtonBaseProps<T, { component?: T }>,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const Component = component ?? 'button';

  return (
    <Component
      className={`${classnames(
        'active:opacity-80',
        'hover:opacity-50',
        'transition-opacity',
        'disabled:opacity-40',
      )} ${className ?? ''}`}
      {...rest}
      ref={ref}
    />
  );
}

export default React.forwardRef(ButtonBase) as <
  T extends React.ElementType = 'button',
>(
  props: ButtonBaseProps<
    T,
    {
      component?: T | undefined;
    }
  >,
) => JSX.Element;
