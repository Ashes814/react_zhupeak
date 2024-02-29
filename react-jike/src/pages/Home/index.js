import * as echarts from "echarts";
import { useEffect, useRef } from "react";
import BarChart from "./components/BarChart";

const Home = () => {
  return (
    <div>
      <BarChart title={"1111"} />
      <BarChart title={"Framework Popularity"} />
    </div>
  );
};

export default Home;
