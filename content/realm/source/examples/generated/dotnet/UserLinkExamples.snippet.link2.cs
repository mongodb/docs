var anonUser = await app.LogInAsync(Credentials.Anonymous());
var officialUser = await anonUser.LinkCredentialsAsync(
   Credentials.Google("<google-token>", GoogleCredentialType.AuthCode));
