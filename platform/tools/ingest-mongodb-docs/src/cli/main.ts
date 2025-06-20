#! /usr/bin/env node
import yargs from "yargs";

import "dotenv/config";

function commandDir<T>(
  argv: yargs.Argv<T>,
  directory: string,
  options?: yargs.RequireDirectoryOptions
): yargs.Argv<T> {
  return argv.commandDir(directory, {
    extensions: ["js"],
    exclude: /^(?:index|.*\.test)\.js$/, // .map, .d.ts excluded by 'extensions' property
    visit(commandModule) {
      return commandModule.default;
    },
    ...options,
  });
}

async function main() {
  const argv = commandDir(yargs.help(), "commands").demandCommand();

  // Accessing this property executes CLI
  argv.argv;
}

main().catch(console.error);
