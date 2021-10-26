import config from 'config';
import { NextApiHandler } from 'next';
import { setCookie } from 'nookies';

const register: NextApiHandler = async (req, res) => {
  const { firstName, lastName, password, email, captchaCode } = JSON.parse(
    req.body,
  );

  if (!captchaCode) {
    return res.status(422).json({
      id: 'Captcha.nocaptcha',
      message: 'Unproccesable request, please provide the captcha code',
    });
  }

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${captchaCode}`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      method: 'POST',
    },
  );

  const captchaValidation = await response.json();

  if (!captchaValidation.success) {
    return res.status(422).json({
      id: 'Captcha.invalidcaptcha',
      message: 'Unproccesable request, Invalid captcha code',
    });
  }

  try {
    const response = await fetch(
      `${config.public.apiUrl}/auth/local/register`,
      {
        method: 'POST',
        body: JSON.stringify({
          username: email,
          firstName,
          lastName,
          email,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    setCookie({ res }, 'jwt', result.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
      sameSite: process.env.NODE_ENV !== 'development' ? 'None' : undefined,
    });

    res.status(200).send({
      id: result.user.id,
      firstName: result.user.firstName,
      lastName: result.user.lastName,
      email: result.user.email,
    });
  } catch (e: any) {
    res.status(400).send(e.message[0].messages[0]);
  }
};

export default register;
