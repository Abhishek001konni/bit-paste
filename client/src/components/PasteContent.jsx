import { useEffect, useState } from 'react';
import { getPaste } from '../api/pasteApi';

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

  // Format expiration
  const expiresText = paste && !paste.expiresAt
    ? "Never"
    : paste?.expiresAt ? new Date(paste.expiresAt).toLocaleString() : "";

  return (
    <div className="max-w-3xl mx-auto p-8">
      {loading && (
        <div className="text-center py-10">Loading...</div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded max-w-xl mx-auto my-8">
          Error: {error}
        </div>
      )}

      {!loading && !error && !paste && (
        <div className="text-center text-gray-500 py-10">
          No paste found.
        </div>
      )}

      {!loading && !error && paste && (
        <>
          <h1 className="text-2xl font-bold mb-2">{paste.title || "Untitled Paste"}</h1>
          <div className="flex gap-6 text-gray-500 text-sm mb-4">
            <div>Language: <span className="font-mono">{paste.language}</span></div>
            <div>Expires: {expiresText}</div>
          </div>
          <pre className="bg-gray-100 p-4 rounded font-mono text-sm overflow-x-auto whitespace-pre-wrap">
            {paste.content}
          </pre>
        </>
      )}
    </div>
  );
};

export default PasteContent;
