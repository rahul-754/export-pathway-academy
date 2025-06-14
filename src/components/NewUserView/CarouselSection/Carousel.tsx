import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const staticData = [
  {
    img: "bg-[url(ect-1.jpg)]",
    heading: "Work Smarter, Export Faster",
    subHeading: "Master AI Tools to Grow Your Global Exports",
    subHeading2:
      "Learn how to automate research, discover buyers, and scale international trade operations with cutting-edge AI. Stay ahead in today’s competitive market.",
  },
  {
    img: "bg-[url(ect-2.jpg)]",
    heading: "Automate & Accelerate Your Export Business",
    subHeading: "Use AI to Cut Manual Work and Boost Results",
    subHeading2:
      "From lead generation to email writing—save time, reduce costs, and grow smarter with AI-driven export solutions.",
  },
  {
    img: "bg-[url(ect-3.jpg)]",
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
          <div
            key={index}
            className={`relative w-full md:h-[600px] h-[500px] ${obj.img} bg-no-repeat bg-cover bg-right`}
          >
            {/* <img
              src={obj.img}
              alt={`Carousel Image ${index + 1}`}
              className="w-full h-full object-cover brightness-75 st"
            /> */}
            <div className="absolute top-0 left-0 gap-3  text-white  bg-black/70 h-full justify-center w-full  py-5 md:px-16 px-10 flex flex-col">
              <h3 className="md:text-6xl text-4xl font-bold text-start leading-tight max-w-[1000px]">
                {obj.heading}
              </h3>
              <p className="md:text-2xl text-xl md:mt-10 mt-5 text-start tracking-tight leading-tight font-bold">
                {obj.subHeading}
              </p>
              <p className="md:text-lg text-sm text-start tracking-tight leading-tight max-w-[700px]">
                {obj.subHeading2}
              </p>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}
