import { useRouter } from 'next/router';
import useQuerySort, { SortType } from './useQuerySort';
import useQueryString from 'util/useQueryString';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline';
import { Fragment } from 'react';

export interface SortButtonProps {}

const dropdownValues: { value: SortType; label: string }[] = [
  { value: 'name:asc', label: 'Nome' },
  { value: 'price:asc', label: 'Preço ↑' },
  { value: 'price:desc', label: 'Preço ↓' },
  { value: 'updatedAt:desc', label: 'Novos' },
];

const SortButton: React.FC<SortButtonProps> = () => {
  const { push, query } = useRouter();
  const filters = useQueryString('filters');
  const search = useQueryString('search');

  const value = useQuerySort();

  const onChange = (sort: SortType) => {
    push({
      pathname: '/produtos',
      query: {
        ...query,
        search,
        filters,
        sort,
      },
    });
  };

  return (
    <Listbox value={value ?? 'updatedAt:asc'} onChange={onChange}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-auto py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
          <span className="block truncate">
            Ordenar por: {dropdownValues.find(v => v.value === value)?.label}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon className="w-5 h-5 text-gray-400" />
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {dropdownValues.map(d => (
              <Listbox.Option
                key={d.value}
                value={d.value}
                className={({ active }) =>
                  `${active ? 'text-indigo-900 bg-indigo-100' : 'text-gray-900'}
                    cursor-default select-none relative py-2 pl-10 pr-4`
                }
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`${
                        selected ? 'font-medium' : 'font-normal'
                      } block truncate`}
                    >
                      Ordenar por: {d.label}
                    </span>
                    {selected ? (
                      <span
                        className={`${
                          active ? 'text-blue-600' : 'text-blue-600'
                        }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                      >
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default SortButton;
