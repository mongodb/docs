This page uses the following :binary:`~bin.mongosh` methods:

- :method:`db.collection.updateOne(\<filter\>, \<update\>, \<options\>) <db.collection.updateOne>`
- :method:`db.collection.updateMany(\<filter\>, \<update\>, \<options\>) <db.collection.updateMany>`
- :method:`db.collection.replaceOne(\<filter\>, \<update\>, \<options\>) <db.collection.replaceOne>`

The following examples use the ``movies`` collection 
from the ``sample_mflix`` database. To learn how to
load the sample dataset into your deployment, see
:atlas:`Load Sample Data </sample-data/#std-label-load-sample-data>`.

.. _update-documents-modifiers:

Update Documents in a Collection
--------------------------------

To modify field values, use :ref:`field-update-operators`
such as :update:`$set`.

Pass an update document to the update methods:

.. code-block:: javascript

   {
     <update operator>: { <field1>: <value1>, ... },
     <update operator>: { <field2>: <value2>, ... },
     ...
   }

.. include:: /includes/fact-update-set-create-fields.rst

.. _write-op-updateOne:

Update a Single Document
~~~~~~~~~~~~~~~~~~~~~~~~

The following example uses the
:method:`db.collection.updateOne()` method on the
``movies`` collection to update the *first* document where
``title`` equals ``"The Godfather"``:

.. literalinclude:: /code-examples/tested/command-line/mongosh/crud-tutorials/update/update-one-godfather.js
   :language: javascript
   :category: usage example

.. include:: /includes/fact-update-operation-uses.rst

.. _update-multiple-documents:
.. _write-op-updateMany:

Update Multiple Documents
~~~~~~~~~~~~~~~~~~~~~~~~~

The following example uses the
:method:`db.collection.updateMany()` method on the ``movies``
collection to update all documents where ``num_mflix_comments`` is greater than
``100``:

.. literalinclude:: /code-examples/tested/command-line/mongosh/crud-tutorials/update/update-many-popular-movies.js
   :language: javascript
   :category: usage example

Replace a Document
~~~~~~~~~~~~~~~~~~

To replace the entire content of a document except for the ``_id``
field, pass an entirely new document as the second argument to
:method:`db.collection.replaceOne()`.

When replacing a document, the replacement document must consist of only
field/value pairs. The replacement document cannot include 
:ref:`update operators <update-operators-top-level>` expressions.

The replacement document can have different fields from the original
document. In the replacement document, you can omit the ``_id`` field
since the ``_id`` field is immutable. However, if you do include the
``_id`` field, it must have the same value as the current value.

The following example replaces the *first* document from the
``movies`` collection where ``title: "The Godfather"``:

.. literalinclude:: /code-examples/tested/command-line/mongosh/crud-tutorials/update/replace-one-godfather.js
   :language: javascript
   :category: usage example

.. _write-op-update-behavior:

Behavior
--------

Atomicity
~~~~~~~~~

All write operations are atomic at the document level. For more information,
see :ref:`transactions-write-atomicity`.

``_id`` Field
~~~~~~~~~~~~~

Once set, you cannot update the ``_id`` field value nor can you replace a
document with one that has a different ``_id`` value.

Idempotent Operations 
~~~~~~~~~~~~~~~~~~~~~

Use ``updateMany()`` only for :term:`idempotent` operations.

Field Order
~~~~~~~~~~~

.. include:: /includes/fact-update-field-order.rst

.. _write-operations-upsert-behavior:

Upsert Option
~~~~~~~~~~~~~

If :method:`~db.collection.updateOne()`,
:method:`~db.collection.updateMany()`, or
:method:`~db.collection.replaceOne()` includes ``upsert : true``
**and** no documents match the specified filter, then the
operation creates a new document and inserts it. If there are
matching documents, then the operation modifies or replaces the
matching document or documents.

For details on the new document created, see the individual
reference pages for the methods.

Write Acknowledgement
~~~~~~~~~~~~~~~~~~~~~

Specify the level of acknowledgment requested from MongoDB for write operations
with :ref:`write concerns <write-concern>`.

.. seealso::

   - :doc:`/tutorial/update-documents-with-aggregation-pipeline`
   - :method:`db.collection.updateOne()`
   - :method:`db.collection.updateMany()`
   - :method:`db.collection.replaceOne()`
   - :ref:`additional-updates`
