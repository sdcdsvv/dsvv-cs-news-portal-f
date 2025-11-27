import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString("en-IN", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const mainMenu = [
    { name: "Home", href: "/" },
    { name: "CS News", href: "/category/cs" },
    { name: "Alumni", href: "/category/alumni" },
    { name: "Student Clubs", href: "/clubs" },
    { name: "Campus", href: "/category/campus" },
    { name: "Events", href: "/category/events" },
  ];

  const clubs = [
    {
      name: "Disha Club",
      slug: "disha-club",
      desc: "Psychological & Career Counselling",
    },
    {
      name: "Aarogyam Club",
      slug: "aarogyam-club",
      desc: "Health, Sport & Wellness",
    },
    {
      name: "Soorma Club",
      slug: "soorma-club",
      desc: "Rejuvenation & Recreation",
    },
    {
      name: "Sambhavna Club",
      slug: "sambhavna-club",
      desc: "Language & Communication",
    },
    {
      name: "Jigyasa Club",
      slug: "jigyasa-club",
      desc: "Research & Development",
    },
    { name: "Kriti Club", slug: "kriti-club", desc: "Creative Arts" },
    {
      name: "Sanskriti Club",
      slug: "sanskriti-club",
      desc: "Cultural Activities",
    },
    {
      name: "Udyam Club",
      slug: "udyam-club",
      desc: "Innovation & Entrepreneurship",
    },
    { name: "Rakshak Club", slug: "rakshak-club", desc: "Safety & Security" },
    { name: "Srijan Shilpi", slug: "srijan-shilpi", desc: "Social Outreach" },
    { name: "Seva Club", slug: "seva-club", desc: "Service & Volunteers" },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Top Breaking News Bar */}
      <div className="bg-primary-red text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span className="bg-white text-primary-red px-2 py-1 rounded font-bold text-xs">
              BREAKING
            </span>
            <div className="overflow-hidden whitespace-nowrap font-body">
              <div className="ticker inline-block">
                DSVV Computer Science Department launches new AI & ML Lab |
                Annual Tech Fest 'Sanskriti' starts next week | Alumni Meet 2024
                scheduled for December
              </div>
            </div>
          </div>
          <div className="text-xs hidden md:block">{currentTime}</div>
        </div>
      </div>

      {/* Main Navigation - Made Sticky */}
      <nav className="bg-white shadow-lg border-b-4 border-primary-red sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Logo and Top Row */}
          <div className="flex justify-between items-center py-3 border-b">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-3">
                {/* University Logo */}
                <div className="bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
                  <img
                    src="/dsvv-logo.png"
                    alt="DSVV University Logo"
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      e.target.style.display = "none";
                      const fallback = e.target.nextElementSibling;
                      if (fallback) fallback.style.display = "block";
                    }}
                  />
                  {/* Fallback SVG if logo image doesn't load */}
                  <div className="bg-primary-red text-white p-2 rounded-lg hidden">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M2 2h20v20H2V2zm18 18V4H4v16h16zM8 8h8v2H8V8zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" />
                    </svg>
                  </div>
                </div>
                <div className="text-left">
                  <div className="news-headline text-2xl text-gray-900 leading-tight">
                    Department of Computer Science
                  </div>
                  <div className="text-xs text-gray-500 font-body">
                    Dev Sanskriti Vishwavidyalaya, Haridwar
                  </div>
                </div>
              </Link>
            </div>

            {/* Live TV / Important Links */}
            <div className="hidden md:flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-primary-red font-semibold hover:text-red-700">
                <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                <span>Live Updates</span>
              </button>
              <Link
                to="/gallery"
                className="text-gray-700 hover:text-primary-red font-body"
              >
                Gallery
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-primary-red font-body"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button - Moved inside the main flex container */}
            <div className="md:hidden flex items-center space-x-4">
              <div className="text-xs text-gray-500">
                {currentTime.split(",")[0]}
              </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-primary-red p-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop Main Menu */}
          <div className="hidden md:flex items-center justify-between py-2">
            <div className="flex items-center space-x-1">
              {mainMenu.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-3 text-sm font-semibold transition-colors border-b-2 font-body ${
                    isActive(item.href)
                      ? "text-primary-red border-primary-red"
                      : "text-gray-700 border-transparent hover:text-primary-red hover:border-gray-300"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Clubs Dropdown */}
              <div className="relative group">
                <button className="px-4 py-3 text-sm font-semibold text-gray-700 hover:text-primary-red border-b-2 border-transparent hover:border-gray-300 transition-colors flex items-center font-body">
                  Clubs ▾
                </button>
                <div className="absolute left-0 mt-1 w-64 rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {clubs.map((club) => (
                    <Link
                      key={club.slug}
                      to={`/club/${club.slug}`}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-primary-red border-b border-gray-100 last:border-b-0"
                    >
                      <div className="font-semibold font-body">{club.name}</div>
                      <div className="text-xs text-gray-500 font-body">{club.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search news..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent w-64 font-body"
                />
                <svg
                  className="w-5 h-5 text-gray-400 absolute left-3 top-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-2 space-y-1">
              {mainMenu.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.href);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-3 text-gray-700 hover:text-primary-red hover:bg-red-50 rounded-md font-semibold font-body border-b border-gray-100 last:border-b-0"
                >
                  {item.name}
                </button>
              ))}
              
              {/* Clubs in Mobile Menu */}
              <div className="border-t border-gray-200 mt-2 pt-2">
                <div className="px-3 py-2 font-semibold text-gray-900 font-body">
                  Student Clubs
                </div>
                {clubs.map((club) => (
                  <button
                    key={club.slug}
                    onClick={() => {
                      navigate(`/club/${club.slug}`);
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-6 py-3 text-sm text-gray-600 hover:text-primary-red hover:bg-red-50 font-body border-b border-gray-100 last:border-b-0"
                  >
                    <div className="font-medium">{club.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{club.desc}</div>
                  </button>
                ))}
              </div>

              {/* Additional Mobile Links */}
              <div className="border-t border-gray-200 mt-2 pt-2">
                <button
                  onClick={() => {
                    navigate("/gallery");
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-3 text-gray-700 hover:text-primary-red hover:bg-red-50 rounded-md font-semibold font-body"
                >
                  Gallery
                </button>
                <button
                  onClick={() => {
                    navigate("/contact");
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-3 text-gray-700 hover:text-primary-red hover:bg-red-50 rounded-md font-semibold font-body"
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;