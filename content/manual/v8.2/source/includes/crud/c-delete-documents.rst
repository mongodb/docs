This page uses the following `MongoDB C Driver
<https://mongoc.org/libmongoc/current/index.html>`__ methods:

- `mongoc_collection_delete_one
  <https://mongoc.org/libmongoc/current/mongoc_collection_delete_one.html>`__
- `mongoc_collection_delete_many
  <https://mongoc.org/libmongoc/current/mongoc_collection_delete_many.html>`__

.. include:: /includes/driver-examples/examples-intro.rst

.. literalinclude:: /driver-examples/test-mongoc-sample-commands.c
   :language: c
   :dedent: 3
   :start-after: Start Example 55
   :end-before: End Example 55

Delete All Documents
--------------------

To delete all documents from a collection, pass the
`mongoc_collection_t
<https://mongoc.org/libmongoc/current/mongoc_collection_t.html>`__
and a `bson_t
<https://mongoc.org/libbson/current/bson_t.html>`__ that matches all
documents to the `mongoc_collection_delete_many
<https://mongoc.org/libmongoc/current/mongoc_collection_delete_many.html>`__
method.

.. include:: /includes/fact-delete-all-inventory.rst

.. literalinclude:: /driver-examples/test-mongoc-sample-commands.c
   :language: c
   :dedent: 3
   :start-after: Start Example 56
   :end-before: End Example 56

The `mongoc_collection_delete_many
<https://mongoc.org/libmongoc/current/mongoc_collection_delete_many.html>`__
method returns ``true`` if successful, or returns ``false`` and sets
an error if there are invalid arguments or a server or network error
occurs.

Delete All Documents that Match a Condition
-------------------------------------------

.. include:: /includes/fact-delete-condition-inventory.rst

To specify equality conditions, use ``<field>:<value>``
expressions in the
:ref:`query filter document <document-query-filter>`:

.. code-block:: c

   { <field1>: <value1>, ... }

A :ref:`query filter document <document-query-filter>` can
use the :ref:`query operators <query-selectors>` to specify
conditions in the following form:

.. code-block:: c

   { <field1>: { <operator1>: <value1> }, ... }

To delete all documents that match a deletion criteria, pass the
`mongoc_collection_t
<https://mongoc.org/libmongoc/current/mongoc_collection_t.html>`__
and a `bson_t
<https://mongoc.org/libbson/current/bson_t.html>`__ that matches the
documents you want to delete to the `mongoc_collection_delete_many
<https://mongoc.org/libmongoc/current/mongoc_collection_delete_many.html>`__
method.

.. literalinclude:: /driver-examples/test-mongoc-sample-commands.c
   :language: c
   :dedent: 3
   :start-after: Start Example 57
   :end-before: End Example 57

The `mongoc_collection_delete_many
<https://mongoc.org/libmongoc/current/mongoc_collection_delete_many.html>`__
method returns ``true`` if successful, or returns ``false`` and sets
an error if there are invalid arguments or a server or network error
occurs.

Delete Only One Document that Matches a Condition
-------------------------------------------------

To delete a single document from a collection, pass the
`mongoc_collection_t
<https://mongoc.org/libmongoc/current/mongoc_collection_t.html>`__
and a `bson_t
<https://mongoc.org/libbson/current/bson_t.html>`__ that matches the
document you want to delete to the `mongoc_collection_delete_one
<https://mongoc.org/libmongoc/current/mongoc_collection_delete_one.html>`__
method.

.. include:: /includes/fact-remove-one-condition-inv-example.rst

.. literalinclude:: /driver-examples/test-mongoc-sample-commands.c
   :language: c
   :dedent: 3
   :start-after: Start Example 58
   :end-before: End Example 58

.. include:: /includes/driver-examples/driver-example-c-cleanup.rst

.. seealso::

   - `mongoc_collection_delete_one
     <https://mongoc.org/libmongoc/current/mongoc_collection_delete_one.html>`__
   - `mongoc_collection_delete_many
     <https://mongoc.org/libmongoc/current/mongoc_collection_delete_many.html>`__
   - :ref:`additional-deletes`
