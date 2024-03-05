// import { useState, useEffect } from "react";
import "./style.css";
import { Tabs } from "antd-mobile";

import { useTabs } from "./useTabs";
const Home = () => {
  const { channels } = useTabs();
  return (
    <div>
      <div className="tabContainer">
        <Tabs>
          {channels.map((item) => {
            return (
              <Tabs.Tab title={item.name} key={item.id}>
                菠萝
              </Tabs.Tab>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
