import { Fetch } from "../fetch";
import { FetchResult, HeadersInterface } from "../fetch.interface";
import { foodProps } from "./food.interface";

const CreateFood = async (
  data: foodProps
): Promise<FetchResult | undefined> => {
  try {
    const url: string = `http://127.0.0.1:8000/api/cafe/food/addnew/food
`;
    const metaData: HeadersInterface = {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(data),
    };
    const result: FetchResult = await Fetch(url, metaData);
    return result;
  } catch (error) {
    console.log("Error", error);
  }
};

export default CreateFood;
