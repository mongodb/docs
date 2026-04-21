Python tests use the built-in ``unittest`` framework:

.. code-block:: python

   class TestMovieQueries(unittest.TestCase):
       # 1. Set up: connect once for all tests
       @classmethod
       def setUpClass(cls):
           load_dotenv()
           cls.CONNECTION_STRING = os.getenv(
               "CONNECTION_STRING"
           )
           cls.client = MongoClient(
               cls.CONNECTION_STRING
           )

       # Clean state before each test
       def setUp(self):
           self.client.drop_database("test_db")

       def test_finds_movies_by_year(self):
           # 2. Run: call the example function
           result = find_movies_by_year(
               self.CONNECTION_STRING
           )
           # 3. Assert: compare to expected output
           Expect.that(result) \
               .with_ignored_fields("_id") \
               .should_match(
                   "path/to/output.json"
               )

       # 4. Clean up: disconnect after all tests
       @classmethod
       def tearDownClass(cls):
           cls.client.close()
