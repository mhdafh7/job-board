import {
  createContext,
  Dispatch,
  ReactElement,
  ReactFragment,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { ColumnType } from "../lib/enums";

type ModalContextType = {
  columnType: ColumnType;
  setColumnType: Dispatch<SetStateAction<ColumnType>>;
  isModalOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};
export const ModalContext = createContext<ModalContextType>(
  {} as ModalContextType
);

const ModalContextProvider = ({
  children,
}: {
  children: ReactFragment | ReactNode | ReactElement;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columnType, setColumnType] = useState(ColumnType.SOURCE);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        handleOpen,
        handleClose,
        columnType,
        setColumnType,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
