.. the including document should define a |local-cmd-name| replacement

In the ``roles`` field, you can specify both
:ref:`built-in roles <built-in-roles>` and :ref:`user-defined
roles <user-defined-roles>`.

To specify a role that exists in the same database where
|local-cmd-name| runs, you can either specify the role with the name of
the role:

.. code-block:: javascript

   "readWrite"

Or you can specify the role with a document, as in:

.. code-block:: javascript

   { role: "<role>", db: "<database>" }

To specify a role that exists in a different database, specify the role
with a document.
