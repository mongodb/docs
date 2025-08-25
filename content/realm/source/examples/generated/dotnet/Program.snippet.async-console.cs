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
        const string myRealmAppId = "myAppId";
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
        }
