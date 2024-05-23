export interface propsInput {
  id?: string;
        onChange?: (e: any) => any;
  height: string;
  width: string;
  placeholder?: string;
  type: "password" | "text" | "number";
  textAlign: "start" | "center";
  className?: string;
  value?: string;
  disabel?: boolean;
}
