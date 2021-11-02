import { useEffect, useState } from 'react';
import { classnames } from 'tailwindClassNames';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type Promo = {
  image: string;
  subtitle: string;
};

export interface HeroCarouselProps {
  promos: Promo[];
  title?: string;
  delay?: number;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({
  promos,
  delay = 5000,
  title = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % promos.length);
    }, delay);

    return () => clearInterval(interval);
  }, [currentIndex, delay, promos.length]);

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className="flex gap-1 items-center">
          {promos.map((_, i) => (
            <div
              key={i}
              className={classnames(
                'rounded-full',
                'transition-all',
                'cursor-pointer',
                {
                  'h-4': i === currentIndex,
                  'w-4': i === currentIndex,
                  'w-3': i !== currentIndex,
                  'h-3': i !== currentIndex,
                  'bg-orange-500': i === currentIndex,
                  'bg-indigo-800': i !== currentIndex,
                },
              )}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
          <div className="bg-transparent h-4" />
        </div>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
              initial: {
                opacity: 0,
              },
              animate: {
                opacity: 1,
              },
              exit: {
                opacity: 0,
              },
            }}
            key={currentIndex}
            className="flex-1 relative md:hidden"
          >
            <Image
              src={promos[currentIndex].image}
              layout="fill"
              objectFit="contain"
              alt={promos[currentIndex].subtitle}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
        <div className="hidden md:grid grid-cols-3 flex-1 relative">
          {promos.map((p, i) => (
            <motion.div
              initial={i === currentIndex ? 'highlight' : 'normal'}
              animate={i === currentIndex ? 'highlight' : 'normal'}
              variants={{
                highlight: {
                  opacity: 1,
                  scale: 1,
                },
                normal: {
                  opacity: 0.5,
                  scale: 0.5,
                },
              }}
              key={p.image}
              className="flex-1 relative cursor-pointer"
              onClick={() => setCurrentIndex(i)}
            >
              <Image
                src={p.image}
                layout="fill"
                objectFit="contain"
                alt={p.subtitle}
                draggable={false}
              />
            </motion.div>
          ))}
        </div>
        <span className="font-bold text-lg z-10">
          {title} <br />
          <AnimatePresence exitBeforeEnter>
            <motion.span
              initial="initial"
              animate="animate"
              exit="exit"
              variants={{
                initial: {
                  opacity: 0,
                },
                animate: {
                  opacity: 1,
                },
                exit: {
                  opacity: 0,
                },
              }}
              key={currentIndex}
              className="text-orange-500"
            >
              {promos[currentIndex].subtitle}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>
    </>
  );
};

export default HeroCarousel;
