This page uses the following `PyMongo
<https://pymongo.readthedocs.io/en/stable/index.html>`__ Python
driver methods:

- :py:meth:`pymongo.collection.Collection.delete_many`
- :py:meth:`pymongo.collection.Collection.delete_one`

.. include:: /includes/driver-examples/examples-intro.rst

.. literalinclude:: /driver-examples/test_examples.py
   :language: python
   :dedent: 8
   :start-after: Start Example 55
   :end-before: End Example 55

Delete All Documents
--------------------

To delete all documents from a collection, pass an empty
:ref:`filter<document-query-filter>` document ``{}`` to the
:py:meth:`pymongo.collection.Collection.delete_many` method.

.. include:: /includes/fact-delete-all-inventory.rst

.. literalinclude:: /driver-examples/test_examples.py
   :language: python
   :dedent: 8
   :start-after: Start Example 56
   :end-before: End Example 56

The :py:meth:`~pymongo.collection.Collection.delete_many` method
returns an instance of :py:class:`pymongo.results.DeleteResult` with
the status of the operation.

Delete All Documents that Match a Condition
-------------------------------------------

.. include:: /includes/fact-delete-condition-inventory.rst

To specify equality conditions, use ``<field>:<value>``
expressions in the
:ref:`query filter document <document-query-filter>`:

.. code-block:: python

   { <field1>: <value1>, ... }

A :ref:`query filter document <document-query-filter>` can
use the :ref:`query operators <query-selectors>` to specify
conditions in the following form:

.. code-block:: python

   { <field1>: { <operator1>: <value1> }, ... }

To delete all documents that match a deletion criteria, pass a
:ref:`filter <document-query-filter>` parameter to the
:py:meth:`~pymongo.collection.Collection.delete_many` method.

.. include:: /includes/fact-remove-condition-inv-example.rst

.. literalinclude:: /driver-examples/test_examples.py
   :language: python
   :dedent: 8
   :start-after: Start Example 57
   :end-before: End Example 57

The :py:meth:`~pymongo.collection.Collection.delete_many` method
returns an instance of :py:class:`pymongo.results.DeleteResult` with
the status of the operation.

Delete Only One Document that Matches a Condition
-------------------------------------------------

To delete at most a single document that matches a specified filter
(even though multiple documents may match the specified filter) use
the :py:meth:`pymongo.collection.Collection.delete_one` method.

.. include:: /includes/fact-remove-one-condition-inv-example.rst

.. literalinclude:: /driver-examples/test_examples.py
   :language: python
   :dedent: 8
   :start-after: Start Example 58
   :end-before: End Example 58

.. seealso::

   - :py:meth:`pymongo.collection.Collection.delete_many`
   - :py:meth:`pymongo.collection.Collection.delete_one`
   - :ref:`additional-deletes`
