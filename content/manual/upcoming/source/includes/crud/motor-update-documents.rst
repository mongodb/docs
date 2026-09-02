This page uses the
following `Motor <https://motor.readthedocs.io/en/stable/>`_
driver methods:

- :py:meth:`motor.motor_asyncio.AsyncIOMotorCollection.update_one`
- :py:meth:`motor.motor_asyncio.AsyncIOMotorCollection.update_many`
- :py:meth:`motor.motor_asyncio.AsyncIOMotorCollection.replace_one`

|populate-inventory|

.. literalinclude:: /driver-examples/test_examples_motor.py
   :language: python
   :dedent: 8
   :start-after: Start Example 51
   :end-before: End Example 51

Update Documents in a Collection
--------------------------------

To modify field values, use :ref:`field-update-operators`
such as :update:`$set`.

Pass an update document to the update methods:

.. code-block:: python

   {
     <update operator>: { <field1>: <value1>, ... },
     <update operator>: { <field2>: <value2>, ... },
     ...
   }

.. include:: /includes/fact-update-set-create-fields.rst

Update a Single Document
~~~~~~~~~~~~~~~~~~~~~~~~

The following example uses the
:py:meth:`~motor.motor_asyncio.AsyncIOMotorCollection.update_one`
method on the ``inventory`` collection to update the *first*
document where ``item`` equals ``"paper"``:

.. literalinclude:: /driver-examples/test_examples_motor.py
   :language: python
   :dedent: 8
   :start-after: Start Example 52
   :end-before: End Example 52

.. include:: /includes/fact-update-operation-uses.rst

Update Multiple Documents
~~~~~~~~~~~~~~~~~~~~~~~~~

The following example uses the
:py:meth:`~motor.motor_asyncio.AsyncIOMotorCollection.update_many`
method on the ``inventory`` collection to update all documents
where ``qty`` is less than ``50``:

.. literalinclude:: /driver-examples/test_examples_motor.py
   :language: python
   :dedent: 8
   :start-after: Start Example 53
   :end-before: End Example 53

.. include:: /includes/fact-update-many-operation-uses.rst

Replace a Document
~~~~~~~~~~~~~~~~~~

To replace the entire content of a document except for the ``_id``
field, pass an entirely new document as the second argument to
:py:meth:`~motor.motor_asyncio.AsyncIOMotorCollection.replace_one`.

.. include:: /includes/fact-update-replace-example.rst

.. literalinclude:: /driver-examples/test_examples_motor.py
   :language: python
   :dedent: 8
   :start-after: Start Example 54
   :end-before: End Example 54

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

If
:py:meth:`~motor.motor_asyncio.AsyncIOMotorCollection.update_one`,
:py:meth:`~motor.motor_asyncio.AsyncIOMotorCollection.update_many`,
or
:py:meth:`~motor.motor_asyncio.AsyncIOMotorCollection.replace_one`
includes ``upsert : true`` **and** no documents match the
specified filter, then the operation creates a new document and
inserts it. If there are matching documents, then the operation
modifies or replaces the matching document or documents.

For details on the new document created, see the individual
reference pages for the methods.

Write Acknowledgement
~~~~~~~~~~~~~~~~~~~~~

Specify the level of acknowledgment requested from MongoDB for write operations
with :ref:`write concerns <write-concern>`.

.. seealso::

   - :py:meth:`motor.motor_asyncio.AsyncIOMotorCollection.update_one`
   - :py:meth:`motor.motor_asyncio.AsyncIOMotorCollection.update_many`
   - :py:meth:`motor.motor_asyncio.AsyncIOMotorCollection.replace_one`
   - :ref:`additional-updates`
