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
    heading: "Practical, Hands-On Learning",
    subheading:
      "Work on real-world export scenarios—build websites, craft outreach, and automate tasks with AI tools you can start using immediately.",
    img: image1,
    icon: "",
  },
  {
    id: 2,
    heading: "Certification-Backed Credibility",
    subheading:
      "Earn a verifiable certificate that showcases your AI-enabled export marketing skills and builds trust with global buyers and partners.",
    img: image2,
    icon: "",
  },
  {
    id: 3,
    heading: "Expert-Led, Insight-Rich Sessions",
    subheading:
      "Stay ahead with actionable insights from export consultants, global trade data, and proven strategies used by successful exporters.",
    img: image3,
    icon: "",
  },
  {
    id: 4,
    heading: "AI-Driven Skill Acceleration",
    subheading:
      "Use AI to fast-track learning, personalize outputs, and turn complex digital tasks into simplified, scalable workflows.",
    img: image4,
    icon: "",
  },
];

export default function Goals() {
  const [selectedItem, setSelectedItem] = useState<ListItem>(staticData[0]);

  return (
    <section className="py-10 bg-neutral-200/30">
      <div className="space-y-10 px-10 w-full max-w-[1600px] mx-auto">
        <h2 className="font-bold text-4xl">Learning focused on your goals</h2>
        <div className="flex gap-5 justify-between items-center ">
          <div className="space-y-5">
            {staticData.map((obj, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setSelectedItem(obj)}
                  className={`space-y-1 max-w-[700px] cursor-pointer border p-5 bg-white ${
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
            className="w-full max-w-[500px] aspect-square"
          />
        </div>
      </div>
    </section>
  );
}
