import List from 'components/List';
import { useFavorites } from 'features/favorites';
import { useState } from 'react';
import BarThumbnail from './BarThumbnail';

export interface BarListProps {}

type Bar = {
  id: string;
  thumbnailImg: string;
  name: string;
  distance: number;
  openHours?: {
    open: { hour: number; minute: number };
    close: { hour: number; minute: number };
  } | null;
  address: string;
  favorite?: boolean;
};

const dummyBars: Bar[] = [
  {
    id: '0',
    thumbnailImg: '/thumbnails/thumb_correria.jpg',
    name: 'Correria Music Bar',
    distance: 8200,
    openHours: {
      open: { hour: 18, minute: 0 },
      close: { hour: 20, minute: 0 },
    },
    address: 'Belo Horizonte, Cachoeirinha',
  },
  {
    id: '1',
    thumbnailImg: '/thumbnails/thumbnail_2.png',
    name: 'Correria Music Bar',
    distance: 8200,
    openHours: null,
    address: 'Belo Horizonte, Cachoeirinha',
  },
  {
    id: '2',
    thumbnailImg: '/thumbnails/thumb_correria.jpg',
    name: 'Correria Music Bar',
    distance: 8200,
    openHours: {
      open: { hour: 18, minute: 0 },
      close: { hour: 23, minute: 0 },
    },
    address: 'Belo Horizonte, Cachoeirinha',
  },
  {
    id: '3',
    thumbnailImg: '/thumbnails/thumb_correria.jpg',
    name: 'Correria Music Bar',
    distance: 8200,
    openHours: {
      open: { hour: 18, minute: 0 },
      close: { hour: 20, minute: 0 },
    },
    address: 'Belo Horizonte, Cachoeirinha',
  },
  {
    id: '4',
    thumbnailImg: '/thumbnails/thumb_correria.jpg',
    name: 'Correria Music Bar',
    distance: 8200,
    openHours: {
      open: { hour: 18, minute: 0 },
      close: { hour: 20, minute: 0 },
    },
    address: 'Belo Horizonte, Cachoeirinha',
  },
  {
    id: '5',
    thumbnailImg: '/thumbnails/thumb_correria.jpg',
    name: 'Correria Music Bar',
    distance: 8200,
    openHours: {
      open: { hour: 18, minute: 0 },
      close: { hour: 20, minute: 0 },
    },
    address: 'Belo Horizonte, Cachoeirinha',
  },
  {
    id: '6',
    thumbnailImg: '/thumbnails/thumb_correria.jpg',
    name: 'Correria Music Bar',
    distance: 8200,
    openHours: {
      open: { hour: 18, minute: 0 },
      close: { hour: 20, minute: 0 },
    },
    address: 'Belo Horizonte, Cachoeirinha',
  },
  {
    id: '7',
    thumbnailImg: '/thumbnails/thumb_correria.jpg',
    name: 'Correria Music Bar',
    distance: 8200,
    openHours: {
      open: { hour: 18, minute: 0 },
      close: { hour: 20, minute: 0 },
    },
    address: 'Belo Horizonte, Cachoeirinha',
    favorite: false,
  },
  {
    id: '8',
    thumbnailImg: '/thumbnails/thumb_correria.jpg',
    name: 'Correria Music Bar',
    distance: 8200,
    openHours: {
      open: { hour: 18, minute: 0 },
      close: { hour: 20, minute: 0 },
    },
    address: 'Belo Horizonte, Cachoeirinha',
    favorite: true,
  },
];

const BarList: React.FC<BarListProps> = () => {
  const [bars] = useState([...dummyBars]);
  const { favorites, toggleFavorite } = useFavorites();

  const handleClickFavorite = (id: string) => {
    toggleFavorite(id);
  };

  return (
    <List>
      {bars.map(b => (
        <BarThumbnail
          key={b.id}
          barId={b.id.toString()}
          thumbnailImg={b.thumbnailImg}
          distance={b.distance}
          name={b.name}
          openHours={b.openHours}
          address={b.address}
          favorite={favorites.includes(b.id)}
          onClickFavorite={() => handleClickFavorite(b.id)}
        />
      ))}
    </List>
  );
};

export default BarList;
