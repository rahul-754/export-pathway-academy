import { Mail, Phone } from "lucide-react";

export default function Contact() {
  return (
    <section className="py-10 bg-blue-600 text-white min-h-[400px] flex items-center">
      <div className="flex gap-5 px-10 items-center justify-between w-full max-w-[1600px] mx-auto">
        <div className="space-y-5 max-w-[800px]">
          <h2 className="text-5xl font-bold tracking-tight">
            Ready to transform your business?
          </h2>
          <p className="text-xl tracking-tight">
            Join thousands of satisfied customers who have improved their
            operations, increased revenue, and scaled their businesses with our
            solutions.
          </p>
        </div>
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 p-3 bg-white rounded-full">
              <Mail color="#2563eb" className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-lg font-normal">Email us</h5>
              <a
                href="mailto:contact@terrasourcing.com"
                className="text-xl font-bold"
              >
                contact@terrasourcing.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 p-3 bg-white rounded-full">
              <Phone color="#2563eb" className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-lg font-normal">Contact us</h5>
              <a
                href="tel:+918121020948"
                className="text-xl font-bold tracking-tight"
              >
                +91 8121020948
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
