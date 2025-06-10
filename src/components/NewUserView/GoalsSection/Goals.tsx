import { useState } from "react";

import image1 from "./images/image1.webp";
import image2 from "./images/image2.webp";
import image3 from "./images/image3.webp";
import image4 from "./images/image4.webp";

type ListItem = {
  id: number;
  heading: string;
  subheading: string;
  img: string;
  icon: string;
};

const staticData: ListItem[] = [
  {
    id: 1,
    heading: "Hands-on training",
    subheading:
      "Engage in practical exercises to reinforce key concepts and build real-world skills.",
    img: image1,
    icon: "",
  },
  {
    id: 2,
    heading: "Certification Prep",
    subheading:
      "Get ready for industry-recognized certifications with expert-curated materials and mock exams.",
    img: image2,
    icon: "",
  },
  {
    id: 3,
    heading: "Insights",
    subheading:
      "Gain valuable knowledge from industry trends, expert advice, and data-driven analysis.",
    img: image3,
    icon: "",
  },
  {
    id: 4,
    heading: "AI Enhanced learning",
    subheading:
      "Leverage the power of AI to personalize your learning journey and accelerate outcomes.",
    img: image4,
    icon: "",
  },
];

export default function Goals() {
  const [selectedItem, setSelectedItem] = useState<ListItem>(staticData[0]);

  return (
    <section className="py-10 bg-neutral-200/30">
      <div className="space-y-10 w-full max-w-[1400px] mx-auto">
        <h2 className="font-bold text-4xl">Learning focused on your goals</h2>
        <div className="flex gap-5 justify-between items-center ">
          <div className="space-y-5">
            {staticData.map((obj) => {
              return (
                <div
                  onClick={() => setSelectedItem(obj)}
                  className={`space-y-1 max-w-[550px] cursor-pointer border p-5 bg-white ${
                    selectedItem.id === obj.id &&
                    "shadow-md border-l-[6px] border-blue-600"
                  } transition-all hover:shadow-md hover:border-blue-600 rounded-lg`}
                >
                  <h5 className="font-semibold tracking-tighter capitalize text-lg">
                    {obj.heading}
                  </h5>
                  <p>{obj.subheading}</p>
                </div>
              );
            })}
          </div>
          <img
            src={selectedItem.img}
            alt={selectedItem.id + ""}
            className="w-full max-w-[600px] aspect-square"
          />
        </div>
      </div>
    </section>
  );
}
