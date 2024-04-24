import React, { useState } from "react";
import Layout from "../../component/layout";
import TabsButton from "../../component/tabsButton";
import "./sass/menu.scss";

const Menu = () => {
  const [activeTabs, setActiveTabs] = useState<string>("غذا");
  return (
    <>
      <Layout>
        <div className="menu">
          <div className="menu_content">
            <div>منو</div>
            <div>
              <TabsButton
                namsOfButton={["غذا", "بازی"]}
                activeButtons={1}
                setActiveTabs={setActiveTabs}
              />
            </div>
            <div></div>
          </div>
          <div className="menu_receipt">فیش</div>
        </div>
      </Layout>
    </>
  );
};

export default Menu;
