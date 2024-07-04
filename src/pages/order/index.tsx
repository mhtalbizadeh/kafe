import React, { useEffect, useState } from "react";
import Layout from "../../component/layout";
import GetFood from "../../api/food/get";
import GetGame from "../../api/game/get";
import GetChartOrder from "../../api/order/postData";
import "./sass/_orderPage.scss";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import GetChartOrderAll from "../../api/order/postAllData";
import CustomTooltip from "./toolTip";

const Orders = () => {
  const [chartName, setChartName] = useState<
    {
      name: string;
      date: string;
      price: number;
    }[]
  >([]);
  const [chartAll, setChartAll] = useState<
    {
      date: string;
      price: number;
    }[]
  >([]);
  const month: { label: number; value: string }[] = [
    { label: 1, value: "فروردین" },
    { label: 2, value: "اردیبهشت" },
    { label: 3, value: "خرداد" },
    { label: 4, value: "تیر" },
    {
      label: 5,
      value: "مرداد",
    },
    { label: 6, value: "شهریور" },
    { label: 7, value: "مهر" },
    { label: 8, value: "آبان" },
    { label: 9, value: "آذر" },
    { label: 10, value: "دی" },
    { label: 11, value: "بهمن" },
    { label: 12, value: "اسفند" },
  ];
  const [food, setFood] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [game, setGame] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const [currentYear, setCurrentYear] = useState<number>(
    parseInt(
      new Intl.DateTimeFormat("en-US-u-ca-persian", {
        year: "numeric",
      }).format(new Date())
    )
  );
  const [currentMonth, setCurrentMonth] = useState<number>(
    parseInt(
      new Intl.DateTimeFormat("en-US-u-ca-persian", {
        month: "numeric",
      }).format(new Date())
    )
  );
  const year: number = parseInt(
    new Intl.DateTimeFormat("en-US-u-ca-persian", {
      year: "numeric",
    }).format(new Date())
  );

  const generateYearsArray: { year: number }[] = Array.from(
    { length: 11 },
    (_, index) => ({
      year: year - index,
    })
  );
  const farvardin = require("farvardin");
  const [startDate, setStartDate] = useState<string>(
    farvardin.solarToGregorian(currentYear, currentMonth, 1, "string")
  );
  function lastEndDay(month: number) {
    if (month <= 6) {
      return 31;
    } else if (month === 12) {
      return 29;
    } else {
      return 30;
    }
  }
  const [endDate, setEndDate] = useState<string>(
    farvardin.solarToGregorian(
      currentYear,
      currentMonth,
      lastEndDay(currentMonth),
      "string"
    )
  );
  const [name, setName] = useState<string | undefined>(undefined);
  useEffect(() => {
    const fetch = async () => {
      try {
        const food = await GetFood();
        if (food && food.status === 200) {
          setFood(
            food.body.map(
              (games: { id: number; name: string; price: number }) => {
                return { label: games.name, value: games.name };
              }
            )
          );
        }
        const game = await GetGame();
        if (game && game.status === 200) {
          setGame(
            game.body.map(
              (games: { id: number; name: string; price: number }) => {
                return { label: games.name, value: games.name };
              }
            )
          );
        }
        if (name !== undefined) {
          const chart = await GetChartOrder({
            name: name,
            start_date: startDate,
            end_date: endDate,
          });
          if (chart && chart?.status === 200) {
            setChartName(chart.body);
          }
        } else {
          const chart = await GetChartOrderAll({
            start_date: startDate,
            end_date: endDate,
          });
          if (chart && chart?.status === 200) {
            setChartAll(chart.body);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [endDate, name, startDate]);
  return (
    <>
      <Layout>
        <div className="order">
          <div className="order_head">
            <select
              id="game-order"
              onChange={(e) => {
                const foodGame = document.getElementById(
                  "food-order"
                ) as HTMLSelectElement;
                if (foodGame) {
                  foodGame.value = "";
                }
                if (e.currentTarget.value === "") {
                  setName(undefined);
                } else {
                  setName(e.currentTarget.value);
                }
              }}
            >
              <option value="" selected>
                بازی
              </option>
              {game.map((game) => {
                return <option value={game.value}>{game.label}</option>;
              })}
            </select>
            <select
              id="food-order"
              onChange={(e) => {
                const gameSelect = document.getElementById(
                  "game-order"
                ) as HTMLSelectElement;
                if (gameSelect) {
                  gameSelect.value = "";
                }
                if (e.currentTarget.value === "") {
                  setName(undefined);
                } else {
                  setName(e.currentTarget.value);
                }
              }}
            >
              <option value="" selected>
                خوراکی
              </option>
              {food.map((food) => {
                return <option value={food.value}>{food.label}</option>;
              })}
            </select>
            <select
              onChange={(e) => {
                setStartDate(
                  farvardin.solarToGregorian(
                    e.currentTarget.value,
                    currentMonth,
                    1,
                    "string"
                  )
                );
                setEndDate(
                  farvardin.solarToGregorian(
                    e.currentTarget.value,
                    currentMonth,
                    lastEndDay(currentMonth),
                    "string"
                  )
                );
                setCurrentYear(parseInt(e.currentTarget.value));
              }}
            >
              {generateYearsArray.map((year) => {
                return (
                  <option
                    value={year.year}
                    selected={year.year === currentYear}
                  >
                    {year.year}
                  </option>
                );
              })}
            </select>
            <select
              onChange={(e) => {
                setStartDate(
                  farvardin.solarToGregorian(
                    currentYear,
                    e.currentTarget.value,
                    1,
                    "string"
                  )
                );
                setEndDate(
                  farvardin.solarToGregorian(
                    currentYear,
                    e.currentTarget.value,
                    lastEndDay(currentMonth),
                    "string"
                  )
                );
                setCurrentMonth(parseInt(e.currentTarget.value));
              }}
            >
              {month.map((month) => {
                return (
                  <option
                    value={month.label}
                    selected={month.label === currentMonth}
                  >
                    {month.value}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="order_chart">
            <ResponsiveContainer width="100%" height="100%">
              {name !== undefined ? (
                <LineChart
                  width={500}
                  height={300}
                  data={chartName}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis dataKey="price" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    stroke="#ffe002"
                    activeDot={{ r: 6 }}
                    dataKey={"price"}
                  />
                </LineChart>
              ) : (
                <LineChart
                  width={500}
                  height={300}
                  data={chartAll}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="1 1" />
                  <XAxis dataKey="date" />
                  <YAxis dataKey="price" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    stroke="#ffe002"
                    activeDot={{ r: 6 }}
                    dataKey={"price"}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Orders;
