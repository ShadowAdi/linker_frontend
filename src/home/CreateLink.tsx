import axios from "axios";
import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/baseUrl";
import { toast } from "react-toastify";
import { useUser } from "../../store/UserAuthContext";

interface AddLinkFormData {
  url: string;
}

const CreateLink: React.FC = () => {
  const [formData, setFormData] = useState<AddLinkFormData>({
    url: "",
  });
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const { fetchUser, getToken } = useUser();

  useEffect(() => {
    const localToken = getToken();
    setToken(localToken!);
  }, []);

  

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ url: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.post(`${BASE_URL}links/`, formData, {
      headers: {
        Authorization: `Bearer `,
      },
    });
    const data = await response.data;
    if (data.success) {
      toast(`${data.message} with name ${data.userLinks?.title}`);
      navigate(`/link/${data.userLinks?._id}`);
    } else {
      toast(`${data.message}`);
      console.log("Failed to create link ", data.error);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-amber-900 mb-2">Add New Link</h2>
        <p className="text-amber-600">Paste or type your link to save it</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-amber-800 mb-2"
          >
            URL
          </label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-300 bg-white/50 backdrop-blur-sm"
            placeholder="Paste or type your link here"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-orange-700 focus:ring-4 focus:ring-amber-300 transition-all duration-300 hover:scale-[1.02] shadow-lg"
        >
          Save Link
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-amber-700">
          Want to view your links?{" "}
          <Link
            to="/Home"
            className="font-semibold text-amber-600 hover:text-amber-800 hover:underline transition-colors duration-300"
          >
            Go to your links
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CreateLink;
