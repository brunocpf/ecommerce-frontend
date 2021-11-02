import Link from 'next/link';
import Container from 'components/Container';
import ButtonBase from 'components/ButtonBase';
import {
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import SearchBar from 'features/SearchBar';
import config from 'config';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAuthenticationContext } from 'features/Authentication';
import { useRouter } from 'next/router';

export interface PageLayoutProps {}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const { push } = useRouter();
  const { loggedIn, logout, userData } = useAuthenticationContext();

  const handleAccount = () => {
    push('/conta');
  };

  const handleLogin = () => {
    push('/login');
  };

  const handleLogout = () => {
    logout().then(() => {
      push('/login');
    });
  };

  const menu = (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center justify-center gap-2 active:opacity-80 hover:opacity-50 cursor-pointer transition-opacity">
          <UserIcon className="h-6 w-6 md:h-8 md:w-8" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            {loggedIn ? (
              <>
                <div className="p-2 select-none">{userData?.firstName}</div>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-blue-700 text-white' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      onClick={handleAccount}
                    >
                      Conta
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-blue-700 text-white' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      onClick={handleLogout}
                    >
                      Sair
                    </button>
                  )}
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-blue-700 text-white' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  )}
                </Menu.Item>
              </>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );

  return (
    <>
      <div className="py-2 bg-indigo-900 overflow-hidden text-sm text-white flex items-center p-4 justify-center">
        <div className="flex flex-col sm:flex-row gap-1 items-center">
          <a href={`tel:${config.public.phoneNumber}`}>
            Fone: {config.public.phoneNumber}
          </a>
          <span className="hidden sm:inline">-</span>
          <a
            href={`https://wa.me/55${config.public.whatsApp
              .replace(/[\])}[{(]/g, '')
              .replace(' ', '')
              .replace('-', '')
              .replace('+', '')}`}
          >
            WhatsApp: {config.public.whatsApp}
          </a>
        </div>
      </div>
      <header className="bg sticky top-0 z-40 lg:z-50 w-full max-w-8x1 mx-auto bg-white flex-none flex py-4 border-b-2 border-blue-700">
        <Container className="flex items-center justify-between md:divide-x-2 md:divide-gray-200 md:gap-8">
          <Link href="/" passHref>
            <a className="md:py-4">
              <h1 className="font-bold md:text-2xl">
                <span className="text-blue-700">Garra</span>Motors
              </h1>
            </a>
          </Link>
          <nav className="flex gap-4 md:hidden">
            <Link href="/produtos" passHref>
              <ButtonBase component="a">
                <SearchIcon className="h-6 w-6" />
              </ButtonBase>
            </Link>
            <Link href="/carrinho" passHref>
              <ButtonBase component="a">
                <ShoppingCartIcon className="h-6 w-6" />
              </ButtonBase>
            </Link>
            {menu}
          </nav>
          <nav className="hidden md:flex flex-1 pl-8 flex-col gap-4">
            <div className="w-full flex gap-4 items-center">
              <div className="flex-1">
                <SearchBar />
              </div>
              <Link href="/carrinho" passHref>
                <ButtonBase component="a">
                  <ShoppingCartIcon className="h-8 w-8" />
                </ButtonBase>
              </Link>
              {menu}
            </div>
          </nav>
        </Container>
      </header>
      <motion.main className="min-h-screen">{children}</motion.main>
    </>
  );
};

export default PageLayout;
