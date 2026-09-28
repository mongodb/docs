This page uses the following `MongoDB C Driver <https://mongoc.org/libmongoc/current/index.html>`__
methods:

- `mongoc_collection_update_one <https://mongoc.org/libmongoc/current/mongoc_collection_update_one.html>`__
- `mongoc_collection_replace_one <https://mongoc.org/libmongoc/current/mongoc_collection_replace_one.html>`__

|populate-inventory|

.. literalinclude:: /driver-examples/test-mongoc-sample-commands.c
   :language: c
   :dedent: 3
   :start-after: Start Example 51
   :end-before: End Example 51

Update Documents in a Collection
--------------------------------

To modify field values, use :ref:`field-update-operators`
such as :update:`$set`.

Pass an update document to the update functions:

.. code-block:: c

   {
     <update operator>: { <field1>: <value1>, ... },
     <update operator>: { <field2>: <value2>, ... },
     ...
   }

.. include:: /includes/fact-update-set-create-fields.rst

Update a Single Document
~~~~~~~~~~~~~~~~~~~~~~~~

The following example uses the
`mongoc_collection_update_one <https://mongoc.org/libmongoc/current/mongoc_collection_update_one.html>`__
function on the ``inventory`` collection to update the *first* document
where ``item`` equals ``"paper"``:

.. literalinclude:: /driver-examples/test-mongoc-sample-commands.c
   :language: c
   :dedent: 3
   :start-after: Start Example 52
   :end-before: End Example 52

Update Multiple Documents
~~~~~~~~~~~~~~~~~~~~~~~~~

The following example uses the
`mongoc_collection_update_many <https://mongoc.org/libmongoc/current/mongoc_collection_update_many.html>`__
function on the ``inventory`` collection to update all documents where ``qty``
is less than ``50``:

.. literalinclude:: /driver-examples/test-mongoc-sample-commands.c
   :language: c
   :dedent: 3
   :start-after: Start Example 53
   :end-before: End Example 53

Replace a Document
~~~~~~~~~~~~~~~~~~

To replace the entire content of a document except for the ``_id``
field, pass an entirely new document as the third argument to
`mongoc_collection_replace_one <https://mongoc.org/libmongoc/current/mongoc_collection_replace_one.html>`__.

.. include:: /includes/fact-update-replace-example.rst

.. literalinclude:: /driver-examples/test-mongoc-sample-commands.c
   :language: c
   :dedent: 3
   :start-after: Start Example 54
   :end-before: End Example 54

.. include:: /includes/driver-examples/driver-example-c-cleanup.rst

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

Upsert Option
~~~~~~~~~~~~~

If `mongoc_collection_update_one <https://mongoc.org/libmongoc/current/mongoc_collection_update_one.html>`__,
`mongoc_collection_update_many <https://mongoc.org/libmongoc/current/mongoc_collection_update_many.html>`__, or
`mongoc_collection_replace_one <https://mongoc.org/libmongoc/current/mongoc_collection_replace_one.html>`__ includes
``upsert : true`` **and** no documents match the specified
filter, then the operation creates a new document and inserts
it. If there are matching documents, then the operation
modifies or replaces the matching document or documents.

For details on the new document created, see the individual reference
pages for the functions.

Write Acknowledgement
~~~~~~~~~~~~~~~~~~~~~

Specify the level of acknowledgment requested from MongoDB for write operations
with :ref:`write concerns <write-concern>`.

.. seealso::

   - `mongoc_collection_update_one <https://mongoc.org/libmongoc/current/mongoc_collection_update_one.html>`__
   - `mongoc_collection_update_many <https://mongoc.org/libmongoc/current/mongoc_collection_update_many.html>`__
   - `mongoc_collection_replace_one <https://mongoc.org/libmongoc/current/mongoc_collection_replace_one.html>`__
   - :ref:`additional-updates`
