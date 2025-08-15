import chalk from "chalk";
import { getApiUrl } from "../utils.js";

export default function viewCommand(program) {
  program
    .command("view <id>")
    .description("View a paste by ID")
    .option("--api-url <url>", "API URL override")
    .action(async (id, options) => {
      try {
        const apiBase = getApiUrl(options.apiUrl);
        const url = `${apiBase}/${id}`;
        const response = await fetch(url);

        let data;
        try {
          data = await response.json();
        } catch (_) {
          console.error(
            chalk.red("Failed to parse server response (not JSON).")
          );
          process.exit(1);
        }

        if (!response.ok) {
          if (response.status === 404) {
            console.error(chalk.red("Paste not found."));
          } else if (response.status === 410) {
            console.error(chalk.red("Paste has expired and was deleted."));
          } else {
            console.error(
              chalk.red("Failed to fetch paste:"),
              data.error || response.statusText
            );
          }
          process.exit(1);
        }

        console.log(chalk.yellow.bold(data.title || "Untitled"));
        console.log(
          chalk.gray(`Language: ${data.language || "none"} | ID: ${data._id}`)
        );
        if (data.expiresAt) {
          const expDate = new Date(data.expiresAt);
          const now = new Date();
          const expired = expDate < now;
          console.log(
            chalk.magenta(
              `Expires: ${expDate.toLocaleString()}${
                expired ? " (expired)" : ""
              }`
            )
          );
        }
        console.log("\n" + (data.content || chalk.gray("[No content]")));
      } catch (err) {
        console.error(chalk.red("Unexpected Error:"), err.message);
        process.exit(1);
      }
    });
}
