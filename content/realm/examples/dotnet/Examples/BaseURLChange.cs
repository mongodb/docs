using System;
using System.Threading.Tasks;
using NUnit.Framework;
using Realms;
using Realms.Sync;
using Realms.Sync.Exceptions;
using Realms.Sync.Testing;
using Realms.Logging;
using System.Threading;

namespace Examples
{
    public class BaseURLChange
    {

        [Test]

        public async Task testEdgeAppWithCustomBaseURL()
        {
            var YOUR_APP_ID = "sync-edge-server-cskhoow"; 

            // :snippet-start: custom-base-url
            // Specify a base URL to connect to a server other than the default.
            var appConfig = new AppConfiguration(YOUR_APP_ID);
            appConfig.BaseUri = new Uri("http://localhost:80");

            var app = App.Create(appConfig);
            // :snippet-end:

            try {
                var user = await app.LogInAsync(Credentials.Anonymous());
                Assert.AreEqual(UserState.LoggedIn, user.State);
                await user.LogOutAsync();
            }
            catch (Exception e) {
                Console.WriteLine(e.Message);
                Assert.AreEqual(e.Message, "Could not connect to the server.");
            }

        }

        [Test]

        public async Task testChangeBaseURL()
        {
            var YOUR_APP_ID = "sync-edge-server-cskhoow"; 

            // :snippet-start: update-base-url
            // Specify a baseURL to connect to a server other than the default.
            // In this case, an Edge Server instance running on the device
            var appConfig = new AppConfiguration(YOUR_APP_ID);
            appConfig.BaseUri = new Uri("http://localhost:80");

            var app = App.Create(appConfig);

            // ... log in a user and use the app ...

            // Update the base URL back to the default.
            #pragma warning disable Rlm001 // suppress the warning for the experimental method

            await app.UpdateBaseUriAsync(new Uri("https://services.cloud.mongodb.com"));

            #pragma warning restore Rlm001
            // :snippet-end:

            try {
                var user = await app.LogInAsync(Credentials.Anonymous());
                Assert.AreEqual(UserState.LoggedIn, user.State);

                await user.LogOutAsync();
            }
            catch (Exception e) {
                Console.WriteLine(e.Message);
                Assert.AreEqual(e.Message, "With a base URL pointing to the cloud, logging in should not fail.");
            }
        }
    }
}




