# THIS IS AN EXAMPLE. DO NOT USE ON A PAGE.
# You can copy this to get started on making a new python code example.
# See https://mongodb-university.github.io/Bluehawk/ for more info on Bluehawk.

from pymongo import MongoClient

# Write your code example inside a function that you can call from a corresponding test.
# When you call the function in the test, this executes the code example.
# The function can return output, which the test can validate to confirm that the code works.
def example(CONNECTION_STRING):
    client = MongoClient(CONNECTION_STRING)
    some_db = client["some_db_name"]

    try:
        # The text string after the :snippet-start: tag is used in the name of the snippet.
        # It should be a unique indentifier within this example file.
        # :snippet-start: stub-print
        print("Stub example. Do not use in a literal include.")

        print("Unnecessary code for tests. Use # :remove:") # :remove:

        # Be careful of whitespace when using :remove: There will be 2 newlines above this.

        # :snippet-end:
        # The rest of the file will not be included in the snippet!

        # We can return something to compare expected output to actual output in our test.
        return "query results"

    finally:
        # Always close connection to free resources.
        client.close()
