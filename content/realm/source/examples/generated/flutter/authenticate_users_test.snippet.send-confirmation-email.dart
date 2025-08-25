EmailPasswordAuthProvider authProvider = EmailPasswordAuthProvider(app);
await authProvider.confirmUser(token, tokenId);
