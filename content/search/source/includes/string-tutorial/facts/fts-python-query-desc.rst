The code example performs the following tasks:

- Imports ``pymongo``, the MongoDB Python driver, and the ``dns``
  module, which is required to connect ``pymongo`` to ``Atlas``
  using a |dns| seed list connection string.

- Creates an instance of the ``MongoClient`` class to establish a
  connection to your cluster.

- Iterates over the cursor to print the documents that match the
  query.
