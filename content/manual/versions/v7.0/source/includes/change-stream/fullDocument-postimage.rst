.. versionchanged:: 6.0

Starting in MongoDB 6.0, if you set the ``changeStreamPreAndPostImages`` option
using :method:`db.createCollection()`, :dbcommand:`create`, or
:dbcommand:`collMod`, then the ``fullDocument`` field shows the document after
it was inserted, replaced, or updated (the document post-image). 
``fullDocument`` is always included for ``insert`` events.

