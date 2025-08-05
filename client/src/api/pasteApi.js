const API_URL = import.meta.env.VITE_API_URL;

// create a new paste
export const createPaste = async (pasteData) => {
  const response = await fetch(`${API_URL}/pastes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pasteData),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error || "Failed to create paste.");
  }
  return result;
};

// fetch a paste by its ID
export const getPaste = async (id) => {
  const response = await fetch(`${API_URL}/pastes/${id}`);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error || "Failed to fetch paste.");
  }
  return result;
};
