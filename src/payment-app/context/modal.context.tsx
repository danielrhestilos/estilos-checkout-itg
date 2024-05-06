import React, { createContext, useContext, useState } from 'react';

interface ModalContextProps {
  showAlertModal: (params: Partial<AlertModalProps>) => void;
  hideModal: () => void;
  modalProps: AlertModalProps;
}

interface AlertModalProps {
  title: string;
  message: string;
  onRetry: () => void;
  onCancel: () => void;
  show: boolean;
  image?: string;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider: React.FC<any> = ({ children }) => {
  const [modalProps, setModalProps] = useState<AlertModalProps>({
    title: '',
    message: '',
    onRetry: () => {},
    onCancel: () => {},
    show: false,
    image: ''
  });

  const showAlertModal = (params: Partial<AlertModalProps>) => {
    setModalProps({
      ...modalProps,
      ...params,
      show: true,
    });
  };

  const hideModal = () => {
    setModalProps({
      ...modalProps,
      show: false,
    });
  };

  return (
    <ModalContext.Provider value={{ showAlertModal, hideModal, modalProps }}>
      {children}
    </ModalContext.Provider>
  );
};
