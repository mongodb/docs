If your MongoDB deployment has no users, you *must* connect to
:program:`mongod` using the :ref:`localhost exception
<localhost-exception>` or use the :option:`--noauth <mongod --noauth>`
option when starting :program:`mongod` to gain full access the
system. Once you have access, you can skip to *Creating the system
user administrator* in this procedure.

If users exist in the MongoDB database, but none of them has the
appropriate prerequisites to create a new user or you do not have access
to them, you *must* restart :program:`mongod` with the :option:`--noauth
<mongod --noauth>` option.
