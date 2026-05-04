const fs = require("fs");
const crypto = require("crypto");

try {
  fs.writeFileSync("master-key.txt", crypto.randomBytes(96));
} catch (err) {
  console.error(err);
}
