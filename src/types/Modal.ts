export interface ConfirmModalInfo {
  visible: boolean;
  message: string;
  buttonText: string;
}

export interface ConfirmCancelModalInfo {
  visible: boolean;
  message: string;
  confirmButtonText: string;
  cancelButtonText: string;
}

export const initConfirmModalInfo = (): ConfirmModalInfo => ({
  visible: false,
  message: "",
  buttonText: "",
});

export const initConfirmCancelModalInfo = (): ConfirmCancelModalInfo => ({
  visible: false,
  message: "",
  confirmButtonText: "",
  cancelButtonText: "",
});
