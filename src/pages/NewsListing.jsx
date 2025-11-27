import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { newsAPI } from "../services/api";

const NewsListing = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    club: "",
    search: "",
    page: 1,
  });
  const [pagination, setPagination] = useState({});
  const location = useLocation();

  const categories = [
    { value: "", label: "All Categories" },
    { value: "cs", label: "CS Department" },
    { value: "alumni", label: "Alumni Speaks" },
    { value: "club", label: "Club Activities" },
    { value: "campus", label: "Campus News" },
    { value: "events", label: "Events" },
  ];

  const clubs = [
    { value: "", label: "All Clubs" },
    { value: "disha-club", label: "Disha Club" },
    { value: "aarogyam-club", label: "Aarogyam Club" },
    { value: "soorma-club", label: "Soorma Club" },
    { value: "sambhavna-club", label: "Sambhavna Club" },
    { value: "jigyasa-club", label: "Jigyasa Club" },
    { value: "kriti-club", label: "Kriti Club" },
    { value: "sanskriti-club", label: "Sanskriti Club" },
    { value: "udyam-club", label: "Udyam Club" },
    { value: "rakshak-club", label: "Rakshak Club" },
    { value: "srijan-shilpi", label: "Srijan Shilpi" },
    { value: "seva-club", label: "Seva Club" },
  ];

  useEffect(() => {
    // Extract filters from URL
    const searchParams = new URLSearchParams(location.search);
    const category = location.pathname.includes("/category/")
      ? location.pathname.split("/category/")[1]
      : searchParams.get("category") || "";

    const club = location.pathname.includes("/club/")
      ? location.pathname.split("/club/")[1]
      : searchParams.get("club") || "";

    const newFilters = {
      category,
      club,
      search: searchParams.get("search") || "",
      page: parseInt(searchParams.get("page")) || 1,
    };

    setFilters(newFilters);
    fetchNews(newFilters);
  }, [location]);

  const fetchNews = async (filterParams) => {
    setLoading(true);
    try {
      const params = {
        page: filterParams.page,
        limit: 12,
        ...(filterParams.category && { category: filterParams.category }),
        ...(filterParams.club && { club: filterParams.club }),
        ...(filterParams.search && { search: filterParams.search }),
      };

      const response = await newsAPI.getAll(params);
      setNews(response.data.news);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters) => {
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    window.history.pushState(
      {},
      "",
      `${location.pathname}?${params.toString()}`
    );
    setFilters(newFilters);
    fetchNews(newFilters);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    updateFilters(newFilters);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = formData.get("search");
    handleFilterChange("search", search);
  };

  const NewsCard = ({ news }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 news-card">
      <Link to={`/news/${news.slug}`}>
        {news.images && news.images.length > 0 ? (
          <img
            src={news.images[0].url}
            alt={news.title}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </Link>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-block px-2 py-1 bg-primary-red text-white text-xs rounded-full capitalize">
            {news.category}
          </span>
          {news.clubName && (
            <span className="text-xs text-gray-500 capitalize">
              {news.clubName.replace("-", " ")}
            </span>
          )}
        </div>

        <Link to={`/news/${news.slug}`}>
          <h3 className="news-headline font-semibold text-lg text-gray-900 mb-2 line-clamp-2 hover:text-primary-red transition-colors">
            {news.title}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-3 line-clamp-3 font-body">
          {news.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{new Date(news.publishedAt).toLocaleDateString("en-IN")}</span>
          <span>By {news.author}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="news-headline text-3xl font-bold text-gray-900 mb-2">
            {filters.category
              ? `${filters.category.toUpperCase()} News`
              : filters.club
              ? `${
                  clubs.find((c) => c.value === filters.club)?.label
                } Activities`
              : "All News"}
          </h1>
          <p className="text-gray-600 font-body">
            Stay updated with the latest happenings from DSVV Computer Science
            Department
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  name="search"
                  placeholder="Search news..."
                  defaultValue={filters.search}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
                />
                <svg
                  className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
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
            </form>

            {/* Category Filter */}
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-red focus:border-transparent"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>

            {/* Club Filter */}
            <select
              value={filters.club}
              onChange={(e) => handleFilterChange("club", e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-red focus:border-transparent"
            >
              {clubs.map((club) => (
                <option key={club.value} value={club.value}>
                  {club.label}
                </option>
              ))}
            </select>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {filters.category && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-red text-white">
                Category:{" "}
                {categories.find((c) => c.value === filters.category)?.label}
                <button
                  onClick={() => handleFilterChange("category", "")}
                  className="ml-2 hover:bg-red-700 rounded-full"
                >
                  ×
                </button>
              </span>
            )}
            {filters.club && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500 text-white">
                Club: {clubs.find((c) => c.value === filters.club)?.label}
                <button
                  onClick={() => handleFilterChange("club", "")}
                  className="ml-2 hover:bg-blue-700 rounded-full"
                >
                  ×
                </button>
              </span>
            )}
            {filters.search && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
                Search: {filters.search}
                <button
                  onClick={() => handleFilterChange("search", "")}
                  className="ml-2 hover:bg-green-700 rounded-full"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>

        {/* News Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-red"></div>
          </div>
        ) : news.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {news.map((item) => (
                <NewsCard key={item._id} news={item} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => handleFilterChange("page", filters.page - 1)}
                  disabled={filters.page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>

                {[...Array(pagination.pages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handleFilterChange("page", i + 1)}
                    className={`px-4 py-2 border rounded-lg ${
                      filters.page === i + 1
                        ? "bg-primary-red text-white border-primary-red"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => handleFilterChange("page", filters.page + 1)}
                  disabled={filters.page === pagination.pages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <svg
              className="w-24 h-24 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No news found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsListing;
