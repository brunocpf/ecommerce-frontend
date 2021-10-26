import { TruckIcon } from '@heroicons/react/solid';
import {
  UserIcon,
  ShoppingBagIcon,
  SearchIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import Container from 'components/Container';
import ScrollToTopButton from 'components/ScrollToTopButton';
import config from 'config';
import { Menu, Transition } from '@headlessui/react';
import React from 'react';
import { useAuthenticationContext } from 'features/Authentication';
import { useRouter } from 'next/router';

export interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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

  return (
    <>
      <div className="py-2 bg-gradient-to-b bg-emerald-800 overflow-hidden text-sm text-white flex items-center p-4 justify-center">
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
      <header className="sticky top-0 z-40 lg:z-50 w-full max-w-8x1 mx-auto bg-white flex-none flex shadow-md py-4 backdrop-filter backdrop-blur bg-opacity-30 firefox:bg-opacity-90">
        <Container className="flex items-center justify-between">
          <Link href="/" passHref>
            <a className="flex font-extrabold italic gap-2 items-center justify-center text-emerald-600">
              <div className="rounded-full p-2 bg-emerald-600">
                <TruckIcon className="h-8 w-8 text-white" />
              </div>
              <span className="hidden md:inline-block text-lg">
                {config.public.storeName}
              </span>
            </a>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/produtos" passHref>
              <a className="flex items-center justify-center gap-2 active:opacity-80 hover:opacity-50 cursor-pointer transition-opacity">
                <SearchIcon className="h-8 w-8" />
                <span className="hidden md:inline-block text-lg">Produtos</span>
              </a>
            </Link>
            <Link href="/carrinho" passHref>
              <a className="flex items-center justify-center gap-2 active:opacity-80 hover:opacity-50 cursor-pointer transition-opacity">
                <ShoppingBagIcon className="h-8 w-8" />
              </a>
            </Link>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="flex items-center justify-center gap-2 active:opacity-80 hover:opacity-50 cursor-pointer transition-opacity">
                  <UserIcon className="h-8 w-8" />
                </Menu.Button>
              </div>
              <Transition
                as={React.Fragment}
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
                        <div className="p-2 select-none">
                          {userData?.firstName}
                        </div>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? 'bg-emerald-500 text-white'
                                  : 'text-gray-900'
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
                                active
                                  ? 'bg-emerald-500 text-white'
                                  : 'text-gray-900'
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
                                active
                                  ? 'bg-emerald-500 text-white'
                                  : 'text-gray-900'
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
          </nav>
        </Container>
      </header>
      <Container className="w-full max-w-8x1 mx-auto overflow-x-hidden py-2">
        {children}
      </Container>
      <footer className="w-full min-h-64 bg-emerald-700 py-8">
        <div className="flex font-extrabold italic gap-2 items-center justify-center text-emerald-100 mb-10">
          <TruckIcon className="h-8 w-8 text-emerald-100" />
          <span className="text-lg select-none">{config.public.storeName}</span>
        </div>
        <Container className="flex items-center text-white md:items-start flex-col md:flex-row text-sm gap-4 md:gap-10">
          <section className="flex flex-col items-center gap-4 md:items-start">
            <Link href="/" passHref>
              <a className="">Início</a>
            </Link>
            <Link href="/produtos" passHref>
              <a className="">Ver todos os produtos</a>
            </Link>
            <Link href="/carrinho" passHref>
              <a className="">Carrinho de compras</a>
            </Link>
          </section>
          <section className="flex flex-col items-center gap-4 md:items-start">
            <div>
              <Link href="/sobre" passHref>
                <a className="">Sobre nós</a>
              </Link>
            </div>
            <div>
              <Link href="/contato" passHref>
                <a className="">Contato</a>
              </Link>
            </div>
          </section>
        </Container>
      </footer>
      <ScrollToTopButton />
    </>
  );
};

export default Layout;
