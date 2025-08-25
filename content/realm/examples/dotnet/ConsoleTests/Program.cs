//:snippet-start: async-console
using System;
using System.Linq;
using System.Threading.Tasks;
using Nito.AsyncEx;
using Realms;
using Realms.Sync;

namespace ConsoleTests
{
    class Program
    {
        // :replace-start: {
        //   "terms": {
        //     "codesnippetbackend-drcpb": "myAppId"
        //   }
        // }
        const string myRealmAppId = "codesnippetbackend-drcpb";
        // :replace-end:
        public static void Main(string[] args)
        {
            Nito.AsyncEx.AsyncContext.Run(async () => await MainAsync(args));
        }

        private static async Task MainAsync(string[] args)
        {
            var app = App.Create(myRealmAppId);
            var user = await app.LogInAsync(Credentials.Anonymous());
            var config = new PartitionSyncConfiguration("partition", user);

            using var realm = await Realm.GetInstanceAsync();
            var itemsBiggerThanFive = realm.All<Item>().Where(f => f.Size > 5);
            foreach (var item in itemsBiggerThanFive)
            {
                await Task.Delay(10); // Simulates some background work
                Console.WriteLine(item.Size);
            }
            //:remove-start:
            await Task.Delay(10);
            //:remove-end:
        }
        //:snippet-end:
    }

    partial class Item : IRealmObject
    {
        public int Size { get; set; }
    }
}
