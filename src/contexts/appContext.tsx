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

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthed, setIsAuthed] = useState(
    localStorage.getItem('lendsqr_isAuthed')
      ? JSON.parse(localStorage.getItem('lendsqr_isAuthed')!)
      : false
  );

  useEffect(() => {
    localStorage.setItem('lendsqr_isAuthed', JSON.stringify(isAuthed));
  }, [isAuthed]);

  const sharedProps: AppContextInt = {
    isAuthed,
    setIsAuthed,
  };
  return (
    <AppContext.Provider value={sharedProps}>{children}</AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
