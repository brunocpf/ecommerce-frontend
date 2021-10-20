import { useForm } from 'react-hook-form';
import { SearchIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import useQuerySearch from './useQuerySearch';
import useQueryString from 'util/useQueryString';

export interface SearchBarProps {}

type SearchFormValues = {
  search: string;
};

const SearchBar: React.FC<SearchBarProps> = () => {
  const { push, query } = useRouter();
  const filters = useQueryString('filters');

  const defaultValues = useQuerySearch();

  const { register, handleSubmit } = useForm<SearchFormValues>({
    defaultValues,
  });

  const onSubmit = (d: SearchFormValues) => {
    const encodedSearch = encodeURIComponent(d.search);

    push('/produtos', {
      query: {
        ...query,
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
      className="w-full max-w-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex focus-within:ring-2 focus-within:ring-gray-500 bg-gray-100 rounded-xl">
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
        <button
          className="bg-transparent w-auto flex justify-end items-center text-gray-500 p-2 hover:text-gray-400"
          type="submit"
        >
          <SearchIcon className="h-6 w-6" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
