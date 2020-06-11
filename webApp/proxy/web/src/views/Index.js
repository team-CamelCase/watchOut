import React, { useEffect, useState } from "react";

// reactstrap components
// import {
// } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DarkFooter from "components/Footers/DarkFooter.js";
import { observer, inject } from "mobx-react";
// sections for this page
import Images from "./index-sections/Images.js";
import BasicElements from "./index-sections/BasicElements.js";
import Navbars from "./index-sections/Navbars.js";
import NewsSection from "./index-sections/NewsSection";
import Pagination from "./index-sections/Pagination.js";
import Notifications from "./index-sections/Notifications.js";
import Typography from "./index-sections/Typography.js";
import Javascript from "./index-sections/Javascript.js";
import Carousel from "./index-sections/Carousel.js";
import NucleoIcons from "./index-sections/NucleoIcons.js";
import CompleteExamples from "./index-sections/CompleteExamples.js";
import SignUp from "./index-sections/SignUp.js";
import Examples from "./index-sections/Examples.js";
import Download from "./index-sections/Download.js";

const Index = inject("store")(
  observer((props) => {

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

      async function init() {
        try {

          const localInfo = await props.store.getLocalInfo()

          props.store.set("userCity", localInfo.city)
          props.store.set("userCountry", localInfo.country)

          console.log("check", localInfo.city, localInfo.country)


        } catch (err) {
          alert(err)
        }
      }
      init()

      document.body.classList.add("index-page");
      document.body.classList.add("sidebar-collapse");
      document.documentElement.classList.remove("nav-open");
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;

      return function cleanup() {
        document.body.classList.remove("index-page");
        document.body.classList.remove("sidebar-collapse");
      };

    });
    return (
      <React.Fragment>

        <div className="wrapper">
          <IndexHeader />
          <div className="main">
            {isLoading ? 
              "Loading..."
              :
              <NewsSection />
            }
          </div>
          <DarkFooter />
        </div>
      </React.Fragment>


    );
  }))

export default Index;


          //     {/* <Images /> */}
          //     {/* <BasicElements />
          // <Navbars /> */}
          //     {/* <Pagination />
          // <Notifications />
          // <Typography />
          // <Javascript />
          // <Carousel />
          // <NucleoIcons />
          // <CompleteExamples />
          // <SignUp />
          // <Examples />
          // <Download /> */}