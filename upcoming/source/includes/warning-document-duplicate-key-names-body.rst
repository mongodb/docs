The MongoDB Query Language doesn't support documents with duplicate
field names:

- Although some BSON builders may support creating a BSON document with
  duplicate field names, inserting these documents into MongoDB isn't
  supported even if the insert succeeds, or appears to succeed.

- For example, inserting a BSON document with duplicate field names
  through a MongoDB driver may result in the driver silently dropping
  the duplicate values prior to insertion, or may result in an invalid
  document being inserted that contains duplicate fields. Querying those
  documents leads to inconsistent results. 

- Updating documents with duplicate field names isn't
  supported, even if the update succeeds or appears to succeed.

Starting in MongoDB 6.1, to see if a document has duplicate field names,
use the :dbcommand:`validate` command with the ``full`` field set to
``true``. In any MongoDB version, use the :expression:`$objectToArray`
aggregation operator to see if a document has duplicate field names.
