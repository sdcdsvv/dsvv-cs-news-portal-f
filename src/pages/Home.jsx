import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { newsAPI } from "../services/api";

const Home = () => {
  const [trendingNews, setTrendingNews] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [clubNews, setClubNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      console.log("Fetching home data...");

      // Fetch trending news (CS category)
      const trendingResponse = await newsAPI.getByCategory("cs", { limit: 8 });
      console.log("Trending news:", trendingResponse.data);

      // Fetch featured alumni news
      const featuredResponse = await newsAPI.getByCategory("alumni", {
        limit: 4,
      });
      console.log("Alumni news:", featuredResponse.data);

      // Fetch club news
      const clubResponse = await newsAPI.getByCategory("club", { limit: 6 });
      console.log("Club news:", clubResponse.data);

      setTrendingNews(trendingResponse.data.news || []);
      setFeaturedNews(featuredResponse.data.news || []);
      setClubNews(clubResponse.data.news || []);
    } catch (error) {
      console.error("Error fetching home data:", error);
      // Set empty arrays to prevent errors
      setTrendingNews([]);
      setFeaturedNews([]);
      setClubNews([]);
    } finally {
      setLoading(false);
    }
  };

  const NewsCard = ({ news, size = "medium", showImage = true }) => (
    <Link
      to={`/news/${news.slug}`}
      className="news-card block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-news-border"
    >
      {showImage && news.images && news.images.length > 0 && (
        <div
          className={`${size === "large" ? "h-48" : "h-32"} overflow-hidden`}
        >
          <img
            src={news.images[0].url}
            alt={news.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-4">
        <h3
          className={`font-semibold text-news-subhead mb-2 ${
            size === "large" ? "text-xl news-headline" : "text-base"
          }`}
        >
          {news.title}
        </h3>
        <p className="text-sm text-news-body line-clamp-2">{news.excerpt}</p>
        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
          <span>{new Date(news.publishedAt).toLocaleDateString("en-IN")}</span>
          <span className="capitalize">{news.category}</span>
        </div>
      </div>
    </Link>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-red border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading latest news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Hero Section */}
      <section className="bg-white py-6 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Featured News */}
            <div className="lg:col-span-2">
              {trendingNews[0] && (
                <Link
                  to={`/news/${trendingNews[0].slug}`}
                  className="block group"
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={
                        trendingNews[0].images?.[0]?.url || "https://res.cloudinary.com/dil1tjdrc/image/upload/v1759903712/dsvv-banner_jus5pk.jpg"
                      }
                      alt={trendingNews[0].title}
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                      <div className="text-white">
                        <span className="bg-primary-red px-3 py-1 rounded-full text-sm font-semibold mb-3 inline-block">
                          TRENDING
                        </span>
                        <h2 className="news-headline text-3xl font-bold mb-2 leading-tight">
                          {trendingNews[0].title}
                        </h2>
                        <p className="text-gray-200 text-lg">
                          {trendingNews[0].excerpt}
                        </p>
                        <div className="flex items-center mt-3 text-sm text-gray-300">
                          <span>
                            {new Date(
                              trendingNews[0].publishedAt
                            ).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                          <span className="mx-2">•</span>
                          <span>By {trendingNews[0].author}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>

            {/* Side News */}
            <div className="space-y-4">
              <h3 className="news-headline text-xl font-bold text-gray-900 border-l-4 border-primary-red pl-3 mb-4">
                Latest Updates
              </h3>
              {trendingNews.slice(1, 5).map((news, index) => (
                <Link
                  key={news._id}
                  to={`/news/${news.slug}`}
                  className="flex space-x-3 group"
                >
                  <div className="flex-shrink-0 w-20 h-16 bg-gray-200 rounded overflow-hidden">
                    {news.images && news.images.length > 0 && (
                      <img
                        src={news.images[0].url}
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-news-subhead group-hover:text-primary-red line-clamp-2 leading-tight">
                      {news.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(news.publishedAt).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending News Grid */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="news-headline text-2xl font-bold text-gray-900">
              Trending Now
            </h2>
            <Link
              to="/category/cs"
              className="text-primary-red font-semibold hover:text-red-700 flex items-center"
            >
              View All
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingNews.slice(4, 8).map((news) => (
              <NewsCard key={news._id} news={news} />
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Speaks Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="news-headline text-2xl font-bold text-gray-900">
              Alumni Speaks
            </h2>
            <Link
              to="/category/alumni"
              className="text-primary-red font-semibold hover:text-red-700 flex items-center"
            >
              More Sessions
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredNews.map((news) => (
              <NewsCard key={news._id} news={news} />
            ))}
          </div>
        </div>
      </section>

      {/* Student Clubs Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="news-headline text-2xl font-bold text-gray-900">
              Club Activities
            </h2>
            <Link
              to="/clubs"
              className="text-primary-red font-semibold hover:text-red-700 flex items-center"
            >
              All Clubs
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubNews.map((news) => (
              <NewsCard key={news._id} news={news} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links to Clubs */}
      <section className="py-8 bg-primary-red text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="news-headline text-2xl font-bold text-center mb-8">
            Explore Our Student Clubs
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Disha", slug: "disha-club", icon: "🧠" },
              { name: "Aarogyam", slug: "aarogyam-club", icon: "🏥" },
              { name: "Soorma", slug: "soorma-club", icon: "⚡" },
              { name: "Sambhavna", slug: "sambhavna-club", icon: "📝" },
              { name: "Jigyasa", slug: "jigyasa-club", icon: "🔍" },
              { name: "Kriti", slug: "kriti-club", icon: "🎨" },
            ].map((club) => (
              <Link
                key={club.slug}
                to={`/club/${club.slug}`}
                className="bg-white text-gray-900 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors group"
              >
                <div className="text-2xl mb-2">{club.icon}</div>
                <div className="font-semibold text-sm group-hover:text-primary-red">
                  {club.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
