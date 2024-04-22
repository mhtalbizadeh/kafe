import { Fetch } from "../fetch";
import { FetchResult, HeadersInterface } from "../fetch.interface";
import { categoryProps } from "./category.interface";

const CreateEcosystem = async (
  data: categoryProps
): Promise<FetchResult | undefined> => {
  try {
    const url: string = `http://127.0.0.1:8000/api/cafe/food/addnew/category/`;
    const metaData: HeadersInterface = {
      method: "POST",
      headers: {},
      body: data,
    };
    const result: FetchResult = await Fetch(url, metaData);
    return result;
  } catch (error) {
    console.log("Error", error);
  }
};

export default CreateEcosystem;
