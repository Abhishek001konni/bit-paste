import { useState } from "react";
import { useNavigate } from "react-router";
import { createPaste } from "../api/pasteApi";
import { MdContentPaste } from "react-icons/md";

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
        title: formData.title.trim() || undefined,
        content: formData.content.trim(),
        language: formData.language,
        expiresAt:
          formData.expiresIn === "never"
            ? null
            : calculateExpirationDate(formData.expiresIn)?.toISOString(),
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
    <div className="min-h-screen bg-[#23272e] flex flex-col px-2 py-8 sm:px-0">
      {/* Header */}
      <div className="w-full max-w-3xl mx-auto flex items-center gap-2 mb-8 px-2">
        <MdContentPaste className="text-blue-500 text-3xl" />
        <h1 className="text-3xl font-extrabold text-gray-100 tracking-tight">
          Create a New Paste
        </h1>
      </div>

      {/* Error */}
      {error && (
        <div className="max-w-3xl w-full mx-auto p-4 bg-red-900/60 text-red-200 rounded-lg mb-4 border border-red-700">
          {error}
        </div>
      )}

      {/* Full width form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl mx-auto flex flex-col gap-7 px-2"
      >
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-300 mb-1"
          >
            Title <span className="text-gray-500 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            disabled={loading}
            placeholder="Enter a title for your paste"
            className="w-full px-3 py-2 rounded-md border border-gray-700 bg-[#23272e] text-gray-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        {/* Language & Expiry Row */}
        <div className="flex flex-col sm:flex-row gap-5">
          {/* Language */}
          <div className="flex-1">
            <label
              htmlFor="language"
              className="block text-sm font-semibold text-gray-300 mb-1"
            >
              Language
            </label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              disabled={loading}
              className="w-full px-3 py-2 rounded-md border border-gray-700 bg-[#23272e] text-gray-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          <div className="flex-1">
            <label
              htmlFor="expires"
              className="block text-sm font-semibold text-gray-300 mb-1"
            >
              Expires
            </label>
            <select
              id="expires"
              name="expiresIn"
              value={formData.expiresIn}
              onChange={handleInputChange}
              disabled={loading}
              className="w-full px-3 py-2 rounded-md border border-gray-700 bg-[#23272e] text-gray-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="never">Never</option>
              <option value="1h">1 Hour</option>
              <option value="1d">1 Day</option>
              <option value="1w">1 Week</option>
              <option value="1m">1 Month</option>
            </select>
          </div>
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-semibold text-gray-300 mb-1"
          >
            Content <span className="text-red-400">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            disabled={loading}
            required
            rows={14}
            placeholder="Paste your content here..."
            className="w-full px-3 py-2 rounded-md border border-gray-700 bg-[#181b1f] text-gray-100 font-mono text-[15px] shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[200px] resize-y"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-2 px-6 rounded-md shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed text-lg flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="animate-pulse">Creating...</span>
          ) : (
            <>
              <MdContentPaste className="text-xl" />
              Create Paste
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PasteForm;
