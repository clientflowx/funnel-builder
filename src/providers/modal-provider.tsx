"use client";
import { createContext, useContext, useState } from "react";

interface ModalProviderProps {
  children: React.ReactNode;
}

export type ModalContextType = {
  isOpen: boolean;
  setOpen: (modal: React.ReactNode) => void;
  setClose: () => void;
};

const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  setOpen: (modal: React.ReactNode) => {},
  setClose: () => {},
});

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<React.ReactNode>(null);

  const setOpen = (modal: React.ReactNode) => {
    if (modal) {
      setActiveModal(modal);
      setIsOpen(true);
    }
  };

  const setClose = () => {
    setIsOpen(false);
  };
  return (
    <ModalContext.Provider value={{ isOpen, setOpen, setClose }}>
      {children}
      {activeModal}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("useModal hook must be used in <ModalProvider>");
  return context;
};
