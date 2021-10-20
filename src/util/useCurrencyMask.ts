import { useEffect, useRef } from 'react';
import Inputmask from 'inputmask';
import { UseFormRegister } from 'react-hook-form';

function useCurrencyMask<TFormValues>(
  register: UseFormRegister<TFormValues>,
  options: Inputmask.Options,
) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!ref.current && !register) return;

    Inputmask({
      ...options,
      alias: 'currency',
      numericInput: true,
    }).mask(ref.current!);

    register(ref.current as any);
  }, [register, options]);

  return ref;
}

export default useCurrencyMask;
