using System;
using NUnit.Framework;
using System.Threading.Tasks;
using Realms;
using Examples.Models;
using System.Linq;

namespace Examples
{
    public class Indexing
    {


        [Test]
        public void Index()
        {
            var realm = Realm.GetInstance();

            // :snippet-start: linq-query-fts
            // :replace-start: {
            //  "terms": {
            //      "Person_Index": "Person"}
            // }
            // Find all people with "scientist" and "Nobel" in their biography
            var scientists = realm.All<Person_Index>()
                .Where(p => QueryMethods.FullTextSearch(p.Biography, "scientist Nobel"));

            // Find all people with "scientist" in their biography, but not "physics"
            var scientistsButNotPhysicists = realm.All<Person_Index>()
                .Where(p => QueryMethods.FullTextSearch(p.Biography, "scientist -physics"));
            // :replace-end:
            // :snippet-end:

            // :snippet-start: rql-query-fts
            // :replace-start: {
            //  "terms": {
            //      "Person_Index": "Person"}
            // }
            // Find all people with "scientist" and "Nobel" in their biography
            var filteredScientists = realm.All<Person_Index>()
                .Filter("Biography TEXT $0", "scientist Nobel");

            // Find all people with "scientist" in their biography, but not "physics"
            var filteredScientistsButNotPhysicists = realm.All<Person_Index>()
                .Filter("Biography TEXT $0", "scientist -physics");
            // :replace-end:
            // :snippet-end:

        }
    }
}

