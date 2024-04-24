
export interface propsGameEdit {
  type: "add" | "edit" | "delete";
  nameGame: string;
  setNameGame: React.Dispatch<React.SetStateAction<string>>;
  idGame: number;
  priceGame: string;
  setPriceGame: React.Dispatch<React.SetStateAction<string>>;
  setReaload: React.Dispatch<React.SetStateAction<boolean>>;
  reaload: boolean;
}
