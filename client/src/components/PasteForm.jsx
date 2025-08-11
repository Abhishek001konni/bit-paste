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
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    <div className="min-h-screen bg-[#1a1d21] text-gray-100 flex flex-col px-4 py-10">
      {/* Header */}
      <div className="max-w-3xl mx-auto w-full mb-10 flex items-center gap-3">
        <MdContentPaste className="text-blue-500 text-4xl" />
        <h1 className="text-3xl font-bold tracking-tight">Create a New Paste</h1>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-3xl mx-auto w-full bg-red-900/40 text-red-300 px-4 py-3 rounded-lg mb-6 border border-red-700">
          {error}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto w-full flex flex-col gap-8"
      >
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title <span className="text-gray-500">(optional)</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            disabled={loading}
            placeholder="Enter a title"
            className="w-full px-4 py-2 rounded-lg bg-[#23272e] focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        {/* Language & Expiration */}
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <label htmlFor="language" className="block text-sm font-medium mb-2">
              Language
            </label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              disabled={loading}
              className="w-full px-4 py-2 rounded-lg bg-[#23272e] focus:ring-2 focus:ring-blue-500 outline-none transition"
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
          <div className="flex-1">
            <label htmlFor="expiresIn" className="block text-sm font-medium mb-2">
              Expires
            </label>
            <select
              id="expiresIn"
              name="expiresIn"
              value={formData.expiresIn}
              onChange={handleInputChange}
              disabled={loading}
              className="w-full px-4 py-2 rounded-lg bg-[#23272e] focus:ring-2 focus:ring-blue-500 outline-none transition"
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
          <label htmlFor="content" className="block text-sm font-medium mb-2">
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
            className="w-full px-4 py-3 rounded-lg bg-[#181b1f] font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none transition resize-y"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-60"
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

