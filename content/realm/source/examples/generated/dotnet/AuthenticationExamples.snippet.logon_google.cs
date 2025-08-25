var user =
    await app.LogInAsync(Credentials.Google(googleAuthCode, GoogleCredentialType.AuthCode));
