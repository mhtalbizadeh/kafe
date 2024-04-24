import { categoryDto } from "../../../api/category/category.interface";

export interface propsFoodEdit {
  type: "add" | "edit" | "delete";
  nameFood: string;
  setNameFood: React.Dispatch<React.SetStateAction<string>>;
  idFood: number;
  priceFood: string;
  setPriceFood: React.Dispatch<React.SetStateAction<string>>;
  categoryId: number;
  setCategoryId: React.Dispatch<React.SetStateAction<number>>;
  setReaload: React.Dispatch<React.SetStateAction<boolean>>;
  reaload: boolean;
  category: categoryDto[];
}
