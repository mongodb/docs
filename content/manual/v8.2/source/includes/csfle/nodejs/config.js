import fs from "fs";

const connectionString = "<connection string>";
const keyVaultDb = "encryption";
const keyVaultColl = "__keyVault";
const keyVaultNamespace = `${keyVaultDb}.${keyVaultColl}`;
const masterKeyPath = "./master-key.txt";
const dekIdPath = "./dek_id.txt";
const cryptSharedLibPath = "<Automatic Encryption Shared Library path>";

function getKmsProviders() {
  const localMasterKey = fs.readFileSync(masterKeyPath);
  return { local: { key: localMasterKey } };
}

export {
  connectionString,
  keyVaultNamespace,
  masterKeyPath,
  dekIdPath,
  cryptSharedLibPath,
  getKmsProviders,
};
