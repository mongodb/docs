C# tests use NUnit 3:

.. code-block:: csharp

   public class MovieQueriesTest {
       private IMongoClient _client;

       // 1. Set up: connect before each test
       [SetUp]
       public void Setup() {
           _client = new MongoClient(
               Env.GetString("CONNECTION_STRING")
           );
       }

       [Test]
       public void FindMoviesByYear() {
           // 2. Run: call the example function
           var result =
               new FindMoviesByYear().Run();
           // 3. Assert: compare to expected output
           Expect.That(result)
               .WithIgnoredFields("_id")
               .ShouldMatch(
                   "path/to/output.json"
               );
       }

       // 4. Clean up: drop test data
       [TearDown]
       public void TearDown() {
           _client.DropDatabase("test_db");
       }
   }
