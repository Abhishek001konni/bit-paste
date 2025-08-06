import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getPaste } from "../api/pasteApi";
import { useNavigate } from "react-router";
import { MdAddBox, MdContentCopy } from "react-icons/md";

const PasteContent = ({ pasteId }) => {
  const [paste, setPaste] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

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

  // Copy to clipboard handler
  const handleCopy = () => {
    if (paste && paste.content) {
      navigator.clipboard.writeText(paste.content).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#26292c] flex flex-col">
      {/* Top meta bar */}
      <div className="w-full overflow-x-auto bg-[#2e3136] border-b border-[#222]">
        <div className="flex flex-row flex-nowrap items-center gap-3 px-2 sm:px-6 py-4 text-gray-300 min-w-[420px]">
          <h1 className="text-xl font-bold tracking-tight text-gray-200 break-all whitespace-nowrap">
            {paste?.title || "Untitled Paste"}
          </h1>
          <div className="flex flex-wrap flex-row gap-2 text-sm text-gray-400 whitespace-nowrap">
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
          </div>
          <button
            className="ml-auto flex flex-row items-center text-blue-500 whitespace-nowrap"
            onClick={() => navigate("/")}
            title="New Paste"
          >
            <MdAddBox className="inline-block cursor-pointer size-6" />
            <span className="hidden sm:inline-block ml-1 font-medium cursor-pointer">
              New Paste
            </span>
          </button>
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
            {/* Copy button absolutely positioned in the top right of the code block */}
            <div className="relative mb-2">
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 flex items-center gap-1 text-gray-300 bg-[#35373b] hover:bg-[#43464a] px-3 py-1 rounded transition z-10"
                title="Copy to clipboard"
                style={{ height: "fit-content" }}
              >
                <MdContentCopy className="size-5" />
                <span className="text-sm">{copied ? "Copied!" : "Copy"}</span>
              </button>
              <div className="flex-1 min-w-0">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasteContent;