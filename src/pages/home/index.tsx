import React, { useEffect, useState } from "react";
import "./sass/_homePage.scss";
import Layout from "../../component/layout";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { categoryProps } from "../../api/category/category.interface";
import GetCategory from "../../api/category/get";
const Home = () => {
  const [category, setCategory] = useState<categoryProps[]>([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const category = await GetCategory();
        if (category && category.status === 200) {
          setCategory(category.body);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  return (
    <>
      <Layout>
        <div className="home">
          <div className="home_top">
            <label>اضافه کردن / ویرایش</label>
          </div>
          <div className="home_bottom">
            <div className="home_bottom_element">
              <label className="home_bottom_element_label">
                <div className="home_bottom_element_label_add">
                  <IoAddCircleOutline />
                </div>
                دسته بندی غذا
              </label>
              <div className="home_bottom_element_data">
                {/* f */}
                {category.map((category) => {
                  return (
                    <>
                      <div className="home_bottom_element_data_category">
                        <div className="home_bottom_element_data_category_top">
                          نام دسته
                        </div>
                        <div className="home_bottom_element_data_category_bottom">
                          <div className="home_bottom_element_data_category_bottom_title">
                            {category.name}
                          </div>
                          <div className="home_bottom_element_data_category_bottom_buttons">
                            <MdDelete className="home_bottom_element_data_category_bottom_buttons_value" />
                            <MdEdit className="home_bottom_element_data_category_bottom_buttons_value" />
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            <div className="home_bottom_element">
              <label className="home_bottom_element_label">
                <div className="home_bottom_element_label_add">
                  <IoAddCircleOutline />
                </div>
                غذا
              </label>
              <div className="home_bottom_element_data">
                {/* f */}
                <div className="home_bottom_element_data_food">
                  <div className="home_bottom_element_data_food_top">
                    <div className="home_bottom_element_data_food_top_name">
                      نام غذا
                    </div>
                    <div className="home_bottom_element_data_food_top_price">
                      قیمت
                    </div>
                  </div>
                  <div className="home_bottom_element_data_food_bottom">
                    <div className="home_bottom_element_data_food_bottom_title">
                      کباب
                    </div>
                    <div className="home_bottom_element_data_food_bottom_price">
                      250000 تومان
                    </div>
                    <div className="home_bottom_element_data_food_bottom_buttons">
                      <MdDelete className="home_bottom_element_data_food_bottom_buttons_value" />
                      <MdEdit className="home_bottom_element_data_food_bottom_buttons_value" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="home_bottom_element">
              <label className="home_bottom_element_label">
                <div className="home_bottom_element_label_add">
                  <IoAddCircleOutline />
                </div>
                بازی
              </label>
              <div className="home_bottom_element_data">
                {/* f */}
                <div className="home_bottom_element_data_food">
                  <div className="home_bottom_element_data_food_top">
                    <div className="home_bottom_element_data_food_top_name">
                      نام بازی
                    </div>
                    <div className="home_bottom_element_data_food_top_price">
                      قیمت یک ساعت
                    </div>
                  </div>
                  <div className="home_bottom_element_data_food_bottom">
                    <div className="home_bottom_element_data_food_bottom_title">
                      کباب
                    </div>
                    <div className="home_bottom_element_data_food_bottom_price">
                      250000 تومان
                    </div>
                    <div className="home_bottom_element_data_food_bottom_buttons">
                      <MdDelete className="home_bottom_element_data_food_bottom_buttons_value" />
                      <MdEdit className="home_bottom_element_data_food_bottom_buttons_value" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
