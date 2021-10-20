import { FilterOptionsQuery } from 'api';
import { gql, useQuery } from '@apollo/client';
import CustomCheckbox from 'components/CustomCheckbox';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { btoa } from 'isomorphic-base64';
import useQueryFilters from './useQueryFilters';
import { MouseEventHandler } from 'react';
import useQueryString from 'util/useQueryString';

const FILTER_OPTIONS_QUERY = gql`
  query FilterOptionsQuery {
    categories {
      slug
      name
    }
    brands {
      slug
      name
    }
  }
`;

export interface FiltersSelectorProps {}

export type FiltersSelectorOptions = {
  brands?: {
    [key: string]: boolean;
  };
  categories?: {
    [key: string]: boolean;
  };
  maxPrice?: string;
  maxPriceToggle?: boolean;
  showOutOfStockItems?: boolean;
};

const FiltersSelector: React.FC<FiltersSelectorProps> = () => {
  const { data } = useQuery<FilterOptionsQuery>(FILTER_OPTIONS_QUERY);
  const { push, query } = useRouter();
  const search = useQueryString('search');

  const defaultValues = useQueryFilters();

  const { register, handleSubmit, setValue } = useForm<FiltersSelectorOptions>({
    defaultValues,
  });

  const onSubmit = (f: FiltersSelectorOptions) => {
    const encodedFilters = btoa(JSON.stringify(f));

    push('/produtos', {
      query: {
        ...query,
        search,
        filters: encodedFilters,
      },
    });
  };

  const onClear: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();

    setValue('maxPrice', '');
    setValue('maxPriceToggle', false);
    setValue('showOutOfStockItems', false);

    const brands = data?.brands ?? [];
    for (const brand of brands) {
      setValue(`brands.${brand?.slug}`, false);
    }

    const categories = data?.categories ?? [];
    for (const category of categories) {
      setValue(`categories.${category?.slug}`, false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="md:whitespace-nowrap">
        <h5 className="font-bold">Filtros</h5>
        <section className="my-4">
          <h6>Categorias</h6>
          <div className="text-xs flex flex-col gap-1 items-start">
            {data?.categories?.map(c => (
              <div key={c?.slug} className="flex justify-center gap-2">
                <CustomCheckbox
                  id={c?.slug}
                  {...register(`categories.${c?.slug}`)}
                />
                <label htmlFor={c?.slug}>{c?.name}</label>
              </div>
            ))}
          </div>
        </section>
        <section className="my-4">
          <h6>Marcas</h6>
          <div className="text-xs flex flex-col gap-1 items-start">
            {data?.brands?.map(b => (
              <div key={b?.slug} className="flex justify-center gap-2">
                <CustomCheckbox
                  id={b?.slug}
                  {...register(`brands.${b?.slug}`)}
                />
                <label htmlFor={b?.slug}>{b?.name}</label>
              </div>
            ))}
          </div>
        </section>
        <section className="my-4">
          <h6>Preço</h6>
          <div className="text-xs flex flex-col gap-1 items-start">
            <div className="flex justify-center gap-2 items-center">
              <CustomCheckbox id="maxPrice" {...register('maxPriceToggle')} />
              <label className="text-xs" htmlFor="maxPrice">
                Até R$
              </label>
              <input
                className="text-xs focus:ring-emerald-400 focus:ring-opacity-25 focus:ring p-1 focus:outline-none border border-gray-300 rounded"
                type="tel"
                inputMode="numeric"
                min="0.00"
                max="10000.00"
                step="0.01"
                name="maxPrice"
                placeholder="0,00"
              />
            </div>
          </div>
        </section>
        <section className="my-4">
          <div className="text-xs flex flex-col gap-1 items-start">
            <div className="flex justify-center gap-2">
              <CustomCheckbox
                id="showOutOfStockItems"
                {...register('showOutOfStockItems')}
              />
              <label htmlFor="showOutOfStockItems">
                Exibir produtos indisponíveis
              </label>
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-2">
          <button
            className="w-full h-full p-2 rounded text-white bg-gray-400 active:opacity-80 hover:opacity-50 transition-opacity"
            onClick={onClear}
          >
            Limpar Filtros
          </button>
          <button
            className="w-full h-full p-2 rounded text-white bg-emerald-500 active:opacity-80 hover:opacity-50 transition-opacity"
            type="submit"
          >
            Buscar
          </button>
        </div>
      </div>
    </form>
  );
};

export default FiltersSelector;
