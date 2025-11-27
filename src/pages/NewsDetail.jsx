import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { newsAPI } from "../services/api";

const NewsDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedNews, setRelatedNews] = useState([]);

  useEffect(() => {
    fetchNewsDetail();
  }, [slug]);

  const fetchNewsDetail = async () => {
    try {
      setLoading(true);
      const response = await newsAPI.getBySlug(slug);
      setNews(response.data);

      // Fetch related news
      const relatedResponse = await newsAPI.getByCategory(
        response.data.category,
        { limit: 4 }
      );
      setRelatedNews(
        relatedResponse.data.news.filter((item) => item.slug !== slug)
      );
    } catch (error) {
      console.error("Error fetching news detail:", error);
      navigate("/404", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-red border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading news...</p>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            News Not Found
          </h1>
          <Link to="/" className="text-primary-red hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="bg-gray-100 py-4 border-b">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary-red">
              Home
            </Link>
            <span>›</span>
            <Link
              to={`/category/${news.category}`}
              className="hover:text-primary-red capitalize"
            >
              {news.category} News
            </Link>
            {news.clubName && (
              <>
                <span>›</span>
                <Link
                  to={`/club/${news.clubName}`}
                  className="hover:text-primary-red capitalize"
                >
                  {news.clubName.replace("-", " ")}
                </Link>
              </>
            )}
            <span>›</span>
            <span className="text-gray-900 truncate">{news.title}</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <span className="inline-block px-3 py-1 bg-primary-red text-white text-sm rounded-full capitalize">
              {news.category}
            </span>
            {news.clubName && (
              <span className="inline-block px-3 py-1 bg-blue-500 text-white text-sm rounded-full capitalize">
                {news.clubName.replace("-", " ")}
              </span>
            )}
            <span className="text-gray-500 text-sm">
              {formatDate(news.publishedAt)}
            </span>
          </div>

          <h1 className="news-headline text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {news.title}
          </h1>

          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary-red rounded-full flex items-center justify-center text-white font-semibold">
                {news.author.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900 news-byline">
                  {news.author}
                </p>
                <p className="text-sm text-gray-500 font-body">
                  DSVV Department of Computer Science
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-gray-500">
              <button className="flex items-center space-x-1 hover:text-primary-red">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                <span>Share</span>
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {news.images && news.images.length > 0 && (
          <div className="mb-8">
            <img
              src={news.images[0].url}
              alt={news.title}
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
            {news.images[0].caption && (
              <p className="text-center text-sm text-gray-500 mt-2 italic">
                {news.images[0].caption}
              </p>
            )}
          </div>
        )}

        {/* Article Content */}
        <div className="article-content mb-12">
          <div
            className="leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: news.content.replace(/\n/g, "<br/>"),
            }}
          />
        </div>

        {/* Additional Images Gallery */}
        {news.images && news.images.length > 1 && (
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {news.images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-lg overflow-hidden"
                >
                  <img
                    src={image.url}
                    alt={`${news.title} - Image ${index + 2}`}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {image.caption && (
                    <p className="p-3 text-sm text-gray-600">{image.caption}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {news.tags && news.tags.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {news.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related News */}
        {relatedNews.length > 0 && (
          <div className="border-t pt-12">
            <h2 className="news-headline text-2xl font-bold mb-6">
              Related News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedNews.map((item) => (
                <Link
                  key={item._id}
                  to={`/news/${item.slug}`}
                  className="flex space-x-4 group"
                >
                  <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded overflow-hidden">
                    {item.images && item.images.length > 0 ? (
                      <img
                        src={item.images[0].url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-red line-clamp-2 mb-2 news-subhead">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(item.publishedAt).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default NewsDetail;
