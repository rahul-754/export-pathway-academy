import { useState, useEffect, Profiler } from 'react';
import { GraduationCap, Home, Bell, ChevronDown, ShoppingCart, User} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { getCourses } from '@/Apis/Apis';

const UserHeader = () => {
  const [courses, setCourses] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hoveredCourseId, setHoveredCourseId] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  // Dummy cart data
  const cartItems = []; // Replace with actual cart data from context or state

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();

    const results = courses.filter(course =>
      course.title.toLowerCase().includes(query) ||
      (course.tags && course.tags.some(tag => tag.toLowerCase().includes(query))) ||
      (course.sessionTitles &&
        course.sessionTitles.some(title => title.toLowerCase().includes(query)))
    );

    setSearchResults(results);
  }, [searchQuery, courses]);

  return (
    <div className="bg-white shadow-sm border-b relative z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section: Logo + Explore + Search */}
          <div className="flex items-center space-x-4">
            <img
              src="./logo.png"
              alt="Logo"
              style={{ width: 'auto', height: '40px', objectFit: 'cover' }}
            />

            {/* Explore Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-900 flex items-center"
              >
                <GraduationCap className="w-4 h-4 mr-1" />
                Explore
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>

              {isHovered && (
                <div className="absolute left-0 top-full flex z-50 min-h-[96px]">
                  {/* Course List */}
                  <div className="w-64 bg-white border border-gray-200 shadow-lg rounded-l-md overflow-hidden">
                    <div className="max-h-[96px] overflow-y-auto">
                      {courses.length > 0 ? (
                        courses.map(course => (
                          <div
                            key={course._id}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex justify-between items-center cursor-pointer"
                            onMouseEnter={() => setHoveredCourseId(course._id)}
                          >
                            {course.title}
                            <span className="text-gray-400">{'>'}</span>
                          </div>
                        ))
                      ) : (
                        <p className="px-4 py-2 text-sm text-gray-500">Loading...</p>
                      )}
                    </div>
                  </div>

                  {/* Session List */}
                  {hoveredCourseId && (
                    <div className="absolute left-64 top-0 w-64 bg-white border border-gray-200 shadow-lg rounded-r-md z-50">
                      {courses
                        .find(course => course._id === hoveredCourseId)
                        ?.sessionTitles?.slice(0, 5)
                        .map((title, idx) => (
                          <Link
                            key={idx}
                            to={`/course/${hoveredCourseId}/sessions`}
                            className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50"
                          >
                            {title}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div className="relative ">
              <input
                type="text"
                placeholder="Search for anything"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[33vw] pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
              </div>

              {/* Search Results */}
              {searchQuery && searchResults.length > 0 && (
                <div className="absolute mt-1 w-full bg-white border border-gray-200 shadow-md rounded-md z-50 max-h-64 overflow-auto">
                  {searchResults.map((result) => (
                    <Link
                      key={result._id}
                      to={`/course/${result.slug || result._id}/sessions`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                    >
                      {result.title}
                    </Link>
                  ))}
                </div>
              )}

              {searchQuery && searchResults.length === 0 && (
                <div className="absolute mt-1 w-full bg-white border border-gray-200 shadow-md rounded-md z-50 px-4 py-2 text-sm text-gray-500">
                  No results found.
                </div>
              )}
            </div>
          </div>

          {/* Right Section: Cart + Notifications + Home */}
          <div className="flex items-center space-x-4 relative">
            {/* Cart */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="border-blue-600 text-blue-900 hover:bg-blue-50"
                onClick={() => setCartOpen(!cartOpen)}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>

              {cartOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg rounded-md z-50">
                  {cartItems.length === 0 ? (
                    <div className="p-4 text-sm text-gray-600 text-center">
                      Your cart is empty.
                      <Link to="/courses" className="text-blue-600 hover:underline block mt-2">
                        Keep shopping
                      </Link>
                    </div>
                  ) : (
                    <ul className="max-h-64 overflow-auto">
                      {cartItems.map((item, idx) => (
                        <li key={idx} className="p-3 border-b text-sm text-gray-700">
                          {item.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* Notifications */}
            <Button
              variant="outline"
              size="sm"
              className="relative border-blue-600 text-blue-900 hover:bg-blue-50"
            >
              <Bell className="w-4 h-4 mr-2" />
              Notifications
              <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs">3</Badge>
            </Button>

            {/* Home */}
            <Link to="/user-dashboard">
              <Button
                variant="outline"
                size="sm"
                className="border-blue-600 text-blue-900 hover:bg-blue-50"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
            <Link to="/">
              <Button
                variant="outline"
                size="sm"
                className= ' bg-[#0072e6] text-white'
              >
                <User className="w-4 h-4 mr-2" />
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
