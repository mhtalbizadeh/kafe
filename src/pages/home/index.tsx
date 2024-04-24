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
import Food from "./food";
import Game from "./game";
import GetGame from "../../api/game/get";
const Home = () => {
  //category
  const [category, setCategory] = useState<categoryDto[]>([]);
  const [idCategory, setIdCategory] = useState<number>(0);
  const [nameCategory, setNameCategory] = useState<string>("");
  const [showModalCategory, setShowModalCategory] = useState<boolean>(false);
  const [typeCategory, setTypeCategory] = useState<"add" | "edit" | "delete">(
    "add"
  );
  const [reaload, setReaload] = useState<boolean>(false);
  //food
  const [food, setFood] = useState<foodDto[]>([]);
  const [idFood, setIdFood] = useState<number>(0);
  const [nameFood, setNameFood] = useState<string>("");
  const [foodCategory, setFoodCategory] = useState<number>(0);
  const [priceFood, setPriceFood] = useState<string>("");
  const [showModalFood, setShowModalFood] = useState<boolean>(false);
  const [typeFood, setTypeFood] = useState<"add" | "edit" | "delete">("add");

  //game
  const [game, setGame] = useState<gameDto[]>([]);
  const [idGame, setIdGame] = useState<number>(0);
  const [nameGame, setNameGame] = useState<string>("");
  const [priceGame, setPriceGame] = useState<string>("");
  const [showModalGame, setShowModalGame] = useState<boolean>(false);
  const [typeGame, setTypeGame] = useState<"add" | "edit" | "delete">("add");
  console.log("check");
  useEffect(() => {
    const fetch = async () => {
      try {
        const category = await GetCategory();
        if (category && category.status === 200) {
          setCategory(category.body);
        }
        const food = await GetFood();
        if (food && food.status === 200) {
          setFood(food.body);
        }
        const game = await GetGame();
        if (game && game.status === 200) {
          setGame(game.body);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [reaload]);
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
                  <IoAddCircleOutline
                    onClick={() => {
                      setShowModalFood(true);
                      setTypeFood("add");
                      setIdFood(0);
                      setNameFood("");
                      setFoodCategory(0);
                      setPriceFood("");
                    }}
                  />
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
                          <MdDelete
                            className="home_bottom_element_data_food_bottom_buttons_value"
                            onClick={() => {
                              setShowModalFood(true);
                              setTypeFood("delete");
                              setIdFood(food.id);
                              setNameFood(food.name);
                              setFoodCategory(food.category);
                              setPriceFood(food.price);
                            }}
                          />
                          <MdEdit
                            className="home_bottom_element_data_food_bottom_buttons_value"
                            onClick={() => {
                              setShowModalFood(true);
                              setTypeFood("edit");
                              setIdFood(food.id);
                              setNameFood(food.name);
                              setFoodCategory(food.category);
                              setPriceFood(food.price);
                            }}
                          />
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
                  <IoAddCircleOutline
                    onClick={() => {
                      setTypeGame("add");
                      setShowModalGame(true);
                      setNameGame("");
                      setPriceGame("");
                      setIdGame(0);
                    }}
                  />
                </div>
                بازی
              </label>
              <div className="home_bottom_element_data">
                {game.map((game) => {
                  return (
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
                          {game.name}
                        </div>
                        <div className="home_bottom_element_data_food_bottom_price">
                          {game.price} تومان
                        </div>
                        <div className="home_bottom_element_data_food_bottom_buttons">
                          <MdDelete
                            className="home_bottom_element_data_food_bottom_buttons_value"
                            onClick={() => {
                              setTypeGame("delete");
                              setShowModalGame(true);
                              setNameGame(game.name);
                              setPriceGame(game.price);
                              setIdGame(game.id);
                            }}
                          />
                          <MdEdit
                            className="home_bottom_element_data_food_bottom_buttons_value"
                            onClick={() => {
                              setTypeGame("edit");
                              setShowModalGame(true);
                              setNameGame(game.name);
                              setPriceGame(game.price);
                              setIdGame(game.id);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
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
          setRealoadCategory={setReaload}
          reaload={reaload}
        />
      </Modal>
      <Modal
        idClose="modal-food"
        width="40vw"
        height="80vh"
        showModal={showModalFood}
        setShowModal={setShowModalFood}
      >
        <Food
          category={category}
          categoryId={foodCategory}
          idFood={idFood}
          nameFood={nameFood}
          priceFood={priceFood}
          reaload={reaload}
          setCategoryId={setFoodCategory}
          setNameFood={setNameFood}
          setPriceFood={setPriceFood}
          setReaload={setReaload}
          type={typeFood}
        />
      </Modal>
      <Modal
        idClose="modal-game"
        width="40vw"
        height="70vh"
        showModal={showModalGame}
        setShowModal={setShowModalGame}
      >
        <Game
          idGame={idGame}
          nameGame={nameGame}
          priceGame={priceGame}
          reaload={reaload}
          setNameGame={setNameGame}
          setPriceGame={setPriceGame}
          setReaload={setReaload}
          type={typeGame}
        />
      </Modal>
    </>
  );
};

export default Home;
