import React, { useState, FormEvent } from "react";
import "./sass/food.scss";
import Input from "../../../component/input";
import Button from "../../../component/button";
import Swal from "sweetalert2";

import { propsFoodEdit } from "./food.interface";
import CreateFood from "../../../api/food/post";
import PatchFood from "../../../api/food/patch";
import DeleteFood from "../../../api/food/delete";
const Food: React.FC<propsFoodEdit> = ({
  type,
  categoryId,
  idFood,
  nameFood,
  priceFood,
  setCategoryId,
  setNameFood,
  setPriceFood,
  setReaload,
  reaload,
  category,
}) => {
  const [loader, setLoader] = useState<boolean>(false);
  const OnSubmitFormFood = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (nameFood === "") {
      Swal.fire({
        toast: true,
        icon: "error",
        title: "نام غذا نمیتواند خالی باشد",
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } else if (priceFood === "") {
      Swal.fire({
        toast: true,
        icon: "error",
        title: "قیمت غذا نمیتواند خالی باشد",
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } else if (categoryId === 0) {
      Swal.fire({
        toast: true,
        icon: "error",
        title: "دسته بندی غذا نمیتواند خالی باشد",
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } else {
      setLoader(true);
      let result;
      if (type === "add") {
        result = await CreateFood({
          name: nameFood,
          category: categoryId,
          price: priceFood,
        });
      } else if (type === "edit") {
        result = await PatchFood(
          { name: nameFood, category: categoryId, price: priceFood },
          idFood
        );
      } else if (type === "delete") {
        console.log("check");
        result = await DeleteFood(idFood);
      }
      if (result && result.status === 200) {
        Swal.fire({
          toast: true,
          icon: "success",
          title: "غذا با موفقیت ویرایش شد ",
          position: "bottom",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        setTimeout(() => {
          document.getElementById("modal-food")?.click();
          setLoader(false);
          setReaload(!reaload);
        }, 3000);
      }
      if (result && result.status === 201) {
        Swal.fire({
          toast: true,
          icon: "success",
          title: "غذا با موفقیت ایجاد شد ",
          position: "bottom",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        setTimeout(() => {
          document.getElementById("modal-food")?.click();
          setLoader(false);
          setReaload(!reaload);
        }, 3000);
      }
      if (result && result.status === 204) {
        Swal.fire({
          toast: true,
          icon: "success",
          title: "غذا با موفقیت حذف شد ",
          position: "bottom",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        setTimeout(() => {
          document.getElementById("modal-food")?.click();
          setLoader(false);
          setReaload(!reaload);
        }, 3000);
      }
    }
  };

  return (
    <>
      <form className="food" onSubmit={OnSubmitFormFood}>
        <label className="food_label">
          {type === "add"
            ? "اضافه کردن غذا  "
            : type === "edit"
            ? "ویرایش  غذا"
            : "حذف غذا"}
        </label>
        <Input
          disabel={type === "delete" ? true : false}
          value={nameFood}
          type="text"
          width="30vw"
          height="10vh"
          onChange={(e) => {
            setNameFood(e.target.value);
          }}
          textAlign="start"
          placeholder="لطفا نام غذا  را وارد کنید "
        />
        <select
          onChange={(e) => {
            setCategoryId(parseInt( e.target.value));
          }}
        >
          <option value="" selected={categoryId === 0 ? true : false} hidden>
            لطفا دسته بندی را انتخاب کنید
          </option>
          {category.map((category) => {
            return (
              <option
                value={category.id}
                selected={categoryId === category.id ? true : false}
              >
                {category.name}
              </option>
            );
          })}
        </select>
        <Input
          disabel={type === "delete" ? true : false}
          value={priceFood}
          type="number"
          width="30vw"
          height="10vh"
          onChange={(e) => {
            setPriceFood( e.target.value);
          }}
          textAlign="start"
          placeholder="لطفا قیمت غذا  را بر اساس ریال وارد کنید "
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

export default Food;
