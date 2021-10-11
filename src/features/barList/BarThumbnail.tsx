import styles from './BarThumbnail.module.css';
import {
  LocationMarkerIcon,
  LockClosedIcon,
  StarIcon as SolidStarIcon,
} from '@heroicons/react/solid';
import { StarIcon as OutlineStarIcon } from '@heroicons/react/outline';
import formatDistance from 'util/formatDistance';
import formatTimeOfDay from 'util/formatTimeOfDay';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

type TimeOfDay = {
  hour: number;
  minute: number;
};

export interface BarThumbnailProps {
  barId: string;
  thumbnailImg: string;
  name: string;
  distance: number;
  address: string;
  openHours?: { open: TimeOfDay; close: TimeOfDay } | null;
  favorite?: boolean | null;
  onClickFavorite?: () => void;
}

const BarThumbnail: React.FC<BarThumbnailProps> = ({
  name,
  barId,
  thumbnailImg,
  distance,
  address,
  openHours,
  favorite,
  onClickFavorite,
}) => {
  const [hoveringIcon, setHoveringIcon] = useState(false);

  return (
    <div
      className="w-full h-48 bg-black relative bg-cover bg-no-repeat isolate"
      style={{
        backgroundImage: `url(${thumbnailImg})`,
      }}
    >
      <div className="w-full h-full relative">
        <div
          className={`absolute inset-0 bg-gradient-to-b from-transparent to-violet-800 mix-blend-screen ${styles.overlay}`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-b from-transparent opacity-40 via-violet-800 to-violet-800 mix-blend-multiply ${styles.overlay}`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-r from-transparent to-violet-800 mix-blend-screen ${styles.overlay}`}
        />
        <Link href={`/bar/${barId}`}>
          <a
            className={`cursor-pointer p-4 w-full h-full relative flex flex-col justify-between bg-gradient-to-b from-transparent to-black transition-colors ${
              hoveringIcon ? '' : styles.thumbnailButton
            }`}
          >
            <div className="w-full flex justify-end text-shadow">
              <button
                className="relative rounded-full iconButton text-gray-200"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClickFavorite?.();
                }}
                onMouseOver={() => setHoveringIcon(true)}
                onMouseOut={() => setHoveringIcon(false)}
              >
                <OutlineStarIcon className="h-6 w-6 ring-current iconShadow" />
                <motion.div
                  animate={{ opacity: favorite ? 1 : 0 }}
                  transition={{
                    ease: favorite ? 'easeOut' : 'easeIn',
                    duration: 0.1,
                  }}
                  className="absolute inset-0"
                >
                  <SolidStarIcon className="h-6 w-6 ring-current iconShadow" />
                </motion.div>
              </button>
            </div>
            <div className="relative select-none rounded w-full ring-gray-200 text-shadow isolate">
              <h2 className="text-xl font-medium">{name}</h2>
              <h3 className="text-sm font-medium">
                {openHours == null ? (
                  <span className="flex items-center gap-0.5">
                    <LockClosedIcon className="h-3 w-3 ring-gray-200 iconShadow" />
                    Fechado
                  </span>
                ) : (
                  `${formatTimeOfDay(
                    openHours.open.hour,
                    openHours.open.minute,
                  )} - ${formatTimeOfDay(
                    openHours.close.hour,
                    openHours.close.minute,
                  )}`
                )}
              </h3>
              <div className="flex text-xs justify-between">
                <span>{address}</span>
                <span className="flex items-center gap-0.5">
                  <LocationMarkerIcon className="h-3 w-3 ring-gray-200 iconShadow" />
                  {formatDistance(distance)}
                </span>
              </div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default BarThumbnail;
