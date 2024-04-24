import { Fetch } from "../fetch";
import { FetchResult, HeadersInterface } from "../fetch.interface";
import { gameProps } from "./game.interface";

const PatchGame = async (
  data: gameProps,
  id: number
): Promise<FetchResult | undefined> => {
  try {
    const url: string = `http://127.0.0.1:8000/api/gameroom/game/addnew/game/${id}/
`;
    const metaData: HeadersInterface = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    };

    const result: FetchResult = await Fetch(url, metaData);
    return result;
  } catch (error) {
    console.log("Error", error);
  }
};

export default PatchGame;
