.. _|idref|-documentKey:

Document that contains the ``_id`` value of the document created or 
modified by the :ref:`CRUD <crud>` operation.

For sharded collections, this field also displays the shard key
fields that are present in the document. MongoDB does not repeat
the ``_id`` field if it is already a part of the shard key.

To use this field as a query filter, see
:ref:`change-stream-document-key-filter`.
