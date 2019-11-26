// begin x509 connection
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;

// Tested using MongoDB.Driver 2.9.2 and netcoreapp 2.2

namespace WorkingWithMongoDB
{
    class Program
    {
        static void Main(string[] args)
        {
            MainAsync().Wait();
        }

        static async Task MainAsync()
        {
            var connectionString = "mongodb+srv://<cluster-url>/test?authSource=$external&retryWrites=true&w=majority&authMechanism=MONGODB-X509";
            var settings = MongoClientSettings.FromConnectionString(connectionString);

            // You will need to convert your Atlas-provided PEM containing the cert/private keys into a PFX
            // use openssl and the following line to create a PFX from your PEM:
            // openssl pkcs12 -export -in <x509>.pem -inkey <x509>.pem -out <x509>.pfx -certfile <x509>.pem
            // and provide a password, which should match the second argument you pass to X509Certificate2
            var cert = new X509Certificate2("/etc/certs/mongodb/client-certificate.pfx", "<pfx_passphrase>");

            settings.SslSettings = new SslSettings
            {
                ClientCertificates = new List<X509Certificate>()
                {
                    cert
                }
            };

            var client = new MongoClient(settings);
            
            // just doing a quick read to verify the usability of this connection
            var database = client.GetDatabase("testDB");
            var collection = database.GetCollection<BsonDocument>("testCol");
            
            var docCount = collection.CountDocuments("{}");
            Console.WriteLine(docCount);
        }
    }
}
// end x509 connection