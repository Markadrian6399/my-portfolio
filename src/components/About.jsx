import { useSelector } from "react-redux";
import mern from "../images/mern.svg";
import web from "../images/web.svg";
import js from "../images/react.svg";
import free from "../images/free2.png";
import mobile from "../images/mob3.svg";

const About = () => {
  // const theme = useSelector(state => state.theme.value)
  const style = {
    about: {
      width: "100vw",
      padding: "40px 10%",
      zIndex: "999",
      // backgroundImage: theme === 'light'? 'url(http://localhost:3000/logo.jpg)' : '',
    },
    hi: {
      position: "relative",
      transform: "translateX(-50%)",
      left: "50%",
      width: "fit-content",
    },
  };
  return (
    <div className="about" style={style.about}>
      <h1 className="underline" style={{ marginBottom: "20px" }}>
        About Me
      </h1>
      <h1 className="colorText" style={style.hi}>
        <span style={{ fontSize: "44px" }}>HI</span> <br />I AM ODIBA MARK
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "50px",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <div className="about-card">
          <img src={free} alt="" style={{ objectFit: "contain" }} />
          <h2>Freelancer</h2>
          <p>
            freelance software developer with 5 years of experience. I have
            expertise in software Engineering , and I'm skilled in developing
            web applications, mobile apps and Desktop Applications.
          </p>
        </div>
        <div className="about-card">
          <img src={web} alt="" />
          <h2>Web developer</h2>
          <p>
            versatile in designing web pages, and ensuring the functionality of
            website with varrious programming languages, such as HTM, CSS,
            Javascript, react, etc .
          </p>
        </div>
        <div className="about-card">
          <img src={mobile} alt="" />
          <h2>Mobile developer</h2>
          <p>
            Kownlage in creating a user-friendly and visually appealing
            interffaces for mobile app to enhance the user experience, and
            connecting moblie apps to backend service and databases, using APIs.
          </p>
        </div>
        <div className="about-card">
          <img src={js} alt="" style={{ objectFit: "contain" }} />
          <h2>Javascript Developer</h2>
          <p>
            Writing Javascript code to enhance the interactivity and
            functionality of web pages. Building complex web applications using
            JavaScript and related framework like React.
          </p>
        </div>
        <div className="about-card">
          <img src={mern} alt="" style={{ objectFit: "contain" }} />
          <h2>MERN stack</h2>
          <p>
            Good knowlage in MongoDB, Express.js, Nod.js. Design implement
            databases to store application data, using Node.js and Express.js to
            build the serev-side logic and usin APIs to connect the front-end
            and back-end, enabling data exchange and functionality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
