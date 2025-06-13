import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import curosal1 from "../../ect.jpg";
import curosal2 from "../../ect (1).jpg";
import curosal3 from "../../ect (2).jpg";

const staticData = [
  {
    img: curosal1,
    heading: "Work Smarter, Export Faster",
    subHeading: "Master AI Tools to Grow Your Global Exports",
    subHeading2:
      "Learn how to automate research, discover buyers, and scale international trade operations with cutting-edge AI. Stay ahead in today’s competitive market.",
  },
  {
    img: curosal2,
    heading: "Automate & Accelerate Your Export Business",
    subHeading: "Use AI to Cut Manual Work and Boost Results",
    subHeading2:
      "From lead generation to email writing—save time, reduce costs, and grow smarter with AI-driven export solutions.",
  },
  {
    img: curosal3,
    heading: "Join the AI Export Success Bootcamp",
    subHeading: "Start Building Global-Ready Skills in Just Days",
    subHeading2:
      "Learn practical, easy-to-apply AI tools built for exporters. No coding, no jargon—just powerful strategies for global growth.",
  },
];

export default function CarouselSection() {
  return (
    <Carousel
      showThumbs={false}
      infiniteLoop={true}
      autoPlay
      className=" shadow-lg w-full max-w-[1520px] mx-auto"
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
      {staticData.map((obj, index) => {
        return (
          <div key={index} className="relative w-full md:h-[600px] h-[300px]">
            <img
              src={obj.img}
              alt={`Carousel Image ${index + 1}`}
              className="w-full h-full object-cover brightness-75"
            />
            <div className="absolute top-1/2 left-0 gap-3 transform -translate-y-1/2  text-white rounded-lg max-w-[1000px] w-full ml-16  py-5 px-6 flex flex-col">
              <h3 className="md:text-6xl text-3xl font-bold text-start leading-tight">
                {obj.heading}
              </h3>
              <p className="md:text-2xl text-lg mt-10 text-start tracking-tight leading-tight font-semibold">
                {obj.subHeading}
              </p>
              <p className="md:text-lg text-md text-start tracking-tight leading-tight max-w-[700px]">
                {obj.subHeading2}
              </p>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}
