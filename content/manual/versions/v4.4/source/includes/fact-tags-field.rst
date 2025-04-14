A ``tags`` document contains user-defined tag field and value pairs for
the replica set member.

.. code-block:: javascript
   :copyable: false

   { "<tag1>": "<string1>", "<tag2>": "<string2>",... }

- For read operations, you can specify a tag set in the :ref:`read
  preference <replica-set-read-preference-tag-sets>` to direct the
  operations to replica set member(s) with the specified tag(s).

- For write operations, you can create a customize :doc:`write concern
  </reference/write-concern>` using
  :rsconf:`settings.getLastErrorModes` and
  :rsconf:`settings.getLastErrorDefaults`.

For more information, see
:doc:`/tutorial/configure-replica-set-tag-sets`.
