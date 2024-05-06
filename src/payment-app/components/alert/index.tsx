import React from 'react';
import styles from './index.module.css';// Importa el contexto aquí
import { useModal } from '../../context/modal.context';
import svgExclamation from '../../assets/icons/exclamation.svg'

const AlertModal: React.FC = () => {
  const { modalProps } = useModal(); // Obtén los valores del contexto

  if (!modalProps.show) return null;

  return (
    <div className={styles['alert-container']}>
      <div className={styles['alert-modal']}>
        <header className={styles['alert-modal-header']}>
          <img src={modalProps.image} alt="header" />
        </header>
        <div className={styles['alert-modal-body']}>
          <h2>
            <span style={{
              backgroundImage: `url(${svgExclamation})`,
            }}></span>
            {modalProps.title}
          </h2>
          <p>{modalProps.message}</p>
          <div className={styles['alert-modal-buttons']}>
            <button data-style="primary" onClick={modalProps.onRetry}>
              Volver a intentarlo
            </button>
            <button data-style="simple" onClick={modalProps.onCancel}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
