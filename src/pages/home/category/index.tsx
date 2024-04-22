import React, { useState,FormEvent } from "react";
import { propsCategoryEdit } from "./category.interface";
import "./sass/category.scss";
import Input from "../../../component/input";
import Button from "../../../component/button";
const Category: React.FC<propsCategoryEdit> = ({ type, data }) => {
  const [loader, setLoader] = useState<boolean>(false);
  const OnSubmitFormCategory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  };
  return (
    <>
      <form className="category" onSubmit={OnSubmitFormCategory}>
        <label className="category_label">
          {type === "add" ? "اضافه کردن دسته بندی " : "ویرایش دسته بندی"}
        </label>
        <Input
          type="text"
          width="30vw"
          height="10vh"
          onChange={() => {}}
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
          {type === "add" ? "تایید" : "ویرایش"}
        </Button>
      </form>
    </>
  );
};

export default Category;
