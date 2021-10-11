import { TrashIcon } from '@heroicons/react/outline';
import Container from 'components/Container';
import { BarList } from 'features/barList';
import { useFavorites } from 'features/favorites';
import { motion } from 'framer-motion';
import { useRef } from 'react';

export interface FavoritesSceneProps {}

const FavoritesScene: React.FC<FavoritesSceneProps> = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { setFavorites } = useFavorites();

  const handleClickRemoveFavorites = () => {
    setFavorites([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={contentRef}
      className="w-full h-full overflow-y-auto overflow-x-hidden"
    >
      <Container>
        <div className="my-3">
          <button
            onClick={handleClickRemoveFavorites}
            className="flex gap-1 rounded-md border-violet-500 ring-violet-500 active:bg-violet-500 transition-colors iconShadow ring-current p-2 border-2 border-solid highlightCurrent"
          >
            <TrashIcon className="h-6 w-6" />
            Remover todos os favoritos
          </button>
        </div>
      </Container>
      <div className="w-full py-4">
        <BarList />
      </div>
    </motion.div>
  );
};

export default FavoritesScene;
