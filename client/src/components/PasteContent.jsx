import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getPaste } from "../api/pasteApi";
import { useNavigate } from "react-router";


const PasteContent = ({ pasteId }) => {
  const [paste, setPaste] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    if (pasteId) {
      fetchPaste();
    }
  }, [pasteId]);


  const navigate = useNavigate();

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

  // Format expiration
  const expiresText =
    paste && !paste.expiresAt
      ? "Never"
      : paste?.expiresAt
      ? new Date(paste.expiresAt).toLocaleString()
      : "";

  return (
    <div className="min-h-screen w-full bg-[#26292c] flex flex-col">
      {/* Top meta bar */}
      <div className="w-full px-2 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 text-gray-300 bg-[#2e3136] border-b border-[#222]">
        <h1 className="text-xl font-bold tracking-tight text-gray-200 break-all">
          {paste?.title || "Untitled Paste"}
        </h1>
        <div className="flex flex-row gap-4 text-sm text-gray-400">
          <div>
            <span className="font-medium">Language:</span>{" "}
            <span className="font-mono">{paste?.language}</span>
          </div>
          <div>
            <span className="font-medium">Expires:</span> {expiresText}
          </div>
          <div>
            <span>Viewing paste: {pasteId}</span>
          </div>
          <div>
            <button className="text-blue-500 hover:underline" onClick={() => navigate('/')} >
              New Paste
            </button>
          </div>
        </div>
      </div>

      {/* Main code area */}
      <div className="flex-1 w-full bg-[#26292c]">
        {loading && (
          <div className="flex justify-center items-center min-h-[300px] text-gray-400">
            Loading...
          </div>
        )}
        {error && (
          <div className="bg-red-200 text-red-800 px-4 py-3 rounded-lg shadow max-w-xl mx-auto my-8">
            Error: {error}
          </div>
        )}
        {!loading && !error && !paste && (
          <div className="flex justify-center items-center min-h-[300px] text-gray-400">
            No paste found.
          </div>
        )}
        {!loading && !error && paste && (
          <div className="w-full overflow-x-auto bg-[#26292c]">
            <SyntaxHighlighter
              language={getLanguageForHighlighting(paste.language)}
              style={oneDark}
              customStyle={{
                margin: 0,
                background: "#26292c",
                fontSize: "15px",
                borderRadius: "0",
                padding: "0.5rem",
                height: "auto",
                maxHeight: "none",
                overflow: "visible",
                width: "fit-content",
                minWidth: "100%",
              }}
              showLineNumbers={true}
              wrapLines={true}
              wrapLongLines={true}
            >
              {paste.content}
            </SyntaxHighlighter>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasteContent;
