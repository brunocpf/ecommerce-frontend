import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { Fragment } from 'react';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ open, onClose, children }) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex">
            <div className="bg-white w-8/12 p-4 min-h-screen shadow-2xl">
              <div className="w-full flex justify-end mb-4">
                <button
                  className="bg-transparent w-auto flex justify-end items-center text-gray-500 p-2 hover:text-gray-400"
                  onClick={onClose}
                >
                  <XIcon className="h-6 w-6" />
                </button>
              </div>
              {children}
            </div>
            <Dialog.Overlay className="flex-1 inset-0 bg-gray-600 opacity-25"></Dialog.Overlay>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default Drawer;
