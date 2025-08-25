EmailPasswordAuthProvider authProvider = EmailPasswordAuthProvider(app);
await authProvider.resendUserConfirmation("lisa@example.com");
