This page uses the following :ruby:`MongoDB Ruby Driver </>` methods:

- :ruby-api:`Mongo::Collection#delete_many()
  <Collection.html#delete_many-instance_method>`
- :ruby-api:`Mongo::Collection#delete_one()
  <Collection.html#delete_one-instance_method>`

.. include:: /includes/driver-examples/examples-intro.rst

.. literalinclude:: /driver-examples/shell_examples_spec.rb
   :language: ruby
   :dedent: 6
   :start-after: Start Example 55
   :end-before: End Example 55

Delete All Documents
--------------------

To delete all documents from a collection, pass an empty
:ref:`filter<document-query-filter>` document ``{}`` to the
:ruby-api:`Mongo::Collection#delete_many()
<Collection.html#delete_many-instance_method>` method.

.. include:: /includes/fact-delete-all-inventory.rst

.. literalinclude:: /driver-examples/shell_examples_spec.rb
   :language: ruby
   :dedent: 8
   :start-after: Start Example 56
   :end-before: End Example 56

Upon successful execution, the
:ruby-api:`delete_many()
<Collection.html#delete_many-instance_method>` method returns an
instance of :ruby-api:`Mongo::Operation::Result
<Operation/Result.html>`, whose ``deleted_count`` attribute contains
the number of documents that matched the filter.

Delete All Documents that Match a Condition
-------------------------------------------

.. include:: /includes/fact-delete-condition-inventory.rst

To specify equality conditions, use ``<field> => <value>``
expressions in the
:ref:`query filter document <document-query-filter>`:

.. code-block:: ruby

   { <field1> => <value1>, ... }

A :ref:`query filter document <document-query-filter>` can
use the :ref:`query operators <query-selectors>` to specify
conditions in the following form:

.. code-block:: ruby

   { <field1> => { <operator1> => <value1> }, ... }

To delete all documents that match a deletion criteria, pass a
:ref:`filter <document-query-filter>` parameter to the
:ruby-api:`delete_many()
<Collection.html#delete_many-instance_method>` method.

.. include:: /includes/fact-remove-condition-inv-example.rst

.. literalinclude:: /driver-examples/shell_examples_spec.rb
   :language: ruby
   :dedent: 8
   :start-after: Start Example 57
   :end-before: End Example 57

Upon successful execution, the
:ruby-api:`delete_many()
<Collection.html#delete_many-instance_method>` method returns an
instance of :ruby-api:`Mongo::Operation::Result
<Operation/Result.html>`, whose ``deleted_count`` attribute contains
the number of documents that matched the filter.

Delete Only One Document that Matches a Condition
-------------------------------------------------

To delete at most a single document that matches a specified filter
(even though multiple documents may match the specified filter) use
the :ruby-api:`Mongo::Collection#delete_one()
<Collection.html#delete_one-instance_method>` method.

.. include:: /includes/fact-remove-one-condition-inv-example.rst

.. literalinclude:: /driver-examples/shell_examples_spec.rb
   :language: ruby
   :dedent: 8
   :start-after: Start Example 58
   :end-before: End Example 58

.. seealso::

   - :ruby-api:`Mongo::Collection#delete_many()
     <Collection.html#delete_many-instance_method>`
   - :ruby-api:`Mongo::Collection#delete_one()
     <Collection.html#delete_one-instance_method>`
