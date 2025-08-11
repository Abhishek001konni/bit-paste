import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getPaste } from "../api/pasteApi";
import { useNavigate } from "react-router";
import { MdAdd, MdContentCopy } from "react-icons/md";

const PasteContent = ({ pasteId }) => {
  const [paste, setPaste] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaste = async () => {
      try {
        const result = await getPaste(pasteId);
        setPaste(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (pasteId) fetchPaste();
  }, [pasteId]);

  const getLanguageForHighlighting = (language) => {
    const languageMap = {
      plaintext: "text",
      javascript: "javascript",
      python: "python",
      java: "java",
      html: "html",
      css: "css",
      json: "json",
      markdown: "markdown",
    };
    return languageMap[language] || "text";
  };

  const expiresText =
    paste && !paste.expiresAt
      ? "Never"
      : paste?.expiresAt
      ? new Date(paste.expiresAt).toLocaleString()
      : "";

  const handleCopy = () => {
    if (paste?.content) {
      navigator.clipboard.writeText(paste.content).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1e1f26] via-[#14151a] to-[#0d0e12] text-gray-200 flex flex-col">
      {/* Top glassy header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg sm:text-xl font-bold truncate">
          {paste?.title || "Untitled Paste"}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div>
            <span className="font-medium">Lang:</span>{" "}
            <span className="font-mono">{paste?.language}</span>
          </div>
          <div>
            <span className="font-medium">Expires:</span> {expiresText}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-2 sm:px-2 py-2">
        {loading && <div className="text-gray-400 mt-10">Loading...</div>}
        {error && (
          <div className="bg-red-200 text-red-800 px-4 py-3 rounded-lg shadow max-w-xl">
            Error: {error}
          </div>
        )}
        {!loading && !error && !paste && (
          <div className="text-gray-400 mt-10">No paste found.</div>
        )}
        {!loading && !error && paste && (
          <div className="w-full">
            {/* Copy Button */}
            <div className="flex justify-end mb-3">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition text-sm"
              >
                <MdContentCopy className="text-lg" />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* Code block - full width, no border */}
            <SyntaxHighlighter
              language={getLanguageForHighlighting(paste.language)}
              style={oneDark}
              customStyle={{
                margin: 0,
                background: "transparent",
                fontSize: "15px",
                padding: "1rem",
              }}
              showLineNumbers={true}
              wrapLines={true}
              wrapLongLines={true}
            >
              {paste.content}
            </SyntaxHighlighter>
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => navigate("/")}
        title="New Paste"
        className="fixed bottom-6 right-6 p-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition"
      >
        <MdAdd className="text-2xl" />
      </button>
    </div>
  );
};

export default PasteContent;
