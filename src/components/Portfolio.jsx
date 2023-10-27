import web from "../images/web.svg";
import { FaEye, FaGithub } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import 'swiper/css/bundle'
import "swiper/css/pagination";
import { Pagination } from "swiper";

const Portfolio = () => {
  const style = {
    portfolio: {
      width: "100vw",
      padding: "40px 10%",
      position: "relative",
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

  return (
    <div className="portfolio" style={style.portfolio}>
      <h1 className="underline" style={{ marginBottom: "40px" }}>
        Some of the <span className="animate-text">awesome</span> things i have
        built
      </h1>

      {viewport > 600 ? (
        <section>
          <div className="portfolio-item">
            <img src={web} alt="" />
            <div className="overlay">
              <h5>A shoe color drop using HTML & JS.</h5>
              <a
                href="https://vercel.com/markadrian6399/shoe-drop"
                target="blank"
              >
                <FaEye className="portfolio-icons" />
              </a>
              <a
                href="https://github.com/Markadrian6399/shoe-drop"
                target="blank"
              >
                <FaGithub className="portfolio-icons" />
              </a>
            </div>
          </div>
          <div className="portfolio-item">
            <img src={web} alt="" />
            <div className="overlay">
              <h5>E-commerce store.</h5>
              <a
                href="https://vercel.com/markadrian6399/online-store"
                target="blank"
              >
                <FaEye className="portfolio-icons" />
              </a>
              <a
                href="https://github.com/Markadrian6399/online-store"
                target="blank"
              >
                <FaGithub className="portfolio-icons" />
              </a>
            </div>
          </div>
          <div className="portfolio-item">
            <img src={web} alt="" />
            <div className="overlay">
              <h5>Todo app.</h5>
              <a
                href="https://vercel.com/markadrian6399/todo-apk"
                target="blank"
              >
                <FaEye className="portfolio-icons" />
              </a>
              <a
                href="https://github.com/Markadrian6399/todo-apk"
                target="blank"
              >
                <FaGithub className="portfolio-icons" />
              </a>
            </div>
          </div>
          <div className="portfolio-item">
            <img src={web} alt="" />
            <div className="overlay">
              <h5>Music player.</h5>
              <a href="#a" target="blank">
                <FaEye className="portfolio-icons" />
              </a>
              <a
                href="https://github.com/Markadrian6399/mix-musik"
                target="blank"
              >
                <FaGithub className="portfolio-icons" />
              </a>
            </div>
          </div>
          <div className="portfolio-item">
            <img src={web} alt="" />
            <div className="overlay">
              <h5>photo E-Gallery.</h5>
              <a
                href="https://vercel.com/markadrian6399/ecom-client"
                target="blank"
              >
                <FaEye className="portfolio-icons" />
              </a>
              <a href="https://github.com/Markadrian6399/Ecom" target="blank">
                <FaGithub className="portfolio-icons" />
              </a>
            </div>
          </div>
          <div className="portfolio-item">
            <img src={web} alt="" />
            <div className="overlay">
              <h5>Lorem ipsum dolor sit amet.</h5>
              <a href="#a" target="blank">
                <FaEye className="portfolio-icons" />
              </a>
              <a href="#a" target="blank">
                <FaGithub className="portfolio-icons" />
              </a>
            </div>
          </div>
        </section>
      ) : (
        <section>
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            scrollbar={true}
            className="swiper"
            spaceBetween={50}
          >
            <SwiperSlide className="slides">
              <div className="portfolio-item">
                <img src={web} alt="" />
                <p>slide 1</p>
                <div className="overlay">
                  <h5>Lorem ipsum dolor sit amet.</h5>
                  <a href="#a" target="blank">
                    <FaEye className="portfolio-icons" />
                  </a>
                  <a href="#a" target="blank">
                    <FaGithub className="portfolio-icons" />
                  </a>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="slides">
              <div className="portfolio-item">
                <img src={web} alt="" />
                <div className="overlay">
                  <h5>Lorem ipsum dolor sit amet.</h5>
                  <a href="#a" target="blank">
                    <FaEye className="portfolio-icons" />
                  </a>
                  <a href="#a" target="blank">
                    <FaGithub className="portfolio-icons" />
                  </a>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="slides">
              <div className="portfolio-item">
                <img src={web} alt="" />
                <div className="overlay">
                  <h5>Lorem ipsum dolor sit amet.</h5>
                  <a href="#a" target="blank">
                    <FaEye className="portfolio-icons" />
                  </a>
                  <a href="#a" target="blank">
                    <FaGithub className="portfolio-icons" />
                  </a>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="slides">
              <div className="portfolio-item">
                <img src={web} alt="" />
                <div className="overlay">
                  <h5>Lorem ipsum dolor sit amet.</h5>
                  <a href="#a" target="blank">
                    <FaEye className="portfolio-icons" />
                  </a>
                  <a href="#a" target="blank">
                    <FaGithub className="portfolio-icons" />
                  </a>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </section>
      )}
    </div>
  );
};

export default Portfolio;
