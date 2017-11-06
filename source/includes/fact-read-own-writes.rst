Starting in MongoDB 3.6, you can use :ref:`causally consistent sessions
<sessions>` to read your own writes, if the writes request
acknowledgement.

Prior to MongoDB 3.6, you must have issued your write operation with
:writeconcern:`{ w: "majority" } <"majority">` write concern and then
use either :readconcern:`"majority"` or :readconcern:`"linearizable"`
read concern for the read operations to ensure that a single thread can
read its own writes.

