import React from 'react';
import { ModalProvider } from './context/modal.context';
import AlertModal from './components/alert';
import PaymentForm from './PaymentForm';

const PaymentApp: React.FC = () => {
  return (
    <ModalProvider>
        <PaymentForm />
        <AlertModal />
    </ModalProvider>
  );
}

export default PaymentApp;
