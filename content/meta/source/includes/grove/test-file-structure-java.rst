Java tests use JUnit 5:

.. code-block:: java

   class MovieQueriesTest {
       private MongoClient client;

       // 1. Set up: connect before each test
       @BeforeEach
       void setUp() {
           client = MongoClients.create(
               System.getenv("CONNECTION_STRING")
           );
       }

       @Test
       void findMoviesByYear() {
           // 2. Run: call the example function
           var result =
               new FindMoviesByYear().run();
           // 3. Assert: compare to expected output
           Expect.that(result)
               .withIgnoredFields("_id")
               .shouldMatch(
                   "path/to/output.json"
               );
       }

       // 4. Clean up: drop test data and disconnect
       @AfterEach
       void tearDown() {
           client.getDatabase("test_db").drop();
           client.close();
       }
   }
