If using :readconcern:`"majority"` or :readconcern:`"linearizable"`
read concern for read operations, use :writeconcern:`{ w: "majority" }
<"majority">` write concern for write operations on the primary to
ensure that a single thread can read its own writes.
