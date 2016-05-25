In MongoDB, documents stored in a collection require a unique
:term:`_id` field that acts as a :term:`primary key`. If the ``_id``
field is unspecified in the documents, MongoDB uses :ref:`ObjectIds
<objectid>` as the default value for the ``_id`` field; i.e. if a
document does not contain a top-level ``_id`` field during an insert,
the MongoDB driver adds the ``_id`` field that holds an :ref:`objectid`.

In addition, if the :program:`mongod` receives a document to insert
that does not contain an ``_id`` field (e.g. through an update
operation with an :ref:`upsert option <upsert-parameter>`)
:program:`mongod` will add the ``_id`` field that holds an ObjectId.
