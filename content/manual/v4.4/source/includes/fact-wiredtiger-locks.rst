For most read and write operations, WiredTiger uses optimistic
concurrency control. WiredTiger uses only intent locks at the global,
database and collection levels. When the storage engine detects
conflicts between two operations, one will incur a write conflict
causing MongoDB to transparently retry that operation.

Some global operations, typically short lived operations involving
multiple databases, still require a global "instance-wide" lock.
Some other operations, such as :dbcommand:`collMod`, still require
an exclusive database lock.
