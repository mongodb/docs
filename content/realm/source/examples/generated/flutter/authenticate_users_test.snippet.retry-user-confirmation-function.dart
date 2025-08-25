EmailPasswordAuthProvider authProvider = EmailPasswordAuthProvider(app);
await authProvider.retryCustomConfirmationFunction("lisa@example.com");
