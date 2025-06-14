import founderImage from "./images/Saumya Headshot.jpg";

export default function About() {
  return (
    <section className="py-16 bg-blue-600 text-white w-full ">
      <div className="w-full max-w-[1600px] md:px-10 px-5 mx-auto flex flex-wrap-reverse gap-5 justify-between min-h-[500px] items-center">
        <div className="max-w-[700px] md:space-y-6 space-y-3">
          <h2 className="md:text-4xl text-3xl font-bold leading-tight">
            Master the Art of Global Trade with Export Success Mastery
          </h2>
          <p className="md:text-xl text-md leading-relaxed">
            A step-by-step export training program designed to equip businesses
            with AI-powered tools, compliance insights, and hands-on expertise
            for seamless global expansion, led by the CEO herself.
          </p>
        </div>
        <div className="space-y-2 md:mx-0 mx-auto">
          <img
            src={founderImage}
            alt="Saumya Prakash"
            className="xl:w-[400px] md:w-[300px] w-[200px] rounded-full aspect-square shadow-md md:mx-0 mx-auto"
          />
          <div className="bg-white py-2 md:px-10 px-5 mx-auto rounded-full w-fit md:space-y-1">
            <h2 className="font-bold text-blue-950 md:text-2xl text-lg text-center">
              Saumya Prakash
            </h2>
            <p className="text-neutral-800 text-center md:text-md text-sm">
              Founder & CEO at Terra Sourcing
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
