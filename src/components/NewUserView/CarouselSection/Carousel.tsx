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
    link: "",
  },
  {
    img: curosal2,
    heading: "Use AI to increase your Exports",
    subHeading: "Use AI to automate, analyze, and grow exports faster.",
    link: "",
  },
  {
    img: curosal3,
    heading: "Join our AI Export Success Mastery Course",
    subHeading: "Subscribe now and start mastering AI for exports.",
    link: "",
  },
];

export default function CarouselSection() {
  return (
    <Carousel
      showThumbs={false}
      infiniteLoop
      className="rounded-lg shadow-lg w-full max-w-[1400px] mx-auto"
      showStatus={false}
      showIndicators={true}
      stopOnHover={false}
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
          <div className="relative w-full h-96">
            <img
              src={obj.img}
              alt={`Carousel Image ${index + 1}`}
              className="w-full h-96 object-cover"
            />
            <div className="absolute top-1/2 left-0 gap-3 transform -translate-y-1/2 bg-white/50  text-gray-800 rounded-lg shadow-md w-full ml-16 max-w-[500px] py-5 px-6 flex flex-col">
              <h3 className="text-4xl font-bold text-start leading-tight">
                {obj.heading}
              </h3>
              <p className="text-md text-start tracking-tight leading-tight">
                {obj.subHeading}
              </p>
              <a
                href={obj.link}
                className="bg-blue-600 font-bold hover:bg-blue-600 transition-colors text-white px-5 py-2 mt-2 rounded-sm w-fit"
              >
                View Plans
              </a>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}
