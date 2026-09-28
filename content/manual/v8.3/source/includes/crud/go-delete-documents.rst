This page uses the following :driver:`MongoDB Go Driver </go/>`
functions:

- :go-api:`Collection.DeleteMany<mongo#Collection.DeleteMany>`
- :go-api:`Collection.DeleteOne<mongo#Collection.DeleteOne>`

.. include:: /includes/driver-examples/examples-intro.rst

.. literalinclude:: /driver-examples/go_examples.go
   :language: go
   :dedent: 2
   :start-after: Start Example 55
   :end-before: End Example 55

Delete All Documents
--------------------

To delete all documents from a collection, pass an empty
:ref:`filter<document-query-filter>` document to the
:go-api:`Collection.DeleteMany<mongo#Collection.DeleteMany>` function.

.. include:: /includes/fact-delete-all-inventory.rst

.. literalinclude:: /driver-examples/go_examples.go
   :language: go
   :dedent: 2
   :start-after: Start Example 56
   :end-before: End Example 56

Upon successful execution, the
:go-api:`Collection.DeleteMany <mongo#Collection.DeleteMany>` function
returns an instance of :go-api:`DeleteResult <mongo#DeleteResult>`
whose ``DeletedCount`` property contains the number of documents that
matched the filter.

Delete All Documents that Match a Condition
-------------------------------------------

.. include:: /includes/fact-delete-condition-inventory.rst

To specify equality conditions, use the ``bson.D`` type to
create a filter document:

.. code-block:: go

   filter := bson.D{{"<field>", <value>}}

In addition to the equality filter, MongoDB provides
various :ref:`query operators <query-selectors>` to specify
filter conditions. Use the bson package to create query
operators for filter documents. For example:

.. code-block:: go

   filter := bson.D{
       {"$and", bson.A{
           bson.D{{"field1", bson.D{{"$eq", value1}}}},
           bson.D{{"field2", bson.D{{"$lt", value2}}}},
       }},
   }

To delete all documents that match a deletion criteria, pass a
:ref:`filter <document-query-filter>` parameter to the
:go-api:`Collection.DeleteMany<mongo#Collection.DeleteMany>` function.

.. include:: /includes/fact-remove-condition-inv-example.rst

.. literalinclude:: /driver-examples/go_examples.go
   :language: go
   :dedent: 2
   :start-after: Start Example 57
   :end-before: End Example 57

Upon successful execution, the
:go-api:`Collection.DeleteMany <mongo#Collection.DeleteMany>` function
returns an instance of :go-api:`DeleteResult <mongo#DeleteResult>`
whose ``DeletedCount`` property contains the number of documents that
matched the filter.

Delete Only One Document that Matches a Condition
-------------------------------------------------

To delete at most a single document that matches a specified filter
(even though multiple documents may match the specified filter) use
the :go-api:`Collection.DeleteOne<mongo#Collection.DeleteOne>`
function.

.. include:: /includes/fact-remove-one-condition-inv-example.rst

.. literalinclude:: /driver-examples/go_examples.go
   :language: go
   :dedent: 2
   :start-after: Start Example 58
   :end-before: End Example 58

.. seealso::

   - :go-api:`Collection.DeleteMany<mongo#Collection.DeleteMany>`
   - :go-api:`Collection.DeleteOne<mongo#Collection.DeleteOne>`
   - :ref:`additional-deletes`
