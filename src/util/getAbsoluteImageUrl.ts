import config from 'config';

export default function getAbsoluteImageUrl(relativeUrl: string) {
  return `${config.public.apiUrl}${relativeUrl}`;
}
