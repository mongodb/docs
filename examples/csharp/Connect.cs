// Start Connect
using System;
using MongoDB.Bson;
using MongoDB.Driver;

namespace csharptest
{
    class Connect
    {
        static void Main(string[] args)
        {
           var client = new MongoClient("<URISTRING>");
        }
    }
}

// End Connect
