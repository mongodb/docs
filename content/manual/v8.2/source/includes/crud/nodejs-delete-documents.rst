This page uses the following :driver:`MongoDB Node.js Driver </node/>`
methods:

- :driver:`Collection.deleteMany()
  </node/current/usage-examples/deleteMany/>`
- :driver:`Collection.deleteOne()
  </node/current/usage-examples/deleteOne/>`

.. include:: /includes/driver-examples/examples-intro.rst

.. literalinclude:: /driver-examples/node_remove.js
   :language: javascript
   :dedent: 4
   :start-after: Start Example 55
   :end-before: End Example 55

Delete All Documents
--------------------

To delete all documents from a collection, pass an empty
:ref:`filter<document-query-filter>` document ``{}`` to the
:driver:`Collection.deleteMany()
</node/current/usage-examples/deleteMany/>` method.

.. include:: /includes/fact-delete-all-inventory.rst

.. literalinclude:: /driver-examples/node_remove.js
   :language: javascript
   :dedent: 6
   :start-after: Start Example 56
   :end-before: End Example 56

:driver:`Collection.deleteMany() </node/current/usage-examples/deleteMany/>`
returns a promise that provides a ``result``. The
``result.deletedCount`` property contains the number of documents
that matched the filter.

Delete All Documents that Match a Condition
-------------------------------------------

.. include:: /includes/fact-delete-condition-inventory.rst

To specify equality conditions, use ``<field>:<value>``
expressions in the
:ref:`query filter document <document-query-filter>`:

.. code-block:: javascript

   { <field1>: <value1>, ... }

A :ref:`query filter document <document-query-filter>` can
use the :ref:`query operators <query-selectors>` to specify
conditions in the following form:

.. code-block:: javascript

   { <field1>: { <operator1>: <value1> }, ... }

To delete all documents that match a deletion criteria, pass a
:ref:`filter <document-query-filter>` parameter to the
:driver:`deleteMany() </node/current/usage-examples/deleteMany/>`
method.

.. include:: /includes/fact-remove-condition-inv-example.rst

.. literalinclude:: /driver-examples/node_remove.js
   :language: javascript
   :dedent: 6
   :start-after: Start Example 57
   :end-before: End Example 57

:driver:`Collection.deleteMany() </node/current/usage-examples/deleteMany/>`
returns a promise that provides a ``result``. The
``result.deletedCount`` property contains the number of documents
that matched the filter.

Delete Only One Document that Matches a Condition
-------------------------------------------------

To delete at most a single document that matches a specified filter
(even though multiple documents may match the specified filter) use
the :driver:`Collection.deleteOne()
</node/current/usage-examples/deleteOne/>` method.

.. include:: /includes/fact-remove-one-condition-inv-example.rst

.. literalinclude:: /driver-examples/node_remove.js
   :language: javascript
   :dedent: 6
   :start-after: Start Example 58
   :end-before: End Example 58

.. seealso::

   - :driver:`Collection.deleteMany()
     </node/current/usage-examples/deleteMany/>`
   - :driver:`Collection.deleteOne()
     </node/current/usage-examples/deleteOne/>`
   - :ref:`additional-deletes`
