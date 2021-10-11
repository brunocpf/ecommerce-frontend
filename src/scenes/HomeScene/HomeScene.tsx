import Container from 'components/Container';
import { BarList } from 'features/barList';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
  FilterIcon as OutlineFilterIcon,
  LocationMarkerIcon as OutlineLocationMarkerIcon,
} from '@heroicons/react/outline';
import { FilterIcon as SolidFilterIcon } from '@heroicons/react/solid';
// import useSWR from 'swr';
// import useBars from 'api/useBars';
// import useCurrentPosition from 'util/useCurrentPosition';

export interface HomeSceneProps {}

function scrollPositionIsTop(value: number) {
  return value <= 0;
}

const HomeScene: React.FC<HomeSceneProps> = () => {
  const [top, setTop] = useState(false);
  const [filtered, setFiltered] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  // const currentPosition = useCurrentPosition();
  // const { data } = useBars(currentPosition, 5000);

  console.log('home screen');

  useEffect(() => {
    setTop(scrollPositionIsTop(contentRef.current?.scrollTop ?? 0));
  }, []);

  const handleScroll = (event: any) => {
    setTop(scrollPositionIsTop(event.target.scrollTop ?? 0));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={contentRef}
      className="w-full h-full overflow-y-auto overflow-x-hidden"
      onScroll={handleScroll}
    >
      <motion.header
        className={`w-full transition-all py-4 bg-gray-800 top-0 sticky z-10`}
      >
        <Container className="w-full flex flex-col">
          <div className="flex justify-between">
            <div></div>
            <div className="flex gap-2">
              <button
                onClick={() => setFiltered(f => !f)}
                className="relative rounded-full iconButton highlightCurrent text-violet-500 active:text-violet-300 transition-all"
              >
                <OutlineFilterIcon
                  className={`transition-all ring-current iconShadow ${
                    top ? 'h-8 w-8' : 'h-6 w-6'
                  }`}
                />
                <motion.div
                  animate={{ opacity: filtered ? 1 : 0 }}
                  transition={{
                    ease: filtered ? 'easeOut' : 'easeIn',
                    duration: 0.1,
                  }}
                  className="absolute inset-0"
                >
                  <SolidFilterIcon
                    className={`transition-all ring-current iconShadow ${
                      top ? 'h-8 w-8' : 'h-6 w-6'
                    }`}
                  />
                </motion.div>
              </button>
              <button className="relative rounded-full iconButton highlightCurrent text-violet-500 active:text-violet-300 transition-all">
                <OutlineLocationMarkerIcon
                  className={`transition-all ring-current iconShadow ${
                    top ? 'h-8 w-8' : 'h-6 w-6'
                  }`}
                />
              </button>
            </div>
          </div>
          <div>
            <AnimatePresence>
              {top && (
                <motion.h1
                  className="font-bold text-2xl"
                  exit={{ opacity: 0, height: 0, fontSize: 0 }}
                >
                  Bares
                </motion.h1>
              )}
            </AnimatePresence>
          </div>
        </Container>
      </motion.header>
      <div className="w-full py-4">
        <BarList />
      </div>
    </motion.div>
  );
};

export default HomeScene;
