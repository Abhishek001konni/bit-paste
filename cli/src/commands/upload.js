import chalk from "chalk";
import fs from "fs";
import { parseExpires, getApiUrl } from "../utils.js";

export default function uploadCommand(program) {
  program
    .command("upload")
    .description("Upload a new paste")
    .option("-t, --title <title>", "Title of the paste")
    .option(
      "-l, --language <lang>",
      "Language of the paste (default: plaintext)",
      "plaintext"
    )
    .option(
      "-e, --expires <expires>",
      "Expiration (never, 1h, 1d, 1w, 1m, YYYY-MM-DD, or ISO)"
    )
    .option("-c, --content <text>", "Paste content")
    .option("-f, --file <path>", "Read content from file")
    .option("--api-url <url>", "API URL override")
    .action(async (options) => {
      try {
        let content = options.content;

        // Read content from file if specified
        if (!content && options.file) {
          try {
            content = fs.readFileSync(options.file, "utf-8");
          } catch (e) {
            console.error(chalk.red(`Cannot read file: ${options.file}`));
            process.exit(1);
          }
        }

        // Read content from stdin if not provided
        if (!content && !process.stdin.isTTY) {
          content = await new Promise((resolve) => {
            let data = "";
            process.stdin.on("data", (chunk) => (data += chunk));
            process.stdin.on("end", () => resolve(data));
          });
        }

        if (!content || !content.trim()) {
          console.error(
            chalk.red(
              "Error: No content provided. Use -c, -f, or pipe via stdin."
            )
          );
          process.exit(1);
        }

        const expiresAt = options.expires
          ? options.expires === "never"
            ? null
            : parseExpires(options.expires)
          : null;

        // Use CLI flag if provided, otherwise use environment variable (no fallback)
        const apiBase = options.apiUrl || getApiUrl();

        const response = await fetch(apiBase, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: options.title || "",
            content: content.trim(),
            language: options.language || "plaintext",
            expiresAt,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          if (response.status === 400) {
            console.error(chalk.red("Invalid request:"), data.error);
          } else if (response.status === 500) {
            console.error(chalk.red("Server error. Please try again later."));
          } else {
            console.error(
              chalk.red("Failed to upload paste:"),
              data.error || response.statusText
            );
          }
          process.exit(1);
        }
        
        const pasteUrl = `${apiBase}/${data._id}`;
        console.log(chalk.green("Paste created successfully!"));
        console.log(`URL: ${chalk.blue(pasteUrl)}`);
      } catch (err) {
        console.error(chalk.red("Unexpected Error:"), err.message);
        process.exit(1);
      }
    });
}
