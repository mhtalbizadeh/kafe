import { useEffect, useState } from "react";
import Layout from "../../component/layout";
import TabsButton from "../../component/tabsButton";
import "./sass/menu.scss";
import { categoryDto } from "../../api/category/category.interface";
import { foodDto } from "../../api/food/food.interface";
import { gameDto } from "../../api/game/game.interface";
import GetCategory from "../../api/category/get";
import GetFood from "../../api/food/get";
import GetGame from "../../api/game/get";
import { FaAngleLeft } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa6";
import Swal from "sweetalert2";
import { IoPrint } from "react-icons/io5";
import { GiCancel } from "react-icons/gi";

const Menu = () => {
  const [receiptFood, setReceiptFood] = useState<
    {
      number: number;
      name: string;
      price: number;
    }[]
  >([]);
  const [receiptGame, setReceiptGame] = useState<
    {
      name: string;
      timeHourse: number;
      timeMinutes: number;
      price: number;
    }[]
  >([]);

  const [activeTabs, setActiveTabs] = useState<string>("غذا");
  const [category, setCategory] = useState<categoryDto[]>([]);
  const [food, setFood] = useState<foodDto[]>([]);
  const [game, setGame] = useState<gameDto[]>([]);
  const [foodCategory, setFoodcategory] = useState<number>(1);
  const generateHoursArray: number[] = Array.from(
    { length: 24 },
    (_, index) => index + 1
  );
  const generateMinutesArray: number[] = Array.from(
    { length: 12 },
    (_, index) => index * 5
  );
  useEffect(() => {
    const fetch = async () => {
      try {
        const category = await GetCategory();
        if (category && category.status === 200) {
          setCategory(category.body);
          setFoodcategory(category.body[0].id);
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
  }, []);
  function convertToPersianNumber(input: string) {
    const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return input.replace(/\d/g, (match) => persianNumbers[parseInt(match)]);
  }
  function addCharacterEveryThreeChars(input: string, charToAdd: string) {
    let reversedInput = input.split("").reverse().join("");
    let result = "";
    for (let i = 0; i < reversedInput.length; i += 3) {
      result += reversedInput.slice(i, i + 3);
      if (i + 3 < reversedInput.length) {
        result += charToAdd;
      }
    }
    return result.split("").reverse().join("");
  }
  function sumReceipt(
    game: {
      name: string;
      timeHourse: number;
      timeMinutes: number;
      price: number;
    }[],
    food: {
      number: number;
      name: string;
      price: number;
    }[]
  ) {
    let sumGame: number = 0;
    let sumFood: number = 0;
    game.map((game) => {
      sumGame += game.price;
      return <></>;
    });
    food.map((food) => {
      sumFood += food.price;
      return <></>;
    });
    return sumGame + sumFood;
  }
  return (
    <>
      <Layout>
        <div className="menu">
          <div className="menu_content">
            <label className="menu_content_label">فهرست</label>
            <div className="menu_content_tabs">
              <TabsButton
                namsOfButton={["غذا", "بازی"]}
                activeButtons={1}
                setActiveTabs={setActiveTabs}
              />
            </div>
            <div className="menu_content_value">
              {activeTabs === "غذا" ? (
                <>
                  <div className="menu_content_value_category">
                    {category.map((category) => {
                      return (
                        <button
                          onClick={() => {
                            setFoodcategory(category.id);
                          }}
                          style={
                            foodCategory === category.id
                              ? {
                                  padding: "0vw 1vw",
                                  backgroundColor: " #f0f0f0",
                                }
                              : {}
                          }
                          className="menu_content_value_category_button"
                        >
                          {category.name}
                          <FaAngleLeft />
                        </button>
                      );
                    })}
                  </div>
                  <div className="menu_content_value_food">
                    {food.map((food) => {
                      return (
                        <div
                          className={
                            food.category === foodCategory
                              ? "menu_content_value_food_element"
                              : "d-none"
                          }
                        >
                          <label>نام غذا : {food.name}</label>
                          <label>
                            قیمت غذا :{" "}
                            {addCharacterEveryThreeChars(
                              `${convertToPersianNumber(food.price)}`,
                              "/"
                            )}{" "}
                            تومان
                          </label>
                          <button
                            onClick={() => {
                              setReceiptFood((prevState) => {
                                const found = prevState.find(
                                  (item) => item.name === food.name
                                );
                                if (found) {
                                  return prevState.map((items) =>
                                    items.name === food.name
                                      ? {
                                          ...items,
                                          number: items.number + 1,
                                          price:
                                            items.price + parseInt(food.price),
                                        }
                                      : items
                                  );
                                } else {
                                  return [
                                    ...prevState,
                                    {
                                      number: 1,
                                      name: food.name,
                                      price: parseInt(food.price),
                                    },
                                  ];
                                }
                              });
                            }}
                          >
                            <FaCartPlus />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="menu_content_value_games">
                  {game.map((game) => {
                    return (
                      <div className="menu_content_value_game">
                        <label>نام بازی : {game.name}</label>
                        <label>
                          قیمت بازی بر اساس یک ساعت :{" "}
                          {addCharacterEveryThreeChars(
                            `${convertToPersianNumber(game.price)}`,
                            "/"
                          )}{" "}
                          تومان
                        </label>
                        <input
                          className="myInput"
                          type="number"
                          list="options"
                          id={`${game.id}Hourse`}
                          placeholder="ساعت"
                        />
                        <datalist id="options">
                          {generateHoursArray.map((hourse) => {
                            return <option value={hourse}>{hourse}</option>;
                          })}
                        </datalist>
                        <input
                          className="myInput"
                          type="number"
                          list="optionsMinutes"
                          id={`${game.id}Minutes`}
                          placeholder="دقیقه"
                        />
                        <datalist id="optionsMinutes">
                          {generateMinutesArray.map((minutes) => {
                            return <option value={minutes}>{minutes}</option>;
                          })}
                        </datalist>
                        <button
                          onClick={() => {
                            if (
                              (
                                document.getElementById(
                                  `${game.id}Hourse`
                                ) as HTMLInputElement
                              )?.value === ""
                            ) {
                              Swal.fire({
                                toast: true,
                                icon: "error",
                                title: "ساعت نمیتواند خالی باشد",
                                position: "top",
                                showConfirmButton: false,
                                timer: 3000,
                                timerProgressBar: true,
                              });
                            } else if (
                              (
                                document.getElementById(
                                  `${game.id}Minutes`
                                ) as HTMLInputElement
                              )?.value === ""
                            ) {
                              Swal.fire({
                                toast: true,
                                icon: "error",
                                title: "دقیقه نمیتواند خالی باشد",
                                position: "top",
                                showConfirmButton: false,
                                timer: 3000,
                                timerProgressBar: true,
                              });
                            } else {
                              let hourseTime: number = parseInt(
                                (
                                  document.getElementById(
                                    `${game.id}Hourse`
                                  ) as HTMLInputElement
                                )?.value
                              );
                              let minutesTime: number = parseInt(
                                (
                                  document.getElementById(
                                    `${game.id}Minutes`
                                  ) as HTMLInputElement
                                )?.value
                              );
                              setReceiptGame([
                                ...receiptGame,
                                {
                                  name: game.name,
                                  timeHourse: hourseTime,
                                  timeMinutes: minutesTime,
                                  price: Math.ceil(
                                    hourseTime * parseInt(game.price) +
                                      (minutesTime * parseInt(game.price)) / 60
                                  ),
                                },
                              ]);
                              (
                                document.getElementById(
                                  `${game.id}Hourse`
                                ) as HTMLInputElement
                              ).value = "";
                              (
                                document.getElementById(
                                  `${game.id}Minutes`
                                ) as HTMLInputElement
                              ).value = "";
                            }
                          }}
                        >
                          <FaCartPlus />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="menu_receipt">
            <label className="menu_receipt_label">رسید</label>
            <div className="menu_receipt_value">
              <label className="menu_receipt_value_label">کافه بازینو</label>
              {receiptFood.length ? (
                <>
                  <label className="menu_receipt_value_food_label">غذا</label>
                  <div className="menu_receipt_value_food">
                    <div className="menu_receipt_value_food_top">
                      <label className="menu_receipt_value_food_top_name">
                        نام
                      </label>
                      <label className="menu_receipt_value_food_top_number">
                        تعداد
                      </label>
                      <label className="menu_receipt_value_food_top_price">
                        قیمت
                      </label>
                    </div>

                    {receiptFood.map((receiptFood) => {
                      return (
                        <div className="menu_receipt_value_food_bottom">
                          <label className="menu_receipt_value_food_bottom_name">
                            {receiptFood.name}
                          </label>
                          <label className="menu_receipt_value_food_bottom_number">
                            {receiptFood.number}
                          </label>
                          <label className="menu_receipt_value_food_bottom_price">
                            {addCharacterEveryThreeChars(
                              `${convertToPersianNumber(
                                String(receiptFood.price)
                              )}`,
                              "/"
                            )}{" "}
                            تومان
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <></>
              )}
              {receiptGame.length ? (
                <>
                  <label className="menu_receipt_value_food_label">بازی</label>
                  <div className="menu_receipt_value_food">
                    <div className="menu_receipt_value_food_top">
                      <label className="menu_receipt_value_food_top_name">
                        نام
                      </label>
                      <label className="menu_receipt_value_food_top_number">
                        زمان
                      </label>
                      <label className="menu_receipt_value_food_top_price">
                        قیمت
                      </label>
                    </div>

                    {receiptGame.map((receiptGame) => {
                      return (
                        <div className="menu_receipt_value_food_bottom">
                          <label className="menu_receipt_value_food_bottom_name">
                            {receiptGame.name}
                          </label>
                          <label className="menu_receipt_value_food_bottom_number">
                            {receiptGame.timeMinutes} : {receiptGame.timeHourse}
                          </label>
                          <label className="menu_receipt_value_food_bottom_price">
                            {addCharacterEveryThreeChars(
                              `${convertToPersianNumber(
                                String(receiptGame.price)
                              )}`,
                              "/"
                            )}{" "}
                            تومان
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <></>
              )}
              {receiptFood.length || receiptGame.length ? (
                <div className="menu_receipt_value_sum">
                  <label>جمع :</label>
                  <label>
                    {addCharacterEveryThreeChars(
                      `${convertToPersianNumber(
                        String(sumReceipt(receiptGame, receiptFood))
                      )}`,
                      "/"
                    )}{" "}
                    تومان
                  </label>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="menu_receipt_buttons">
              <button className="menu_receipt_buttons_print">
                <IoPrint />
              </button>
              <button
                className="menu_receipt_buttons_cancel"
                onClick={() => {
                  setReceiptFood([]);
                  setReceiptGame([]);
                }}
              >
                <GiCancel />
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Menu;
