export interface propsModal {
  children: string | JSX.Element | JSX.Element[];
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  width?: string;
  height?: string;
  idClose?: string;
}
