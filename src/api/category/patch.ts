import { Fetch } from "../fetch";
import { FetchResult, HeadersInterface } from "../fetch.interface";
import { categoryProps } from "./category.interface";

const PatchEcosystem = async (
  data: categoryProps,
  id: number
): Promise<FetchResult | undefined> => {
  try {
    const formData = new FormData();
  
    const url: string = `${process.env.REACT_APP_BE_BASE_URL}/ecosystem/ecosystem/${id}/`;
    const token = sessionStorage.getItem("token");
    const metaData: HeadersInterface = {
      method: "PATCH",
      headers: {
        Authorization: "JWT " + token,
      },
      body: formData,
    };

    const result: FetchResult = await Fetch(url, metaData);
    return result;
  } catch (error) {
    console.log("Error", error);
  }
};

export default PatchEcosystem;
