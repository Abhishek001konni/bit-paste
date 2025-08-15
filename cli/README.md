# BitPaste CLI

BitPaste CLI is a minimal, modern command-line utility for creating and viewing text/code snippets via the [BitPaste API](https://bit-paste.vercel.app). It supports syntax highlighting, paste expiration, and instant sharing via short links—all from your terminal.

## Features

- **Create Pastes:** Upload content from a file, stdin, or directly via CLI. Supports optional title, language, and expiration.
- **View Pastes:** Retrieve and display any paste by its ID, with metadata.
- **Expiration:** Pastes can expire automatically (`1h`, `1d`, `1w`, `1m`, or custom date).
- **Languages Supported:** plaintext, JavaScript, Python, Java, HTML, CSS, JSON, Markdown.
- **Custom API:** Point to your own BitPaste API server if needed (`.env` or `--api-url`).
- **Clear Error Messages:** Helpful feedback for invalid input, server errors, or expired/non-existent pastes.

## Installation

Install globally:
```bash
npm install -g bitpaste
```
Or run instantly with [npx](https://www.npmjs.com/package/npx):
```bash
npx bitpaste upload -c "Test paste" -t "Test Title"
```

## Commands

### `upload` — Create a New Paste

Upload paste content from:
- Direct text (`--content`)
- A file (`--file`)
- Standard input (pipe)

**Options:**
- `-t, --title <title>`: Title of the paste (optional)
- `-l, --language <lang>`: Language for syntax highlighting (default: `plaintext`)
- `-e, --expires <expires>`: Expiration (`never`, `1h`, `1d`, `1w`, `1m`, `YYYY-MM-DD`, or ISO date)
- `-c, --content <text>`: Paste content (directly)
- `-f, --file <path>`: File path for content
- `--api-url <url>`: Override the default API endpoint

**Examples:**

Upload from direct text:
```bash
bitpaste upload -c "console.log('Hello, world!')" -l javascript -t "JS Example" -e 1d
```

Upload from a file:
```bash
bitpaste upload -f ./notes.md -l markdown -t "Notes" -e never
```

Pipe from stdin:
```bash
cat myscript.py | bitpaste upload -l python -t "Script"
```

Run directly without installing:
```bash
npx bitpaste upload -c "Test paste" -t "Test Title"
```

Custom API endpoint:
```bash
bitpaste upload -c "foo" --api-url https://my-bitpaste.com/pastes
```

**On Success:**  
You'll see output like:
```
Paste created successfully!
URL: https://bit-paste.vercel.app/<paste-id>
```
The URL is for the web frontend, allowing you to view and share the paste.

**On Error:**
- Invalid request, missing content, file not found, server error—all print clear messages.

---

### `view <id>` — View a Paste

Retrieve and display a paste by its ID.

**Options:**
- `--api-url <url>`: Override the default API endpoint

**Example:**
```bash
bitpaste view ab12cd34ef
```

**Output:**
- Title (bold)
- Language, ID, expiration (metadata)
- Paste content

**Error Handling:**
- Not found, expired, server errors—all print clear messages.

---

## API Endpoint

By default, the CLI uses the API endpoint from your `.env`  
You can override this with the `--api-url` flag for any command.

## Help

```bash
bitpaste --help
```
Lists all commands and options.

---

## Project Links

- [GitHub](https://github.com/Abhishek001konni/bit-paste)
- [Web Demo](https://bit-paste.vercel.app)
- [npm Package](https://www.npmjs.com/package/bitpaste)

## License

MIT

---

*BitPaste CLI — Paste. Share. Done.*
