Starting in MongoDB 3.6, you can use :ref:`causally consistent sessions
<sessions>` to read your own writes, if the writes request
acknowledgment.

Prior to MongoDB 3.6, in order to read your own writes you must issue
your write operation with :writeconcern:`{ w: "majority" } <"majority">`
write concern, and then issue your read operation with
:readmode:`primary` read preference, and either
:readconcern:`"majority"` or :readconcern:`"linearizable"` read concern.

