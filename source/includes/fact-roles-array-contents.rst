.. the including document should define a |local-cmd-name| replacement

In the ``roles`` field, you can specify both
:ref:`system-defined roles <system-user-roles>` and :ref:`user-defined
role <user-defined-roles>`. In general, when used with
|local-cmd-name|, specify the role with a document, as in:

.. code-block:: javascript

   { role: "<role>", db: "<database>" }

However, to refer to a role that exists in the same database the
command runs, you can specify the role either with a role document
(e.g. ``{ role: "readWrite", db: "sameDB" }`` ) or with the name of
the role (e.g. ``"readWrite"``).
