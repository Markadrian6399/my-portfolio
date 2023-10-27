import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import image from "../images/pro.png";
import react from "../images/react.png";
import html from "../images/html.png";
import css from "../images/css.png";
import mern from "../images/mern.jpg";
import js from "../images/node.jpg";
import tailwind from "../images/tailwind.png";
import javascript from "../images/javascript.png";
import mongo from "../images/mongo.png";
import web from "../images/web.png";
import mk from "../images/mk.png";
import HomeBackground from "../images/home.png";
import { FaCheckCircle } from "react-icons/fa";
import { useRef } from "react";

const Home = () => {
  const theme = useSelector((state) => state.theme.value);

  // const myRef = useRef()
  // const [elementVisible, SetElementVisible] = useState()

  const { ref: myRef, inView: elementVisible } = useInView();

  const secondRef = useRef();

  // console.log(secondRef.current);

  const homeStyle = {
    background: {
      backgroundImage: theme === "light" ? `url(${HomeBackground})` : "none",
      backgroundSize: "cover",
    },
  };
  const cardStyle = {
    flex: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
  };

  return (
    <div className="home" style={homeStyle.background} ref={myRef}>
      <div ref={secondRef}>
        <div className="p-logo">
          <img
            src={web}
            style={{ width: "90px", height: "90px", borderRadius: "50%" }}
            alt=""
          />
        </div>
        <div className="p-logo" id={elementVisible ? "p1" : ""}>
          <img
            src={html}
            style={{ width: "80px", borderRadius: "50%" }}
            alt=""
          />
        </div>
        <div className="p-logo" id={elementVisible ? "p2" : ""}>
          <img src={css} style={{ width: "80px" }} alt="" />
        </div>
        <div className="p-logo" id={elementVisible ? "p3" : ""}>
          <img src={mern} style={{ width: "80px" }} alt="" />
        </div>
        <div className="p-logo" id={elementVisible ? "p4" : ""}>
          <img src={js} style={{ width: "80px", borderRadius: "50%" }} alt="" />
        </div>
        <div className="p-logo" id={elementVisible ? "p5" : ""}>
          <img src={tailwind} style={{ width: "80px" }} alt="" />
        </div>
        <div className="p-logo" id={elementVisible ? "p6" : ""}>
          <img src={javascript} style={{ width: "80px" }} alt="" />
        </div>
        <div className="p-logo" id={elementVisible ? "p7" : ""}>
          <img
            src={mongo}
            style={{ width: "80px", height: "80px", borderRadius: "50%" }}
            alt=""
          />
        </div>
        <div className="p-logo" id={elementVisible ? "p8" : ""}>
          <img
            src={react}
            style={{ width: "80px", height: "80px", borderRadius: "50%" }}
            alt=""
          />
        </div>
      </div>
      <div className="profile-image">
        <div
          className="circle"
          id={elementVisible ? "profile-circle" : ""}
        ></div>
        <img src={mk} alt="" id={elementVisible ? "profile-image" : ""} />
      </div>
      <div>
        <div className="card hello" id={elementVisible ? "profile-image" : ""}>
          <span>👋</span>
          <div>
            <h1>HI</h1>
            <h3>I'm Mark Odiba</h3>
          </div>
        </div>
        <div
          className="card"
          style={{
            position: "absolute",
            padding: "10px 20px",
            width: "230px",
            transform: "translate(-230px, 70px)",
          }}
          id={elementVisible ? "profile-image" : ""}
        >
          <div
            style={{
              letterSpacing: "2px",
              lineHeight: "1.8",
            }}
          >
            <h5 style={cardStyle.flex}>
              {" "}
              <FaCheckCircle />
              Freelancer
            </h5>
            <h5 style={cardStyle.flex}>
              {" "}
              <FaCheckCircle />
              Web Developer
            </h5>
            <h5 style={cardStyle.flex}>
              <FaCheckCircle />
              Mobile Developer
            </h5>
            <h5 style={cardStyle.flex}>
              <FaCheckCircle />
              Javascript Developer
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
