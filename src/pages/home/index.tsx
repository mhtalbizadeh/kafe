import React, { useEffect, useState } from "react";
import "./sass/_homePage.scss";
import Layout from "../../component/layout";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { categoryDto } from "../../api/category/category.interface";
import GetCategory from "../../api/category/get";
import Modal from "../../component/modal";
import Category from "./category";
const Home = () => {
  const [category, setCategory] = useState<categoryDto[]>([]);
  const [food, setFood] = useState<categoryDto[]>([]);
  const [game, setGame] = useState<categoryDto[]>([]);
  const [categoryId, setCategoryId] = useState<categoryDto>({
    id: 0,
    name: "",
  });
  const [showModalCategory, setShowModalCategory] = useState<boolean>(true);
  const [showModalFood, setShowModalFood] = useState<boolean>(false);
  const [showModalGame, setShowModalGame] = useState<boolean>(false);
  const [typeCategory, setTypeCategory] = useState<"add" | "edit">("add");

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
                  <IoAddCircleOutline
                    onClick={() => {
                      setShowModalCategory(true);
                      setCategoryId({
                        id: 0,
                        name: "",
                      });
                      setTypeCategory("add");
                    }}
                  />
                </div>
                دسته بندی غذا
              </label>
              <div className="home_bottom_element_data">
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
                            <MdDelete
                              className="home_bottom_element_data_category_bottom_buttons_value"
                              onClick={() => {}}
                            />
                            <MdEdit
                              className="home_bottom_element_data_category_bottom_buttons_value"
                              onClick={() => {
                                setShowModalCategory(true);
                                setCategoryId(category);
                                setTypeCategory("edit");
                              }}
                            />
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
      <Modal
        idClose="modal-categrory"
        width="40vw"
        height="70vh"
        showModal={showModalCategory}
        setShowModal={setShowModalCategory}
      >
        <Category data={categoryId} type={typeCategory} />
      </Modal>
      <Modal
        idClose="modal-categrory"
        width="70vw"
        height="70vh"
        showModal={showModalFood}
        setShowModal={setShowModalFood}
      >
        <></>
      </Modal>
      <Modal
        idClose="modal-categrory"
        width="70vw"
        height="70vh"
        showModal={showModalGame}
        setShowModal={setShowModalGame}
      >
        <>ferfrfrefefer</>
      </Modal>
    </>
  );
};

export default Home;
