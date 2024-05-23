import { Fetch } from "../fetch";
import { FetchResult, HeadersInterface } from "../fetch.interface";

const GetGame = async (): Promise<FetchResult | undefined> => {
  try {
    const url: string = `http://127.0.0.1:8000/gameroom/game/all/`;
    const metaData: HeadersInterface = {
      method: "GET",
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

export default GetGame;
