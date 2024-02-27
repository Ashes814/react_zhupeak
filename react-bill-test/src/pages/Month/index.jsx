import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavBar, DatePicker } from "antd-mobile";
import classNames from "classnames";
import dayjs from "dayjs";
import _ from "lodash";
import DailyBill from "./components/DayBill";

import "./index.scss";

const Month = () => {
  const [dateVisible, setDateVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format("YYYY | MM");
  });
  const [currentMonthList, setCurrentMonthList] = useState([]); // 当前月份的账单列表
  const billList = useSelector((state) => state.bill.billList);

  const monthGroup = useMemo(() => {
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY | MM"));
  }, [billList]);

  const dayGroup = useMemo(() => {
    const groupData = _.groupBy(currentMonthList, (item) =>
      dayjs(item.date).format("YYYY | MM-DD")
    );
    const keys = Object.keys(groupData);
    return { groupData, keys };
  }, [currentMonthList]);

  // console.log(billList);

  const monthResult = useMemo(() => {
    const pay = currentMonthList
      .filter((item) => item.type === "pay")
      .reduce((a, c) => a + c.money, 0);
    const income = currentMonthList
      .filter((item) => item.type === "income")
      .reduce((a, c) => a + c.money, 0);
    const total = pay + income;

    return { pay, income, total };
  }, [currentMonthList]);

  useEffect(() => {
    const nowDate = dayjs(new Date()).format("YYYY | MM");
    setCurrentMonthList(monthGroup[nowDate] || []);
  }, [monthGroup]);

  const onConfirm = (date) => {
    // console.log(date);
    setDateVisible(false);
    const formatDate = dayjs(date).format("YYYY | MM");
    setCurrentDate(formatDate);
    setCurrentMonthList(monthGroup[formatDate] || []);
  };

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">{currentDate}月账单</span>
            <span
              className={classNames("arrow", dateVisible && "expand")}
            ></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{monthResult.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            onCancel={() => setDateVisible(false)}
            onConfirm={onConfirm}
            onClose={() => setDateVisible(false)}
            max={new Date()}
          />
        </div>
        {/* Single Day Statistics */}
        {dayGroup.keys.map((key) => {
          return (
            <DailyBill
              key={key}
              date={key}
              billList={dayGroup.groupData[key]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Month;
