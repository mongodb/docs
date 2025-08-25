EmailPasswordAuthProvider authProvider = EmailPasswordAuthProvider(app);
await authProvider.completeResetPassword(
    "n3wSt0ngP4ssw0rd!", token, tokenId);
