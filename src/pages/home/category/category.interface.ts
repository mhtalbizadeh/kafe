import { categoryProps } from "../../../api/category/category.interface";

export interface propsCategoryEdit {
  type: "add" | "edit";
  data: categoryProps;
}
