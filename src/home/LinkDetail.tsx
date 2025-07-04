import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../constants/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import type { LinkDataType } from "../../types/linkType";
import { useUser } from "../../store/UserAuthContext";

const LinkDetail = () => {
  const { linkId } = useParams();
  const [linkDetailData, setLinkDetailData] = useState<LinkDataType | null>(
    null
  );

  const [token, setToken] = useState("");
  const { getToken } = useUser();

  useEffect(() => {
    const localToken = getToken();
    setToken(localToken!);
  }, []);

  const GetLink = async (linkId: string) => {
    if (!token) {
      return;
    }
    try {
      const response = await axios.get(`${BASE_URL}links/${linkId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.data;
      console.log("data ", data);
      if (data.success) {
        setLinkDetailData(data.linkFound);
      }
    } catch (error) {
      console.error(`Error in getting links data`, error);
      toast("Failed to get the Links");
    }
  };

  useEffect(() => {
    if (linkId) {
      GetLink(linkId);
    }
  }, [linkId, token]);
  if (!linkDetailData) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className=" bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1 className="text-3xl font-bold text-amber-900 mb-2 tracking-tight">
            {linkDetailData.title}
          </h1>
        </div>

        {/* Main Content - Single Column */}
        <div className="max-w-6xl mx-auto space-y-6 mb-8 md:grid space-x-6 items-center  grid-cols-1 md:grid-cols-2">
          <div className="bg-white/70 backdrop-blur-sm border border-amber-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-base font-semibold text-amber-900 mb-4 flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              Preview Image
            </h3>
            <img
              src={
                linkDetailData?.imageUrl ||
                "https://www.udgamschool.com/wp-content/uploads/2023/05/dummy-image-grey-e1398449111870.jpg"
              }
              alt={linkDetailData.title}
              className="w-full h-40 object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-white/70 backdrop-blur-sm border border-amber-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-amber-900 mb-2 flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Website URL
                  </h3>
                  <a
                    href={linkDetailData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:text-amber-800 hover:underline transition-colors duration-300 break-all text-lg font-medium"
                  >
                    {linkDetailData.url}
                  </a>
                </div>
                <button className="ml-4 bg-amber-500 cursor-pointer hover:bg-amber-600 text-white p-2 rounded-lg transition-colors duration-200">
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm border border-amber-200 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center">
                <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                Link Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <span className="text-sm text-amber-700 block mb-1">
                    Domain
                  </span>
                  <span className="font-medium text-amber-900 bg-amber-100 px-3 py-2 rounded-lg text-sm block">
                    {linkDetailData.domain}
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-sm text-amber-700 block mb-1">
                    Saved On
                  </span>
                  <span className="text-sm text-amber-800 bg-amber-50 px-3 py-2 rounded-lg block">
                    {new Date(linkDetailData.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-sm text-amber-700 block mb-1">
                    Last Updated
                  </span>
                  <span className="text-sm text-amber-800 bg-amber-50 px-3 py-2 rounded-lg block">
                    {new Date(linkDetailData.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkDetail;
