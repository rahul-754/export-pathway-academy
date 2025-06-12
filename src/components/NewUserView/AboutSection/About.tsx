import founderImage from "./images/Saumya Headshot.jpg";

export default function About() {
  return (
    <section className="py-16 bg-blue-600 text-white w-full ">
      <div className="w-full max-w-[1600px] px-10 mx-auto flex gap-5 justify-between min-h-[500px] items-center">
        <div className="max-w-[700px] space-y-6 ">
          <h2 className="text-5xl font-bold leading-tight">
            Master the Art of Global Trade with Export Success Mastery
          </h2>
          <p className="text-xl  leading-relaxed">
            A step-by-step export training program designed to equip businesses
            with AI-powered tools, compliance insights, and hands-on expertise
            for seamless global expansion, led by the CEO herself.
          </p>
        </div>
        <div className="space-y-2">
          <img
            src={founderImage}
            alt="Saumya Prakash"
            className="w-[400px] rounded-full aspect-square shadow-md"
          />
          <div className="bg-white py-2 px-10 mx-auto rounded-full w-fit space-y-1">
            <h2 className="font-bold text-blue-950 text-2xl text-center">
              Saumya Prakash
            </h2>
            <p className="text-neutral-800 text-center text-md">
              Founder & CEO at Terra Sourcing
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
