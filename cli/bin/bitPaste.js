#!/usr/bin/env node
import "dotenv/config";
import { program } from "commander";
import uploadCommand from "../src/commands/upload.js";

program
  .name("bitpaste")
  .description("Bit-Paste: Minimal Pastebin CLI")
  .version("1.0.0");

uploadCommand(program);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
