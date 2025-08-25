using System;
using System.Threading.Tasks;
using NUnit.Framework;
using Realms;
using Realms.Sync;
using RealmUser = Realms.Sync.User;
using User = Examples.Models.User;
using Realms.Sync.Exceptions;
using Realms.Sync.Testing;
using Realms.Sync.ErrorHandling;
using static Realms.Sync.SyncConfigurationBase;

namespace Examples
{
    public class ClientResetExamples
    {
        App app;
        RealmUser user;

        const string myRealmAppId = Config.FSAppId;
        App fsApp = null!;
        Realm fsRealm = null!;
        RealmUser fsUser = null!;

        public ClientResetExamples()
        {
            fsRealm = Realm.GetInstance();
        }

        [Test]
        public async Task TestDiscardUnsyncedChangesHandler()
        // :snippet-start: DiscardUnsyncedChangesHandler
        {
            // :remove-start:
            app = App.Create(myRealmAppId);
            user = await app.LogInAsync(Credentials.Anonymous(false));
            // :remove-end:
            var config = new FlexibleSyncConfiguration(user);
            config.ClientResetHandler = new DiscardUnsyncedChangesHandler()
            {
                // The following callbacks are optional
                OnBeforeReset = (beforeReset) =>
                {
                    // Executed before the client reset begins
                    // Can be used to notify the user that a reset is going
                    // to happen
                },
                OnAfterReset = (beforeReset, afterReset) =>
                {
                    // Executed after the client reset is complete
                    // Can be used to notify the user that the reset is done
                },
                ManualResetFallback = (err) =>
                {
                    // Automatic reset failed; handle the reset manually here
                }
            };
            try
            {
                var realm = await Realm.GetInstanceAsync(config);
            }
            catch (Exception ex)
            {
                Console.WriteLine($@"Error creating or opening the
                    realm file. {ex.Message}");
            }
            // :snippet-end:
            await user.LogOutAsync();
        }

        public async Task TestManualClientReset()
        // :snippet-start: ManualClientReset
        // :replace-start: {
        //  "terms": {
        //   "fsApp": "app",
        //   "fsUser":"user",
        //   "fsConfig":"config",
        //   "fsrealm":"realm"
        //   }
        // }
        // :uncomment-start:
        // private void SetupRealm()
        // :uncomment-end:
        {
            //:remove-start:
            fsApp = App.Create(myRealmAppId);
            fsUser = fsApp.LogInAsync(
                Credentials.EmailPassword(Config.Username, Config.Password)).Result;
            //:remove-end:
            var fsConfig = new FlexibleSyncConfiguration(fsUser);
            fsConfig.ClientResetHandler =
                new ManualRecoveryHandler(HandleClientResetError);
            var fsrealm = await Realm.GetInstanceAsync(fsConfig);
        }

        private void HandleClientResetError(ClientResetException clientResetException)
        {
            Console.WriteLine($"Client Reset requested: {clientResetException.Message}");

            // Prompt user to perform a client reset immediately. If they don't,
            // they won't receive any data from the server until they restart the app
            // and all changes they make will be discarded when the app restarts.
            var didUserConfirmReset = ShowUserAConfirmationDialog();
            if (didUserConfirmReset)
            {
                // Close the Realm before doing the reset. It must be 
                // deleted as part of the reset.
                fsRealm.Dispose();

                // perform the client reset
                var didReset = clientResetException.InitiateClientReset();
                if (didReset)
                {
                    // Navigate the user back to the main page or reopen the
                    // the Realm and reinitialize the current page
                }
                else
                {
                    // Reset failed - notify user that they'll need to
                    // update the app
                }
            }
        }
        // :replace-end:
        // :snippet-end:

        private bool ShowUserAConfirmationDialog()
        {
            return true;
        }

        public void TestRecoverOrDiscardUnsyncedChangesHandler()
        {
            // :snippet-start: RecoverOrDiscardUnsyncedChangesHandler
            var conf = new FlexibleSyncConfiguration(user)
            {
                ClientResetHandler = new RecoverOrDiscardUnsyncedChangesHandler
                {
                    // The following callbacks are optional

                    OnBeforeReset = (beforeReset) =>
                    {
                        // Executed before the client reset begins
                        // Can be used to notify the user that a reset is going
                        // to happen
                    },
                    OnAfterRecovery = (beforeReset, afterReset) =>
                    {
                        // Executed after the client reset is complete
                        // Can be used to notify the user that the reset is done
                    },
                    OnAfterDiscard = (beforeReset, afterReset) =>
                    {
                        // Executed if the automatic recovery has failed
                        // but the DiscardUnsyncedChanges fallback has completed
                        // successfully
                    },
                    ManualResetFallback = (err) =>
                    {
                        // Automatic reset failed; handle the reset manually here
                    }
                }
            };
            // :snippet-end:
        }

        public void RecoverUnsyncedChangesHandler()
        {
            // :snippet-start: RecoverUnsyncedChangesHandler
            var conf = new FlexibleSyncConfiguration(user)
            {
                ClientResetHandler = new RecoverUnsyncedChangesHandler
                {
                    // The following callbacks are optional
                    OnBeforeReset = (beforeReset) =>
                    {
                        // Executed before the client reset begins
                        // Can be used to notify the user that a reset is going
                        // to happen
                    },
                    OnAfterReset = (beforeReset, afterReset) =>
                    {
                        // Executed after the client reset is complete
                        // Can be used to notify the user that the reset is done
                    },
                    ManualResetFallback = (err) =>
                    {
                        // Automatic reset failed; handle the reset manually here
                    }
                }
            };
            // :snippet-end:
        }
    }
}
