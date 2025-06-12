import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import curosal1 from "../../ect.jpg";
import curosal2 from "../../ect (1).jpg";
import curosal3 from "../../ect (2).jpg";

const staticcData = [
  {
    img: curosal1,
    heading: "Upgrade your Export Skills",
    subHeading: "Learn modern export tactics to unlock global markets.",
  },
  {
    img: curosal2,
    heading: "Use AI to increase your Exports",
    subHeading: "Use AI to automate, analyze, and grow exports faster.",
  },
  {
    img: curosal3,
    heading: "Join our AI Export Success Mastery Course",
    subHeading: "Subscribe now and start mastering AI for exports.",
  },
];

export default function CarouselSection() {
  return (
    <Carousel
      showThumbs={false}
      infiniteLoop={true}
      autoPlay
      className=" shadow- w-full max-w-[1520px] mx-auto pt-10"
      showStatus={false}
      showIndicators={true}
      stopOnHover={true}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            className="absolute top-1/2 left-2 z-10 transform transition-opacity -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-100 text-gray-800 p-1 rounded-full shadow-md w-8 h-8 flex items-center justify-center" // Smaller size
          >
            ❮
          </button>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            className="absolute top-1/2 right-2 z-10 transform transition-opacity -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-100 text-gray-800 p-1 rounded-full shadow-md w-8 h-8 flex items-center justify-center" // Smaller size
          >
            ❯
          </button>
        )
      }
    >
      {staticcData.map((obj, index) => {
        return (
          <div key={index} className="relative w-full h-[600px]">
            <img
              src={obj.img}
              alt={`Carousel Image ${index + 1}`}
              className="w-full h-full object-cover brightness-75"
            />
            <div className="absolute top-1/2 left-0 gap-3 transform -translate-y-1/2  text-white rounded-lg max-w-[1000px] w-full ml-16  py-5 px-6 flex flex-col">
              <h3 className="text-6xl font-bold text-start leading-tight">
                {obj.heading}
              </h3>
              <p className="text-2xl text-start tracking-tight leading-tight">
                {obj.subHeading}
              </p>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}
