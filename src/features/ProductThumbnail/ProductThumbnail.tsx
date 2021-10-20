import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/outline';
import { classnames } from 'tailwindcss-classnames';
import currencyFormatter from 'util/currencyFormatter';

export interface ProductThumbnailProps {
  id: string;
  name: string;
  price: number;
  featured: boolean;
  inStock: boolean;
  brand?: string;
  image: {
    alt: string;
    caption: string;
    url: string;
  };
}

const ProductThumbnail: React.FC<ProductThumbnailProps> = ({
  id,
  name,
  price,
  featured,
  brand,
  image,
  inStock,
}) => {
  return (
    <Link
      href={{
        pathname: '/produtos/[id]',
        query: { id },
      }}
      passHref
    >
      <a className="bg-red-500">
        <div className="relative flex flex-col gap-2 w-full rounded-3xl p-8 border-2 border-gray-200 hover:opacity-50 active:opacity-80 transition-opacity">
          <div className="flex items-center justify-center w-full">
            <div className="w-36 h-36 relative mb-4">
              <Image
                className="pointer-events-none"
                src={image.url}
                alt={image.alt}
                layout="fill"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="text-xs">{brand ?? '-'}</div>
            <p className="text-lg font-bold line-clamp-2">{name}</p>
            <div className="w-full mt-4 flex justify-between gap-2 items-center">
              <div>
                <div className="text-xs text-gray-300">Preço</div>
                <div
                  className={classnames('font-bold', 'relative', {
                    'text-red-500': !inStock,
                    'text-sm': !inStock,
                  })}
                >
                  {inStock ? currencyFormatter.format(price) : 'Indisponível'}
                </div>
              </div>
              <button className="font-semibold text-sm rounded-2xl p-2 border-2 border-gray-200">
                Ver Detalhes
              </button>
            </div>
          </div>
          {featured && (
            <div className="absolute right-4 top-4 flex flex-col items-center text-emerald-500">
              <StarIcon className="h-6 w-6" />
              <span className="text-xs">Destaque</span>
            </div>
          )}
        </div>
      </a>
    </Link>
  );
};

export default ProductThumbnail;
