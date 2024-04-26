import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AppContextInt {
  isAuthed?: boolean;
  setIsAuthed?: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextInt>({});

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthed, setIsAuthed] = useState(
    sessionStorage.getItem('lendsqr_isAuthed')
      ? JSON.parse(sessionStorage.getItem('lendsqr_isAuthed')!)
      : false
  );

  useEffect(() => {
    sessionStorage.setItem('lendsqr_isAuthed', JSON.stringify(isAuthed));
  }, [isAuthed]);

  const sharedProps: AppContextInt = { isAuthed, setIsAuthed };
  return (
    <AppContext.Provider value={sharedProps}>{children}</AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
