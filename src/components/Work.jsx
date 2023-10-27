import { useState, useEffect } from "react";
import { Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";

const Work = () => {
  const style = {
    work: {
      width: "100vw",
      padding: "40px 10%",
    },
  };
  const [viewport, setViewport] = useState("");

  useEffect(() => {
    window.addEventListener("resize", () => {
      const { innerWidth } = window;
      setViewport(innerWidth);
      // console.log(viewport)
    });
  }, [viewport]);

  useEffect(() => {
    setViewport(window.innerWidth);
  }, []);

  let btn = document.querySelectorAll("button");
  let currentIndex = null;

  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", (e) => {
      // console.log(btn[i]);
      e.target.classList.add("active-work");
      currentIndex = i;
      btn.forEach((a, index) => {
        if (index !== currentIndex) {
          a.classList.remove("active-work");
        }
      });
    });
  }

  const [option, setOption] = useState(1);

  return (
    <div className="work" style={style.work}>
      <h1 className="underline">Where I have worked</h1>

      <section className="works">
        {viewport > 600 ? (
          <div className="left">
            <button
              onClick={() => {
                setTimeout(() => {
                  setOption(1);
                }, 800);
              }}
              className="active-work"
            >
              Khemsafe
            </button>
            <button
              onClick={() => {
                setTimeout(() => {
                  setOption(2);
                }, 800);
              }}
            >
              Jopa LTD
            </button>
            <button
              onClick={() => {
                setTimeout(() => {
                  setOption(3);
                }, 800);
              }}
            >
              Space world tech
            </button>
            <button
              onClick={() => {
                setTimeout(() => {
                  setOption(3);
                }, 800);
              }}
            >
              Space world tech
            </button>
            <button
              onClick={() => {
                setTimeout(() => {
                  setOption(3);
                }, 800);
              }}
            >
              Space world tech
            </button>
          </div>
        ) : (
          <div className="left">
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              // scrollbar = {true}
              // className="swiper"
              spaceBetween={20}
            >
              <SwiperSlide>
                <button
                  onClick={() => {
                    setTimeout(() => {
                      setOption(1);
                    }, 800);
                  }}
                  className="active-work"
                >
                  Khemsafe
                </button>
              </SwiperSlide>
              <SwiperSlide>
                <button
                  onClick={() => {
                    setTimeout(() => {
                      setOption(1);
                    }, 800);
                  }}
                >
                  Jopa LTD
                </button>
              </SwiperSlide>
              <SwiperSlide>
                <button
                  onClick={() => {
                    setTimeout(() => {
                      setOption(1);
                    }, 800);
                  }}
                >
                  Space world tech
                </button>
              </SwiperSlide>
              <SwiperSlide>
                <button
                  onClick={() => {
                    setTimeout(() => {
                      setOption(1);
                    }, 800);
                  }}
                >
                  Space world tech
                </button>
              </SwiperSlide>
              <SwiperSlide>
                <button
                  onClick={() => {
                    setTimeout(() => {
                      setOption(1);
                    }, 800);
                  }}
                >
                  Space world tech
                </button>
              </SwiperSlide>
            </Swiper>
          </div>
        )}

        <div className="right">
          {option === 1 && (
            <div className="myWork">
              <h3>Software Dev tutor @ Khemsafe</h3>
              <h5 style={{ fontSize: "14px", marginTop: "8px" }}>
                April 2021 - Present
              </h5>
              <div>
                <span>🍕 </span>
                <h4>
                  {" "}
                  I work in khemsafe as a software development tutor, where I
                  work with student with a variety of languages, platforms and
                  frameworks such as Javascript, React, Next.JS, Express.JS,
                  MongoDB, MongoDB Atlas, Netlify
                </h4>
              </div>
            </div>
          )}
          {option === 2 && (
            <div className="myWork">
              <h3>Graphics Designer @ Jopa Limited</h3>
              <h5 style={{ fontSize: "14px", marginTop: "8px" }}>2017</h5>
              <div>
                <span>🍕 </span>
                <h4>
                  {" "}
                  I worked in Jopa LTD as a graphics designer, where I work with
                  teams designers in the creation of graphics works such as
                  Magazine, Logos, and many more
                </h4>
              </div>
            </div>
          )}
          {option === 3 && (
            <div className="myWork">
              <h3>Computer Operator @ Space world Tech</h3>
              <h5 style={{ fontSize: "14px", marginTop: "8px" }}>
                April 2021 - Present
              </h5>
              <div>
                <span>🍕 </span>
                <h4>
                  {" "}
                  I worked in Space world Tech as a computer opertor, where I
                  was responsible for the day-to-day operation of computer
                  systems which includes Monitoring systems, Running batch jobs,
                  Troubleshooting and so much more
                </h4>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Work;
