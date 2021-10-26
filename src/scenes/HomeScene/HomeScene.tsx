import { TruckIcon } from '@heroicons/react/outline';
import config from 'config';

export interface HomeSceneProps {}

const HomeScene: React.FC<HomeSceneProps> = () => {
  return (
    <>
      <div className="bg-emerald-500 h-72 bg grid place-items-center rounded-md">
        <div className="flex text-3xl font-extrabold italic gap-2 items-center justify-center text-emerald-100 mb-10">
          <TruckIcon className="h-16 w-16 text-emerald-100" />
          <span className="select-none">{config.public.storeName}</span>
        </div>
      </div>
      <style jsx>
        {`
          .bg {
            background-color: #00bb77;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cpolygon fill='%23000' fill-opacity='.1' points='120 0 120 60 90 30 60 0 0 0 0 0 60 60 0 120 60 120 90 90 120 60 120 0'/%3E%3C/svg%3E");
          }
        `}
      </style>
    </>
  );
};

export default HomeScene;
