import { Star } from "lucide-react";
import Marquee from "react-fast-marquee";

type Review = {
  id: string | number;
  name: string;
  review: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

const staticData: Review[] = [
  {
    id: 1,
    name: "Alex Johnson",
    review: "Good experience overall. Everything worked as expected.",
    rating: 3,
  },
  {
    id: 2,
    name: "Maria Gonzalez",
    review: "Really nice! Everything was smooth and well-organized.",
    rating: 4,
  },
  {
    id: 3,
    name: "Daniel Kim",
    review: "Exceptional from start to finish. Truly top-notch!",
    rating: 5,
  },
  {
    id: 4,
    name: "Sophie Liu",
    review: "Nice and easy process. Met my expectations well.",
    rating: 3,
  },
  {
    id: 5,
    name: "James Patel",
    review: "Very well done. I’m happy with the quality and care.",
    rating: 4,
  },
  {
    id: 6,
    name: "Fatima Al-Mansoori",
    review: "Great service and very professional. Would gladly use again!",
    rating: 4,
  },
  {
    id: 7,
    name: "Liam Smith",
    review: "Absolutely fantastic! Couldn't have asked for better.",
    rating: 5,
  },
];

export default function Reviews() {
  return (
    <div className="space-y-5 py-5 px-10 w-full max-w-[1600px] mx-auto">
      <h2 className="text-4xl font-bold">
        See what others are achieving through learning
      </h2>
      <Marquee pauseOnHover loop={0} className="overflow-hidden h-auto py-5">
        {staticData.map((obj) => {
          return (
            <div
              key={obj.id}
              className="rounded-lg hover:bg-blue-600 hover:shadow-lg group transition-colors p-10 shadow-md w-[400px] ml-5 border h-full  gap-3 flex flex-col justify-between"
            >
              <div className="space-y-5">
                <span className="text-9xl select-none group-hover:text-white transition-colors">
                  &#8220;
                </span>
                <h5
                  title={obj.review}
                  className="text-neutral-700 text-2xl line-clamp-2 group-hover:text-white transition-colors"
                >
                  {obj.review}
                </h5>
              </div>
              <div className="space-y-5">
                <div className="flex gap-1 items-center">
                  {Array(obj.rating)
                    .fill(1)
                    .map((_, index) => {
                      return (
                        <Star key={index} fill="#f97316" color="#f97316" />
                      );
                    })}
                </div>
                <h3 className="font-bold text-xl tracking-tight group-hover:text-white transition-colors">
                  {obj.name}
                </h3>
              </div>
            </div>
          );
        })}
      </Marquee>
    </div>
  );
}
