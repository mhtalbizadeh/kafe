export interface propsCategoryEdit {
  type: "add" | "edit" | "delete";
  nameCategory: string;
  setNameCategory: React.Dispatch<React.SetStateAction<string>>;
  idCategory: number;
  setRealoadCategory: React.Dispatch<React.SetStateAction<boolean>>;
  reaload: boolean;
}
