import { NextApiHandler } from 'next';
import { destroyCookie } from 'nookies';

const logout: NextApiHandler = async (_, res) => {
  destroyCookie({ res }, 'jwt', {
    path: '/',
  });

  res.status(200).end();
};

export default logout;
