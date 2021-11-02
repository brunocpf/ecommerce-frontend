import * as React from 'react';
import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from 'popmotion';
import styles from './PhotoGallery.module.css';
import { useEffect } from 'react';

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export interface PhotoGalleryProps {
  images: string[];
  auto?: boolean;
  autoDelay?: number;
  showArrowButtons?: boolean;
  showNavDots?: boolean;
  onClickImage?: (index: number, url: string) => void;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  images,
  auto,
  autoDelay = 5000,
  showArrowButtons = true,
  showNavDots = false,
  onClickImage,
}) => {
  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, images.length, page);

  const paginate = useCallback(
    (newDirection: number) => {
      setPage([page + newDirection, newDirection]);
    },
    [page],
  );

  useEffect(() => {
    if (auto && images.length > 1) {
      const timeout = setTimeout(() => {
        paginate(1);
      }, autoDelay);

      return () => clearTimeout(timeout);
    }
    return;
  }, [auto, autoDelay, images.length, paginate]);

  const ContainerComponent = onClickImage ? 'button' : 'div';

  return (
    <>
      <AnimatePresence initial={false} custom={direction}>
        <ContainerComponent
          className="absolute overflow-hidden active:opacity-80 hover:opacity-50 cursor-pointer transition-opacity w-full max-w-screen h-full"
          onClick={() => onClickImage?.(imageIndex, images[imageIndex])}
        >
          <motion.img
            key={page}
            src={images[imageIndex]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className={`${styles.galleryImg} ${
              onClickImage != null ? 'relative inset-0' : ''
            } ${showNavDots ? 'pb-6' : ''}`}
          />
        </ContainerComponent>
      </AnimatePresence>
      {showArrowButtons && (
        <>
          <div className={styles.next} onClick={() => paginate(1)}>
            {'‣'}
          </div>
          <div className={styles.prev} onClick={() => paginate(-1)}>
            {'‣'}
          </div>
        </>
      )}
      {showNavDots && (
        <div className="flex w-full absolute bottom-0 cursor-pointer justify-center gap-2 z-10">
          {images.map((_, i) => (
            <div
              key={i}
              className={`${
                imageIndex === i
                  ? 'bg-white border-indigo-800 border-2'
                  : 'bg-indigo-800'
              } h-6 w-16 rounded-full active:opacity-80 hover:opacity-50 cursor-pointer transition-opacity`}
              onClick={() => {
                if (imageIndex != i) setPage([i, imageIndex > i ? -1 : 1]);
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default PhotoGallery;
