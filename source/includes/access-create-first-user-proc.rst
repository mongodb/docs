If your MongoDB database has no users, you *must* connect to :program:`mongod`
using the :ref:`localhost exception <localhost-exception>`
or use the :option:`--noauth <mongod --noauth>` option when starting
:program:`mongod`. In such cases, skip to Step 3 of the procedure.

If users exist in the MongoDB database, but none of them has the
appropriate prerequisites to create a new user or you do not have access
to them, you *must* restart :program:`mongod` with the :option:`--noauth
<mongod --noauth>` option.
