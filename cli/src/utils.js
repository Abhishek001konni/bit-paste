export function parseExpires(value) {
  const now = new Date();
  switch (value) {
    case "1h":
      return new Date(now.getTime() + 60 * 60 * 1000).toISOString();
    case "1d":
      return new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();
    case "1w":
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
    case "1m":
      return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();
    case undefined:
    case null:
    case "":
      return null;
    default:
      return value;
  }
}

export function getApiUrl() {
  if (!process.env.API_URL) {
    throw new Error("API_URL environment variable is not set.");
  }
  return process.env.API_URL;
}
