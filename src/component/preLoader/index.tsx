import { FC } from "react";
import { PreLoaderProps } from "./preLoader.interface";
import "./scss/_preLoader.scss";

const PreLoader: FC<PreLoaderProps> = ({ isLoading }) => {
  return (
    <div className={`${isLoading ? "preLoader" : "d-none"}`}>
      <div className="spinner-box">
        <div className="blue-orbit leo"></div>

        <div className="green-orbit leo"></div>

        <div className="red-orbit leo"></div>

        <div className="white-orbit w1 leo"></div>
        <div className="white-orbit w2 leo"></div>
        <div className="white-orbit w3 leo"></div>
      </div>
      <span className="preLoader-text">در حال دریافت اطلاعات ...</span>
    </div>
  );
};

export default PreLoader;
