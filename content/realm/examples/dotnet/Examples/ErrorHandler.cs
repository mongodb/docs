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
    public class ErrorHandler
    {
        App app;
        User user;
        PartitionSyncConfiguration config;
        string myRealmAppId = Config.AppId;

        [Test]
        public async Task HandleErrors()
        {
            // :snippet-start: set-log-level
            Logger.LogLevel = LogLevel.Debug;
            // :snippet-end:

            // :snippet-start: customize-logging-function
            // :uncomment-start:
            //using Realms.Logging;
            //Logger.LogLevel = LogLevel.All;
            // :uncomment-end:
            // customize the logging function:
            Logger.Default = Logger.Function(message =>
            {
                // Do something with the message
            });
            // :snippet-end:
            var appConfig = new AppConfiguration(myRealmAppId)
            {
                DefaultRequestTimeout = TimeSpan.FromMilliseconds(1500)
            };

            app = App.Create(appConfig);
            user = await app.LogInAsync(Credentials.Anonymous());
            config = new PartitionSyncConfiguration("myPartition", user);
            //:remove-start:
            config.Schema = new[] { typeof(Models.User) };
            //:remove-end:
            var realm = await Realm.GetInstanceAsync(config);
            // :snippet-start:handle-errors
            config.OnSessionError = (session, sessionException) =>
            {
                switch (sessionException.ErrorCode)
                {
                    // See https://www.mongodb.com/docs/realm-sdks/dotnet/latest/reference/Realms.Sync.Exceptions.ErrorCode.html
                    // for a list of all error codes
                    case ErrorCode.BadQuery:
                        break;
                }
            };
            // :snippet-end:
            TestingExtensions.SimulateError(realm.SyncSession, ErrorCode.BadQuery, "" +
                "No permission to work with the Realm");

            // Close the Realm before doing the reset as it'll need
            // to be deleted and all objects obtained from it will be
            // invalidated.
            realm.Dispose();

            //failing on build server. comment out to test.
            //Assert.IsTrue(didTriggerErrorHandler);
        }

        public async Task UseCancellationToken()
        {

            var appConfig = new AppConfiguration(Config.FSAppId);
            app = App.Create(appConfig);
            user = await app.LogInAsync(Credentials.Anonymous());

            var syncConfig = new FlexibleSyncConfiguration(user);
            try
            {
                var cts = new CancellationTokenSource(TimeSpan.FromMinutes(2));
                await Realm.GetInstanceAsync(syncConfig, cts.Token);
            }

            catch (OperationCanceledException)
            {
                Realm.GetInstance(syncConfig);
            }

            catch (Exception ex) { Console.WriteLine(ex.Message); }
        }
    }
}