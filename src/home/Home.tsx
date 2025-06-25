import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/baseUrl";
import { toast } from "react-toastify";
import { type LinkDataType } from "../../types/linkType";
import { useUser } from "../../store/UserAuthContext";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [links, setLinks] = useState<LinkDataType[]>([]);
  const [token, setToken] = useState("");
  const { getToken } = useUser();

  useEffect(() => {
    const localToken = getToken();
    setToken(localToken!);
  }, []);

  const GetAllLinks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}links/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data;
      if (data.success) {
        setLinks(data.userLinks);
      }
    } catch (error) {
      console.error(`Error in getting links data `, error);
      toast("Failed to get the Links");
    }
  };

  useEffect(() => {
    GetAllLinks();
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleCardClick = (url: string) => {
    navigate(`${url}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="  border-b border-amber-200 py-6 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto flex justify-between sm:flex-row flex-col space-y-5  items-start sm:items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-800 to-orange-700 bg-clip-text text-transparent">
              Your Links
            </h1>
            <p className="text-amber-600 mt-1">
              Manage and organize your saved links
            </p>
          </div>
          <Link
            to="/create-link"
            className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            + Add New Link
          </Link>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {links.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-12 border border-amber-200 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-4">
                No links saved yet
              </h3>
              <p className="text-amber-600 mb-6">
                Start building your link collection by adding your first link!
              </p>
              <Link
                to="/create-link"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                + Add Your First Link
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {links.map((link) => (
              <div
                key={link.id}
                onClick={() => handleCardClick(link.url)}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-amber-200 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
              >
                <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-100 relative overflow-hidden">
                  {link.imageUrl ? (
                    <img
                      src={link.imageUrl}
                      alt={link.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-amber-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-4 h-4 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-amber-900 text-lg leading-tight mb-3 line-clamp-2 group-hover:text-amber-800 transition-colors duration-300">
                    {link.title}
                  </h3>

                  <div className="flex items-center justify-between text-sm text-amber-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                        />
                      </svg>
                      <span className="font-medium truncate">
                        {link.domain}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-amber-500">
                    <span>Added {formatDate(link.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {links.length > 0 && (
          <div className="mt-12 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-amber-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-900">
                    {links.length}
                  </div>
                  <div className="text-sm text-amber-600">Total Links</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-900">
                    {new Set(links.map((link) => link.domain)).size}
                  </div>
                  <div className="text-sm text-amber-600">Unique Domains</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-900">
                    {
                      links.filter((link) => {
                        const weekAgo = new Date();
                        weekAgo.setDate(weekAgo.getDate() - 7);
                        return new Date(link.createdAt) > weekAgo;
                      }).length
                    }
                  </div>
                  <div className="text-sm text-amber-600">This Week</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-amber-600">Last updated</div>
                <div className="text-lg font-semibold text-amber-900">
                  {formatDate(
                    Math.max(
                      ...links.map((link) => new Date(link.updatedAt).getTime())
                    ).toString()
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
