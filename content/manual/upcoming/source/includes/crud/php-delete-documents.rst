This page uses the following `MongoDB PHP Library
<https://www.mongodb.com/docs/php-library/current/>`_ methods:

- :phpmethod:`MongoDB\\Collection::deleteMany()
  <phpmethod.MongoDB\\Collection::deleteMany()>`
- :phpmethod:`MongoDB\\Collection::deleteOne()
  <phpmethod.MongoDB\\Collection::deleteOne()>`

.. include:: /includes/driver-examples/examples-intro.rst

.. literalinclude:: /driver-examples/DocumentationExamplesTest.php
   :language: php
   :dedent: 8
   :start-after: Start Example 55
   :end-before: End Example 55

Delete All Documents
--------------------

To delete all documents from a collection, pass an empty
:ref:`filter<document-query-filter>` document ``[]`` to the
:phpmethod:`MongoDB\\Collection::deleteMany()
<phpmethod.MongoDB\\Collection::deleteMany()>` method.

.. include:: /includes/fact-delete-all-inventory.rst

.. literalinclude:: /driver-examples/DocumentationExamplesTest.php
   :language: php
   :dedent: 8
   :start-after: Start Example 56
   :end-before: End Example 56

Upon successful execution, the
:phpmethod:`deleteMany() <phpmethod.MongoDB\\Collection::deleteMany()>`
method returns an instance of
:phpclass:`MongoDB\\DeleteResult
<phpclass.MongoDB\\DeleteResult>` whose
:phpmethod:`getDeletedCount()<phpmethod.MongoDB\\DeleteResult::getDeletedCount()>`
method returns the number of documents that matched the filter.

Delete All Documents that Match a Condition
-------------------------------------------

.. include:: /includes/fact-delete-condition-inventory.rst

To specify equality conditions, use ``<field> => <value>``
expressions in the
:ref:`query filter document <document-query-filter>`:

.. code-block:: php

   [ <field1> => <value1>, ... ]

A :ref:`query filter document <document-query-filter>` can
use the :ref:`query operators <query-selectors>` to specify
conditions in the following form:

.. code-block:: php

   [ <field1> => [ <operator1> => <value1> ], ... ]

To delete all documents that match a deletion criteria, pass a
:ref:`filter <document-query-filter>` parameter to the
:phpmethod:`deleteMany()
<phpmethod.MongoDB\\Collection::deleteMany()>` method.

.. include:: /includes/fact-remove-condition-inv-example.rst

.. literalinclude:: /driver-examples/DocumentationExamplesTest.php
   :language: php
   :dedent: 8
   :start-after: Start Example 57
   :end-before: End Example 57

Upon successful execution, the
:phpmethod:`deleteMany() <phpmethod.MongoDB\\Collection::deleteMany()>`
method returns an instance of
:phpclass:`MongoDB\\DeleteResult
<phpclass.MongoDB\\DeleteResult>` whose
:phpmethod:`getDeletedCount()<phpmethod.MongoDB\\DeleteResult::getDeletedCount()>`
method returns the number of documents that matched the filter.

Delete Only One Document that Matches a Condition
-------------------------------------------------

To delete at most a single document that matches a specified filter
(even though multiple documents may match the specified filter) use
the :phpmethod:`MongoDB\\Collection::deleteOne()
<phpmethod.MongoDB\\Collection::deleteOne()>` method.

.. include:: /includes/fact-remove-one-condition-inv-example.rst

.. literalinclude:: /driver-examples/DocumentationExamplesTest.php
   :language: php
   :dedent: 8
   :start-after: Start Example 58
   :end-before: End Example 58

.. seealso::

   - :phpmethod:`MongoDB\\Collection::deleteMany()
     <phpmethod.MongoDB\\Collection::deleteMany()>`
   - :phpmethod:`MongoDB\\Collection::deleteOne()
     <phpmethod.MongoDB\\Collection::deleteOne()>`
   - :ref:`additional-deletes`
