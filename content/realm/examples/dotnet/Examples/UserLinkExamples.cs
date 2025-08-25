using System;
using System.Threading.Tasks;
using MongoDB.Bson;
using Realms.Sync;

namespace Examples
{
    public class UserLinkExamples
    {
        App app;

        public async Task LinksAUser()
        {
            app = App.Create("");
            {
                // :snippet-start: link
                // 1) A user logs on anonymously:
                var anonUser = await app.LogInAsync(Credentials.Anonymous());
                // 2) They create some data, and then decide they want to save
                //    it, which requires creating an Email/Password account.
                // 3) We prompt the user to log in, and then use that info to
                //    register the new EmailPassword user, and then generate an
                //    EmailPassword credential to link the existing anonymous
                //    account:
                var email = "caleb@mongodb.com";
                var password = "MySekritPwd";
                await app.EmailPasswordAuth.RegisterUserAsync(
                    email, password);
                var officialUser = await anonUser.LinkCredentialsAsync(
                   Credentials.EmailPassword(email, password));
                // :snippet-end:
            }
            {
                // :snippet-start: link2
                var anonUser = await app.LogInAsync(Credentials.Anonymous());
                var officialUser = await anonUser.LinkCredentialsAsync(
                   Credentials.Google("<google-token>", GoogleCredentialType.AuthCode));
                // :snippet-end:
            }
            return;
        }

        public async Task ReadUserProfile()
        {
            // :snippet-start: user-metadata
            var user = await app.LogInAsync(
                Credentials.EmailPassword("user1@example.com", "p@ssw0rd"));
            Console.WriteLine($"The user's email is {user.Profile.Email}");
            // :snippet-end:
        }

    }
}
