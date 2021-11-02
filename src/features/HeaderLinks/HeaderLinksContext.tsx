import { LinkProps } from 'next/link';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type HeaderLink = LinkProps & { text: string };

type HeaderLinkContextType = {
  links: HeaderLink[];
  setLinks: Dispatch<SetStateAction<HeaderLink[]>>;
};

const HeaderLinkContext = createContext<HeaderLinkContextType>({
  links: [],
  setLinks: () => {},
});

export const HeaderLinkProvider: React.FC = ({ children }) => {
  const [links, setLinks] = useState<HeaderLink[]>([]);

  return (
    <HeaderLinkContext.Provider
      value={{
        links,
        setLinks,
      }}
    >
      {children}
    </HeaderLinkContext.Provider>
  );
};

export const useHeaderLinks = () => useContext(HeaderLinkContext);

export default HeaderLinkContext;
