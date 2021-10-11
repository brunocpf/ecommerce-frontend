import { Children } from 'react';
import { motion } from 'framer-motion';

export interface ResponsiveListProps {
  children: React.ReactElement[];
}
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const ResponsiveList: React.FC<ResponsiveListProps> = ({ children }) => {
  return (
    <motion.ul
      className="grid list-none gap-4 lg:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {Children.map(children, (child, index) => (
        <motion.li key={index} variants={item}>
          {child}
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default ResponsiveList;
