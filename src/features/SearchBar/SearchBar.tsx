import { useForm } from 'react-hook-form';
import { SearchIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import ActionButton from 'components/ActionButton';
import useQuerySearch from './useQuerySearch';
import useQueryString from 'util/useQueryString';

export interface SearchBarProps {}

type SearchFormValues = {
  search: string;
};

const SearchBar: React.FC<SearchBarProps> = () => {
  const { push } = useRouter();
  const filters = useQueryString('filters');
  const sort = useQueryString('sort');

  const defaultValues = useQuerySearch();

  const { register, handleSubmit, setValue } = useForm<SearchFormValues>({
    defaultValues,
  });

  const onSubmit = (d: SearchFormValues) => {
    const encodedSearch = encodeURIComponent(d.search);

    setValue('search', '');

    push({
      pathname: '/produtos',
      query: {
        sort,
        filters,
        search: encodedSearch,
      },
    });
  };

  return (
    <form
      action="busca"
      role="search"
      noValidate
      className="w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex ring-1 ring-gray-200 focus-within:ring-1 focus-within:ring-blue-500 bg-white rounded w-full">
        <button
          className="bg-transparent w-auto flex justify-end items-center text-orange-500 p-2 hover:text-orange-400"
          type="submit"
        >
          <SearchIcon className="h-6 w-6" />
        </button>
        <input
          className="w-full p-2 outline-none border-none focus:ring-0 bg-transparent"
          type="search"
          placeholder="Buscar..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          maxLength={64}
          enterKeyHint="go"
          {...register('search')}
        />
        <div className="p-1">
          <ActionButton className="text-sm" variant="primary">
            Buscar
          </ActionButton>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
