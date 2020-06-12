/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";
// core components

function IndexHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/family_masked.jpg") + ")"
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="content-center brand">
            <img
              alt="..."
              className="n-logo"
              src={require("assets/img/watchOut.png")}
              style={{
                maxWidth: 200
              }}
            ></img>
            <h4>Protecting Yourself is THE BEST vaccine for COVID-19</h4>
          </div>
          
          <h5 className="category category-absolute">

            Coded by{" "}

            <img
              alt="..."
              className="invision-logo"
              style={{
                maxWidth: 40
              }}
              src={require("assets/img/now-logo.png")}
            ></img>

            <a
              href="https://github.com/team-CamelCase"
              target="_blank"
              style={{
                color : 'rgba(255, 255, 255, 0.5)'
              }}>
              Team CamelCase.
            </a>

              {" "}Supported by{" "}

            <a
              href="https://cloud.ibm.com/"
              target="_blank"
            >
              <img
                alt="..."
                className="creative-tim-logo"
                style={{
                  maxWidth: 40
                }}
                src={require("assets/img/ibm_logo.png")}
              ></img>
            </a>
            .
          </h5>
        </Container>
      </div>
    </>
  );
}

export default IndexHeader;
