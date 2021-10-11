import { motion } from 'framer-motion';
import Link from 'next/link';

const BottomNavIcon: React.FC<{
  icon: JSX.Element;
  activeIcon: JSX.Element;
  active?: boolean;
  label: string;
  link: string;
}> = ({ icon, activeIcon, active = false, label, link }) => {
  const currentIcon = active ? activeIcon : icon;

  return (
    <Link href={link} passHref>
      <a
        className={`flex flex-col justify-center items-center flex-1 transition-colors active:bg-gray-500 ${
          active ? 'text-violet-500' : ''
        }`}
      >
        {currentIcon}
        <motion.h6
          animate={
            active
              ? { opacity: 1, scale: 1, display: 'block', translateY: 0 }
              : { opacity: 0, scale: 0, display: 'none', translateY: 32 }
          }
          className={`text-xs font-thin ${
            active ? '' : 'hidden'
          } ring-violet-500 text-shadow`}
        >
          {label}
        </motion.h6>
      </a>
    </Link>
  );
};

export default BottomNavIcon;
