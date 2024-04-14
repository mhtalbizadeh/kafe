import React from "react";
import "./sass/_homePage.scss";
import Layout from "../../component/layout";
const Home = () => {
  return (
    <>
      <Layout>
        <div className="home">
          <div className="home_top">
            <label>اضافه کردن / ویرایش</label>
          </div>
          <div className="home_bottom">
            <div className="home_bottom_element">
              <label className="home_bottom_element_label">دسته بندی غذا</label>
              <div className="home_bottom_element_data">
                {/* f */}
                <div className="home_bottom_element_data_category">
                  <div className="home_bottom_element_data_category_top">
                    نام دسته
                  </div>
                  <div className="home_bottom_element_data_category_bottom"></div>
                </div>
              </div>
            </div>
            <div className="home_bottom_element">
              <label className="home_bottom_element_label">غذا</label>
              <div>
                {/* f */}
                <div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
            <div className="home_bottom_element">
              <label className="home_bottom_element_label">بازی</label>
              <div>
                {/* f */}
                <div>
                  <div></div>
                  <div></div>
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
