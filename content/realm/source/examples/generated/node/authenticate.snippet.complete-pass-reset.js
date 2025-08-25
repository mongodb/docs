await app.emailPasswordAuth.resetPassword({
  password: "newPassw0rd",
  token,
  tokenId,
});
