import React, { useState, FormEvent } from "react";
import "./sass/game.scss";
import Input from "../../../component/input";
import Button from "../../../component/button";
import Swal from "sweetalert2";
import { propsGameEdit } from "./game.interface";
import CreateGame from "../../../api/game/post";
import PatchGame from "../../../api/game/patch";
import DeleteGame from "../../../api/game/delete";

const Game: React.FC<propsGameEdit> = ({
  type,
  idGame,
  nameGame,
  priceGame,
  setNameGame,
  setPriceGame,
  setReaload,
  reaload,
}) => {
  const [loader, setLoader] = useState<boolean>(false);
  const OnSubmitFormGame = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (nameGame === "") {
      Swal.fire({
        background: "black",
        color: "yellow",
        toast: true,
        icon: "error",
        title: "نام بازی نمیتواند خالی باشد",
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } else if (priceGame === "") {
      Swal.fire({
        background: "black",
        color: "yellow",
        toast: true,
        icon: "error",
        title: "قیمت بازی نمیتواند خالی باشد",
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } else {
      setLoader(true);
      let result;
      if (type === "add") {
        result = await CreateGame({
          name: nameGame,
          price: priceGame,
        });
      } else if (type === "edit") {
        result = await PatchGame({ name: nameGame, price: priceGame }, idGame);
      } else if (type === "delete") {
        result = await DeleteGame(idGame);
      }
      if (result && result.status === 200) {
        Swal.fire({
          background: "black",
          color: "yellow",
          toast: true,
          icon: "success",
          title: "بازی با موفقیت ویرایش شد ",
          position: "bottom",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        setTimeout(() => {
          document.getElementById("modal-game")?.click();
          setLoader(false);
          setReaload(!reaload);
        }, 3000);
      }
      if (result && result.status === 201) {
        Swal.fire({
          background: "black",
          color: "yellow",
          toast: true,
          icon: "success",
          title: "بازی با موفقیت ایجاد شد ",
          position: "bottom",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        setTimeout(() => {
          document.getElementById("modal-game")?.click();
          setLoader(false);
          setReaload(!reaload);
        }, 3000);
      }
      if (result && result.status === 204) {
        Swal.fire({
          background: "black",
          color: "yellow",
          toast: true,
          icon: "success",
          title: "بازی با موفقیت حذف شد ",
          position: "bottom",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        setTimeout(() => {
          document.getElementById("modal-game")?.click();
          setLoader(false);
          setReaload(!reaload);
        }, 3000);
      }
    }
  };
  return (
    <>
      <form className="game" onSubmit={OnSubmitFormGame}>
        <label className="game_label">
          {type === "add"
            ? "اضافه کردن بازی  "
            : type === "edit"
            ? "ویرایش  بازی"
            : "حذف بازی"}
        </label>
        <Input
          disabel={type === "delete" ? true : false}
          value={nameGame}
          type="text"
          width="30vw"
          height="10vh"
          onChange={(e) => {
            setNameGame(e.target.value);
          }}
          textAlign="start"
          placeholder="لطفا نام بازی  را وارد کنید "
        />
        <Input
          disabel={type === "delete" ? true : false}
          value={priceGame}
          type="number"
          width="30vw"
          height="10vh"
          onChange={(e) => {
            setPriceGame(e.target.value);
          }}
          textAlign="start"
          placeholder="لطفا قیمت بازی  را بر اساس یک ساعت وارد کنید "
        />
        <Button
          width="25vw"
          heigh="10vh"
          fonsize="30px"
          loader={loader}
          type="submit"
        >
          {type === "add" ? "تایید" : type === "edit" ? "ویرایش" : "حذف"}
        </Button>
      </form>
    </>
  );
};

export default Game;
