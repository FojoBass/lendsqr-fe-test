import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface DashboardContextInt {
  isSideNav?: boolean;
  setIsSideNav?: Dispatch<SetStateAction<boolean>>;
}

const DashboardContext = createContext<DashboardContextInt>({});

export const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSideNav, setIsSideNav] = useState(false);

  const sharedProps: DashboardContextInt = { isSideNav, setIsSideNav };
  return (
    <DashboardContext.Provider value={sharedProps}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashBoardContext = () => useContext(DashboardContext);
