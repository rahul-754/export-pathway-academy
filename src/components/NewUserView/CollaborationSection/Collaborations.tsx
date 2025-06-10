import image1 from "./images/ficci.png";
import image2 from "./images/apeda.png";
import image3 from "./images/ftcci.png";
import image4 from "./images/tgfps.png";
import image5 from "./images/tn.png";
import image6 from "./images/tpci.png";

const staticData = [
  {
    id: 1,
    image: image1,
    alt: "ficci",
  },
  {
    id: 2,
    image: image2,
    alt: "apeda",
  },
  {
    id: 3,
    image: image3,
    alt: "ftcci",
  },
  {
    id: 4,
    image: image4,
    alt: "tgfps",
  },
  {
    id: 5,
    image: image5,
    alt: "tn",
  },
  {
    id: 6,
    image: image6,
    alt: "tpci",
  },
];

export default function Collaborations() {
  return (
    <div className="space-y-3 py-5 w-full max-w-[1400px] mx-auto">
      <h2 className="text-center text-4xl text-blue-600 font-bold tracking-tighter">
        Our Trusted Partners
      </h2>
      <h3 className="text-center text-xl tracking-tighter">
        Strategic Partnerships with Government Trade Bodies and Export
        Authorities
      </h3>
      <div className="flex flex-wrap gap-20 justify-center items-center p-5 mt-2">
        {staticData.map((obj) => (
          <img
            key={obj.id}
            src={obj.image}
            alt={obj.alt}
            className="w-28 aspect-square grayscale object-contain"
          />
        ))}
      </div>
    </div>
  );
}
