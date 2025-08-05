import { useState } from "react";
import { useNavigate } from "react-router";
import { createPaste } from "../api/pasteApi";

const PasteForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    language: "plaintext",
    expiresIn: "never",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Helper function to calculate expiration date
  const calculateExpirationDate = (expiresIn) => {
    const now = new Date();
    switch (expiresIn) {
      case "1h":
        return new Date(now.getTime() + 60 * 60 * 1000);
      case "1d":
        return new Date(now.getTime() + 24 * 60 * 60 * 1000);
      case "1w":
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      case "1m":
        return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      default:
        return null;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const pasteData = {
        title: formData.title || undefined,
        content: formData.content,
        language: formData.language,
        expiresAt:
          formData.expiresIn === "never"
            ? null
            : calculateExpirationDate(formData.expiresIn),
      };

      const result = await createPaste(pasteData);

      navigate(`/${result._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="max-w-2xl mx-auto p-4 bg-red-100 text-red-700 rounded-md mb-4">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md space-y-6"
      >
        <h1 className="text-2xl font-bold mb-4">Create a New Paste</h1>

        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title (optional):
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            disabled={loading}
            placeholder="Enter a title for your paste"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Language */}
        <div>
          <label
            htmlFor="language"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Language:
          </label>
          <select
            id="language"
            name="language"
            value={formData.language}
            onChange={handleInputChange}
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="plaintext">Plain Text</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="json">JSON</option>
            <option value="markdown">Markdown</option>
          </select>
        </div>

        {/* Expires */}
        <div>
          <label
            htmlFor="expires"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Expires:
          </label>
          <select
            id="expires"
            name="expiresIn"
            value={formData.expiresIn}
            onChange={handleInputChange}
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="never">Never</option>
            <option value="1h">1 Hour</option>
            <option value="1d">1 Day</option>
            <option value="1w">1 Week</option>
            <option value="1m">1 Month</option>
          </select>
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Content: <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            disabled={loading}
            required
            rows={15}
            placeholder="Paste your content here..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm resize-y min-h-[200px]"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
        >
          {loading ? "Creating..." : "Create Paste"}
        </button>
      </form>
    </div>
  );
};

export default PasteForm;
