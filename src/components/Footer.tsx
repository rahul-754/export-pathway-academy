import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaPhone,
  FaInstagram,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <div className="relative mt-[-60px] z-50 bg-white border-t border-gray-50 before:content-[''] before:absolute before:-top before:left-0 before:w-full before:h-2 before:shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"></div>
      <footer className="w-full font-sans text-white">
        {/* Bottom section with links and info */}
        <div className="bg-white text-gray-800 px-4 py-12 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company info */}
              <div className="col-span-1">
                <Link to={"/"}>
                  <img
                    src="logo.png"
                    alt="Terra Sourcing"
                    width={100}
                    height={48}
                    className="h-12 mb-4"
                  />
                </Link>
                <p className="text-gray-600 mb-6">
                  Terra Sourcing helps importers connect with verified
                  exporters, ensuring high-quality products and secure trade
                  relationships.
                </p>
                <div className="flex space-x-2">
                  <a
                    href="https://www.facebook.com/share/15rHYXdeew/"
                    className="bg-blue-100 p-2 rounded-full hover:bg-blue-200"
                  >
                    <FaFacebook size={20} className="text-blue-600" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/terrasourcing/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_companies%3BsjglNLd6SriwX8rT1%2F0j9g%3D%3D/"
                    className="bg-blue-100 p-2 rounded-full hover:bg-blue-200"
                  >
                    <FaLinkedin size={20} className="text-blue-600" />
                  </a>
                  <a
                    href="https://youtube.com/@terrasourcing?feature=shared/"
                    className="bg-blue-100 p-2 rounded-full hover:bg-blue-200"
                  >
                    <FaYoutube size={20} className="text-blue-600" />
                  </a>
                  <a
                    href="https://www.instagram.com/terra_sourcing?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==/"
                    className="bg-blue-100 p-2 rounded-full hover:bg-blue-200"
                  >
                    <FaInstagram size={20} className="text-blue-600" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="col-span-1">
                <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                <ul className="space-y-3 font-medium text-sm">
                  <li>
                    <Link to="#" className="hover:text-blue-500">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/webinarAndEvents"
                      className="hover:text-blue-500"
                    >
                      Our Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/exporter/market-research-report"
                      className="hover:text-blue-500"
                    >
                      Our Solution
                    </Link>
                  </li>
                  <li>
                    <Link to="/blogs" className="hover:text-blue-500">
                      Our Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact-us" className="hover:text-blue-500">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Our Services */}
              <div className="col-span-1">
                <h3 className="text-xl font-bold mb-4">Our Services</h3>
                <ul className="space-y-3 font-medium text-sm">
                  <li>
                    <Link
                      to="/exporter/market-research-report"
                      className="hover:text-blue-500"
                    >
                      Market Research Report
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/exporter/lead-verification"
                      className="hover:text-blue-500"
                    >
                      Lead verification
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/webinarAndEvents"
                      className="hover:text-blue-500"
                    >
                      Webinar And Training
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Us */}
              <div className="col-span-1">
                <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                <ul className="space-y-4 font-medium text-sm">
                  <li className="flex items-start">
                    <FaPhone className="mt-1 mr-2 text-blue-500" />
                    <span>
                      {" "}
                      <a href="tel:+91 8121020948">+91 8121020948</a>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaMapMarkerAlt className="mt-1 mr-2 text-blue-500" />
                    <span>
                      RS Silicon Park, Madhapur, Hyderabad, Telangana 500081
                    </span>
                  </li>

                  <li className="flex items-start">
                    <MdEmail className="mt-1 mr-2 text-blue-500" />
                    <span>
                      <a href="tel:contact@terrasourcing.com">
                        Contact@terrasourcing.com
                      </a>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
