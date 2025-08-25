using System;
using System.Threading.Tasks;
using MongoDB.Bson;
using NUnit.Framework;
using Realms.Sync;
using Examples.Models;
using User = Realms.Sync.User;

namespace Examples
{
    public class AuthenticationExamples
    {
        App app;
        const string myRealmAppId = Config.AppId;

        [OneTimeSetUp]
        public void Setup()
        {
            app = App.Create(myRealmAppId);
        }

        [Test]
        public async Task LogsOnManyWays()
        {
            {
                // :snippet-start: logon_anon
                var user = await app.LogInAsync(Credentials.Anonymous());
                // :snippet-end:
                Assert.AreEqual(UserState.LoggedIn, user.State);
                await user.LogOutAsync();
            }
            {
                // :snippet-start: logon_EP
                var user = await app.LogInAsync(
                    Credentials.EmailPassword("caleb@mongodb.com", "MySekritPwd"));
                // :snippet-end:
                Assert.AreEqual(UserState.LoggedIn, user.State);
                await user.LogOutAsync();
            }
            {
                var apiKey = Config.ApiKey;
                // :snippet-start: logon_API
                var user = await app.LogInAsync(Credentials.ApiKey(apiKey));
                // :snippet-end:
                Assert.AreEqual(UserState.LoggedIn, user.State);
                await user.LogOutAsync();
            }
            {
                // :snippet-start: logon_Function
                var functionParameters = new
                {
                    username = "caleb",
                    password = "MySekritPwd",
                    IQ = 42,
                    hasPets = true
                };

                var user =
                    await app.LogInAsync(Credentials.Function(functionParameters));
                // :snippet-end:
                Assert.AreEqual(UserState.LoggedIn, user.State);
                await user.LogOutAsync();
            }
            {

                var jwt_token = Config.JwtToken;
                // :snippet-start: logon_JWT
                var user =
                    await app.LogInAsync(Credentials.JWT(jwt_token));
                // :snippet-end:
                Assert.AreEqual(UserState.LoggedIn, user.State);
                await user.LogOutAsync();
            }
            try
            {
                var facebookToken = "";
                // :snippet-start: logon_fb
                var user =
                    await app.LogInAsync(Credentials.Facebook(facebookToken));
                // :snippet-end:
            }
            catch (Exception e)
            {
                Assert.AreEqual("InvalidSession: unauthorized", e.Message);
            }
            try
            {
                var googleAuthCode = "";
                // :snippet-start: logon_google
                var user =
                    await app.LogInAsync(Credentials.Google(googleAuthCode, GoogleCredentialType.AuthCode));
                // :snippet-end:
            }
            catch (Exception e)
            {
                Assert.AreEqual("InvalidSession: unauthorized", e.Message);
            }
            try
            {
                var appleToken = "";
                // :snippet-start: logon_apple
                var user =
                    await app.LogInAsync(Credentials.Apple(appleToken));
                // :snippet-end:
            }

            catch (Exception e)
            {
                Assert.AreEqual("InvalidSession: unauthorized", e.Message);
            }
        }

        // :snippet-start: get_user_token
        // Returns a valid user access token to authenticate requests
        public async Task<string> GetValidAccessToken(User user)
        {
            // An already logged in user's access token might be stale. To
            // guarantee that the token is valid, refresh it.
            await user.RefreshCustomDataAsync();
            return user.AccessToken;
        }
        // :snippet-end:
    }
}
