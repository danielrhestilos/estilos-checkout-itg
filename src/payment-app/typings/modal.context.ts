export interface ModalContextProps {
  showAlertModal: (params: Partial<AlertModalProps>) => void;
  hideModal: () => void;
}

export interface AlertModalProps {
  title: string;
  message: string;
  onRetry?: () => void;
  onCancel?: () => void;
  show: boolean;
}
