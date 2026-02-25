const command = {
  collMod: 'weather24h',
  expireAfterSeconds: 'off',
};

await database.command(command);
