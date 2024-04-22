export interface propsButton {
  children: string | JSX.Element | JSX.Element[];
  width: string;
  heigh: string;
  loader: boolean;
  type: "button" | "submit";
  fonsize: string;
  onClick?: (e: any) => any;
  disable?: boolean;
}
