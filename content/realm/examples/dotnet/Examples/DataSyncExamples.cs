using System;
using Microsoft.VisualBasic;
using NUnit.Framework;
using NUnit.Framework.Internal;
using Realms;
using Realms.Sync;

namespace Examples
{
    public class DataSyncExamples
    {
        Realm realm;
         App app;
            Realms.Sync.User user;
            FlexibleSyncConfiguration config;


        public void Setup()
        {
            const string myRealmAppId = Config.FSAppId;
            app = App.Create(myRealmAppId);
            user = app.LogInAsync(
                Credentials.Anonymous()).Result;

            config = new FlexibleSyncConfiguration(user);
        }

        public void GetSessionAndState(){
            
        }
    }
}
