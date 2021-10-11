import { useRouter } from 'next/dist/client/router';
import BottomNavIcon from './BottomNavIcon';
import {
  HomeIcon as OutlineHomeIcon,
  BookmarkIcon as OutlineBookmarkIcon,
  DotsHorizontalIcon as OutlineDotsHorizontalIcon,
} from '@heroicons/react/outline';
import {
  HomeIcon as SolidHomeIcon,
  BookmarkIcon as SolidBookmarkIcon,
  DotsHorizontalIcon as SolidDotsHorizontalIcon,
} from '@heroicons/react/solid';
import { AnimatePresence, motion } from 'framer-motion';

const Layout: React.FC = ({ children }) => {
  const { asPath } = useRouter();

  const isCurrentPath = (link: string) =>
    link === '/' ? link === asPath : asPath.startsWith(link);

  return (
    <div className="w-screen h-screen flex flex-col">
      <motion.main className="w-full flex-1 overflow-y-auto overflow-x-hidden relative mb-16">
        <AnimatePresence exitBeforeEnter initial={false}>
          {children}
        </AnimatePresence>
      </motion.main>
      <nav className="w-full h-16 shadow-2xl bg-gray-800 z-10 px-8 flex gap-4 overflow-hidden fixed bottom-0">
        <BottomNavIcon
          label="Início"
          active={isCurrentPath('/')}
          link="/"
          icon={
            <OutlineHomeIcon
              className="ring-current iconShadow"
              width={32}
              height={32}
            />
          }
          activeIcon={
            <SolidHomeIcon
              className="ring-current iconShadow"
              width={32}
              height={32}
            />
          }
        />
        <BottomNavIcon
          label="Favoritos"
          link="/favorites"
          active={isCurrentPath('/favorites')}
          icon={
            <OutlineBookmarkIcon
              className="ring-current iconShadow"
              width={32}
              height={32}
            />
          }
          activeIcon={
            <SolidBookmarkIcon
              className="ring-current iconShadow"
              width={32}
              height={32}
            />
          }
        />
        <BottomNavIcon
          label="Opções"
          link="/options"
          active={isCurrentPath('/options')}
          icon={
            <OutlineDotsHorizontalIcon
              className="ring-current iconShadow"
              width={32}
              height={32}
            />
          }
          activeIcon={
            <SolidDotsHorizontalIcon
              className="ring-current iconShadow"
              width={32}
              height={32}
            />
          }
        />
      </nav>
    </div>
  );
};

export default Layout;
