import { Fetch } from "../fetch";
import { FetchResult, HeadersInterface } from "../fetch.interface";

const GetIdEcosystem = async (
  id?: number
): Promise<FetchResult | undefined> => {
  try {
    const url: string = `${
      process.env.REACT_APP_BE_BASE_URL
    }/ecosystem/ecosystem/${id ? `${id}/` : ""}`;
    const token = sessionStorage.getItem("token");
    const metaData: HeadersInterface = {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "JWT " + token,
      },
    };

    const result: FetchResult = await Fetch(url, metaData);
    return result;
  } catch (error) {
    console.log("Error", error);
  }
};

export default GetIdEcosystem;
