import { makeKey } from "./makeDataKey.js";
import { insert } from "./insertEncryptedDocument.js";

const separator = "=".repeat(60);

async function main() {
  console.log(separator);
  console.log("Running makeDataKey.js...");
  console.log(separator);
  await makeKey();

  console.log(separator);
  console.log("Running insertEncryptedDocument.js...");
  console.log(separator);
  await insert();

  console.log(separator);
  console.log("All scripts completed successfully!");
  console.log(separator);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
