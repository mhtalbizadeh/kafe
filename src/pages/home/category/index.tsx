import React, { useState, FormEvent } from "react";
import { propsCategoryEdit } from "./category.interface";
import "./sass/category.scss";
import Input from "../../../component/input";
import Button from "../../../component/button";
import Swal from "sweetalert2";
import CreateCategory from "../../../api/category/post";
import PatchCategory from "../../../api/category/patch";
import DeleteCategory from "../../../api/category/delete";
const Category: React.FC<propsCategoryEdit> = ({
  type,
  idCategory,
  nameCategory,
  setRealoadCategory,
  setNameCategory,
}) => {
  const [loader, setLoader] = useState<boolean>(false);
  const OnSubmitFormCategory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (nameCategory === "") {
      Swal.fire({
        toast: true,
        icon: "error",
        title: "نام دسته بندی نمیتواند خالی باشد",
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } else {
      setLoader(true);
      let result;
      if (type === "add") {
        result = await CreateCategory({
          name: nameCategory,
        });
      } else if (type === "edit") {
        result = await PatchCategory({ name: nameCategory }, idCategory);
      } else if (type === "delete") {
        result = await DeleteCategory(idCategory);
      }
      if (result && result.status === 200) {
        Swal.fire({
          toast: true,
          icon: "success",
          title: "دسته بندی با موفقیت ویرایش شد ",
          position: "bottom",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        setTimeout(() => {
          document.getElementById("modal-categrory")?.click();
          setLoader(false);
          setRealoadCategory(true);
        }, 3000);
      }
      if (result && result.status === 201) {
        Swal.fire({
          toast: true,
          icon: "success",
          title: "دسته بندی با موفقیت ایجاد شد ",
          position: "bottom",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        setTimeout(() => {
          document.getElementById("modal-categrory")?.click();
          setLoader(false);
          setRealoadCategory(true);
        }, 3000);
      }
      if (result && result.status === 204) {
        Swal.fire({
          toast: true,
          icon: "success",
          title: "دسته بندی با موفقیت حذف شد ",
          position: "bottom",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        setTimeout(() => {
          document.getElementById("modal-categrory")?.click();
          setLoader(false);
          setRealoadCategory(true);
        }, 3000);
      }
    }
  };
  return (
    <>
      <form className="category" onSubmit={OnSubmitFormCategory}>
        <label className="category_label">
          {type === "add" ? "اضافه کردن دسته بندی " : "ویرایش دسته بندی"}
        </label>
        <Input
          disabel={type === "delete" ? true : false}
          value={nameCategory}
          type="text"
          width="30vw"
          height="10vh"
          onChange={(e) => {
            setNameCategory(e.target.value);
          }}
          textAlign="start"
          placeholder="لطفا نام دسته بندی را وارد کنید "
        />
        <Button
          width="20vw"
          heigh="8vh"
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

export default Category;
