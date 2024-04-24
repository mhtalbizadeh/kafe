import { Fetch } from "../fetch";
import { FetchResult, HeadersInterface } from "../fetch.interface";

const DeleteFood = async (id: number): Promise<FetchResult | undefined> => {
  try {
    const url: string = `http://127.0.0.1:8000/api/cafe/food/addnew/food/${id}/
`;
    const metaData: HeadersInterface = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };
    const result: FetchResult = await Fetch(url, metaData);
    return result;
  } catch (error) {
    console.log("Error", error);
  }
};

export default DeleteFood;
