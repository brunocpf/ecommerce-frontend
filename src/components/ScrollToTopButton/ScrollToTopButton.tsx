import { useEffect, useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/outline';

export interface ScrollToTopButtonProps {}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function toggleVisibility() {
      if (window.pageYOffset > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }

    document.addEventListener('scroll', toggleVisibility);

    return () => document.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-3 right-3 cursor-pointer">
      {isVisible && (
        <button
          className="p-2 rounded-full bg-gray-200 hover:opacity-50 active:opacity-80 transition-opacity"
          onClick={scrollToTop}
        >
          <ArrowUpIcon className="h-8 w-8" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
