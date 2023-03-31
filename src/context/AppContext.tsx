import { createContext } from 'react'

interface AppContextType {
  username: string | null;
  setUsername: (username: string) => void;
}

const AppContext = createContext<AppContextType>({
  username: null,
  setUsername: () => {},
);


export default AppContext;
