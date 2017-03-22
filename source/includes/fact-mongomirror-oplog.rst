Because :program:`mongomirror` tails the source oplog and *applies* the
entries to the destination cluster, the destination oplog is not an
exact duplicate of the source's oplog. Instead, the tailed entries from
the source oplog become part of an ``applyOps`` entry in the
destination oplog.

For example, after :program:`mongomirror` has performed the initial
sync, the source replica set receives three insert operations and has
the following oplog entries for these operations:

.. code-block:: javascript

   {"ts":<ts1>,"t":<t1>,"h":<h1>,"v":2,"op":"i","ns":"test.foo","o":{"_id":0,"a":0}}
   {"ts":<ts2>,"t":<t2>,"h":<h2>,"v":2,"op":"i","ns":"test.foo","o":{"_id":1,"a":1}}
   {"ts":<ts3>,"t":<t3>,"h":<h3>,"v":2,"op":"i","ns":"test.foo","o":{"_id":2,"a":2}}

As :program:`mongomirror` tails the source ``oplog`` and applies these
operations to the destination cluster, the three entries become part of
a single entry in the destination cluster's oplog:

.. code-block:: javascript

   {"ts":<ts>,"t":<t>,"h":<h>,"v":2,"op":"c","ns":"admin.$cmd","o":{"applyOps":
     [
       {"ts":<ts1>,"t":<t1>,"h":<h1>,"v":2,"op":"i","ns":"test.foo","o":{"_id":0,"a":0},"o2":{ }},
       {"ts":<ts2>,"t":<t2>,"h":<h2>,"v":2,"op":"i","ns":"test.foo","o":{"_id":1,"a":1},"o2":{ }},
       {"ts":<ts3>,"t":<t3>,"h":<h3>,"v":2,"op":"i","ns":"test.foo","o":{"_id":2,"a":2},"o2":{ }}
     ]
   } }

For applications that tail or parse the ``oplog``, if you switch these
applications to read from the destination cluster's oplog, you may need
to modify the applications, depending on how you wish to handle these
``applyOps`` entries.

If you have not switched over to writing to the destination cluster,
you can continue to read from the source without modifying these
applications.
