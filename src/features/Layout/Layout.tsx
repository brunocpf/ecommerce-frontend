import { TruckIcon } from '@heroicons/react/solid';
import { UserIcon, ShoppingBagIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import Container from 'components/Container';
import ScrollToTopButton from 'components/ScrollToTopButton';

export interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="py-2 bg-gradient-to-b bg-emerald-800 overflow-hidden"></div>
      <header className="sticky top-0 z-40 lg:z-50 w-full max-w-8x1 mx-auto bg-white flex-none flex shadow-md py-4">
        <Container className="flex items-center justify-between">
          <Link href="/" passHref>
            <a>
              <div className="rounded-full p-2 bg-emerald-600">
                <TruckIcon className="h-8 w-8 text-white" />
              </div>
            </a>
          </Link>
          <div className="flex items-center gap-4">
            <button>
              <ShoppingBagIcon className="h-8 w-8" />
            </button>
            <button>
              <UserIcon className="h-8 w-8" />
            </button>
          </div>
        </Container>
      </header>
      <Container className="w-full max-w-8x1 mx-auto overflow-x-hidden py-2">
        <div className="min-h-screen">{children}</div>
      </Container>
      <ScrollToTopButton />
    </>
  );
};

export default Layout;
