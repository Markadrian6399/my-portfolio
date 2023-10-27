import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";

const Skills = () => {
  const theme = useSelector((state) => state.theme.value);
  const { ref: myRef, inView: elementVisible } = useInView();
  // console.log(elementVisible);

  const style = {
    skills: {
      width: "100vw",
      padding: "40px 10%",
      position: "relative",
      background: theme === "light" ? `` : "none",
    },
    circle: {
      stroke: theme === "light" ? "lime" : "lime",
      strokeWidth: theme === "light" ? "2" : "2",
    },
    skill: {
      color: theme === "light" ? "white" : "",
      background: theme === "light" ? "rgba(66,62,62,1)" : "",
    },
  };
  return (
    <div className="area" style={style.skills} ref={myRef}>
      <h1 className="underline">Skills</h1>
      <div className="skills" style={{ marginTop: "40px" }}>
        <div className="skill" style={style.skill}>
          <div className="percent">
            <div className="skill-dot" id={elementVisible ? "dot" : ""}></div>
            <svg>
              <circle cx="70" cy="70" r="70" />
              <circle
                cx="70"
                cy="70"
                r="70"
                style={style.circle}
                id={elementVisible ? "circle-fade" : ""}
              />
            </svg>
          </div>
          <div className="num">
            <h2>
              90<span>%</span>
            </h2>
            <p>HTML</p>
          </div>
        </div>
        <div className="skill" style={style.skill}>
          <div className="percent">
            <div className="skill-dot" id={elementVisible ? "dot" : ""}></div>
            <svg>
              <circle cx="70" cy="70" r="70" />
              <circle
                cx="70"
                cy="70"
                r="70"
                style={style.circle}
                id={elementVisible ? "circle-fade" : ""}
              />
            </svg>
          </div>
          <div className="num">
            <h2>
              90<span>%</span>
            </h2>
            <p>CSS</p>
          </div>
        </div>
        <div className="skill" style={style.skill}>
          <div className="percent">
            <div className="skill-dot" id={elementVisible ? "dot" : ""}></div>
            <svg>
              <circle cx="70" cy="70" r="70" />
              <circle
                cx="70"
                cy="70"
                r="70"
                style={style.circle}
                id={elementVisible ? "circle-fade" : ""}
              />
            </svg>
          </div>
          <div className="num">
            <h2>
              90<span>%</span>
            </h2>
            <p>TAILWIND</p>
          </div>
        </div>
        <div className="skill" style={style.skill}>
          <div className="percent">
            <div className="skill-dot" id={elementVisible ? "dot" : ""}></div>
            <svg>
              <circle cx="70" cy="70" r="70" />
              <circle
                cx="70"
                cy="70"
                r="70"
                style={style.circle}
                id={elementVisible ? "circle-fade" : ""}
              />
            </svg>
          </div>
          <div className="num">
            <h2>
              85<span>%</span>
            </h2>
            <p>JAVASCRIPT</p>
          </div>
        </div>
        <div className="skill" style={style.skill}>
          <div className="percent">
            <div className="skill-dot" id={elementVisible ? "dot" : ""}></div>
            <svg>
              <circle cx="70" cy="70" r="70" />
              <circle
                cx="70"
                cy="70"
                r="70"
                style={style.circle}
                id={elementVisible ? "circle-fade" : ""}
              />
            </svg>
          </div>
          <div className="num">
            <h2>
              90<span>%</span>
            </h2>
            <p>REACT JS</p>
          </div>
        </div>
        <div className="skill" style={style.skill}>
          <div className="percent">
            <div className="skill-dot" id={elementVisible ? "dot" : ""}>
              {" "}
            </div>
            <svg>
              <circle cx="70" cy="70" r="70" />
              <circle
                cx="70"
                cy="70"
                r="70"
                style={style.circle}
                id={elementVisible ? "circle-fade" : ""}
              />
            </svg>
          </div>
          <div className="num">
            <h2>
              85<span>%</span>
            </h2>
            <p>MERN</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
