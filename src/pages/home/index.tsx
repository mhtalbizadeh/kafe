import { useEffect, useState } from "react";
import "./sass/_homePage.scss";
import Layout from "../../component/layout";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { categoryDto } from "../../api/category/category.interface";
import GetCategory from "../../api/category/get";
import Modal from "../../component/modal";
import Category from "./category";
import { foodDto } from "../../api/food/food.interface";
import { gameDto } from "../../api/game/game.interface";
import GetFood from "../../api/food/get";
const Home = () => {
  //category
  const [category, setCategory] = useState<categoryDto[]>([]);
  const [idCategory, setIdCategory] = useState<number>(0);
  const [nameCategory, setNameCategory] = useState<string>("");
  const [showModalCategory, setShowModalCategory] = useState<boolean>(false);
  const [typeCategory, setTypeCategory] = useState<"add" | "edit" | "delete">(
    "add"
  );
  const [realoadCategory, setRealoadCategory] = useState<boolean>(false);
  //food
  const [food, setFood] = useState<foodDto[]>([]);
  const [idFood, setIdFood] = useState<number>(0);
  const [nameFood, setNameFood] = useState<string>("");
  const [foodCategory, setFoodCategory] = useState<number>(0);
  const [priceFood, setPriceFood] = useState<string>("");
  const [showModalFood, setShowModalFood] = useState<boolean>(false);
  const [typeFood, setTypeFood] = useState<"add" | "edit" | "delete">("add");
  const [realoadFood, setRealoadFood] = useState<boolean>(false);

  //game
  const [game, setGame] = useState<gameDto[]>([]);
  const [idGame, setIdGame] = useState<number>(0);
  const [nameGame, setNameGame] = useState<string>("");
  const [showModalGame, setShowModalGame] = useState<boolean>(false);
  const [typeGame, setTypeGame] = useState<"add" | "edit">("add");
  useEffect(() => {
    const fetch = async () => {
      try {
        setRealoadCategory(false);
        const category = await GetCategory();
        if (category && category.status === 200) {
          setCategory(category.body);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [realoadCategory]);
  useEffect(() => {
    const fetch = async () => {
      try {
        setRealoadFood(false);
        const food = await GetFood();
        if (food && food.status === 200) {
          setFood(food.body);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [realoadFood]);
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
                      setNameCategory("");
                      setIdCategory(0);
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
                              onClick={() => {
                                setShowModalCategory(true);
                                setNameCategory(category.name);
                                setIdCategory(category.id);
                                setTypeCategory("delete");
                              }}
                            />
                            <MdEdit
                              className="home_bottom_element_data_category_bottom_buttons_value"
                              onClick={() => {
                                setShowModalCategory(true);
                                setNameCategory(category.name);
                                setIdCategory(category.id);
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
                {food.map((food) => {
                  return (
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
                          {food.name}
                        </div>
                        <div className="home_bottom_element_data_food_bottom_price">
                          {food.price} تومان
                        </div>
                        <div className="home_bottom_element_data_food_bottom_buttons">
                          <MdDelete className="home_bottom_element_data_food_bottom_buttons_value" />
                          <MdEdit className="home_bottom_element_data_food_bottom_buttons_value" />
                        </div>
                      </div>
                    </div>
                  );
                })}
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
        <Category
          idCategory={idCategory}
          nameCategory={nameCategory}
          setNameCategory={setNameCategory}
          type={typeCategory}
          setRealoadCategory={setRealoadCategory}
        />
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
