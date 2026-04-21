JavaScript tests use `Jest <https://jestjs.io/>`__:

.. code-block:: javascript

   describe("Movie queries", () => {
     let client;

     // 1. Set up: connect before each test
     beforeEach(async () => {
       client = new MongoClient(
         process.env.CONNECTION_STRING
       );
     });

     // 4. Clean up: drop test data and disconnect
     afterEach(async () => {
       await client.db("test_db").dropDatabase();
       await client.close();
     });

     it("finds movies by year", async () => {
       // 2. Run: call the example function
       const result = await findMoviesByYear();
       // 3. Assert: compare to expected output
       Expect.that(result)
         .withIgnoredFields("_id")
         .shouldMatch("path/to/output.json");
     });
   });
