export interface ConfirmModalInfo {
  visible: boolean;
  message: string;
  buttonText: string;
}

export const initModalInfo = (): ConfirmModalInfo => ({
  visible: false,
  message: "",
  buttonText: "",
});
