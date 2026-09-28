.. |query_operations| replace:: query operations on embedded/nested documents

This page provides examples of |query_operations| using the
:phpmethod:`MongoDB\\Collection::find() <phpmethod.MongoDB\\Collection::find()>`
method in the
`MongoDB PHP Library <https://www.mongodb.com/docs/drivers/php-libraries/>`_.

.. include:: /includes/driver-examples/examples-intro.rst

.. literalinclude:: /driver-examples/DocumentationExamplesTest.php
   :language: php
   :dedent: 8
   :start-after: Start Example 14
   :end-before: End Example 14

Query Nested Fields with Dot Notation
-------------------------------------

Specify query conditions on fields in an embedded/nested document with
:term:`dot notation` ``"field.nestedField"``.

.. note::

  When you query with dot notation, the field and nested field must be
  inside quotation marks.

Specify Equality Match on a Nested Field
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example selects all documents where the field ``uom``
nested in the ``size`` field equals ``"in"``:

.. literalinclude:: /driver-examples/DocumentationExamplesTest.php
   :language: php
   :dedent: 8
   :start-after: Start Example 17
   :end-before: End Example 17

Specify Match using Query Operator
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A :ref:`query filter document <document-query-filter>` can
use the :ref:`query operators <query-selectors>` to specify
conditions in the following form:

.. code-block:: php

   [ <field1> => [ <operator1> => <value1> ], ... ]

The following query uses the less than operator (:query:`$lt`) on
the field ``h`` embedded in the ``size`` field:

.. literalinclude:: /driver-examples/DocumentationExamplesTest.php
   :language: php
   :dedent: 8
   :start-after: Start Example 18
   :end-before: End Example 18

Specify ``AND`` Condition
~~~~~~~~~~~~~~~~~~~~~~~~~

The following query selects all documents where the nested field ``h``
is less than ``15``, the nested field ``uom`` equals ``"in"``, and the
``status`` field equals ``"D"``:

.. literalinclude:: /driver-examples/DocumentationExamplesTest.php
   :language: php
   :dedent: 8
   :start-after: Start Example 19
   :end-before: End Example 19

Match an Embedded/Nested Document
---------------------------------

To specify an equality condition on a field that is an
embedded/nested document, use the
:ref:`query filter document <document-query-filter>`
``[ <field> => <value> ]`` where ``<value>`` is the document
to match.

For example, the following query selects all documents where the field
``size`` equals the document ``{ h: 14, w: 21, uom: "cm" }``:

.. literalinclude:: /driver-examples/DocumentationExamplesTest.php
   :language: php
   :dedent: 8
   :start-after: Start Example 15
   :end-before: End Example 15

.. warning::

   MongoDB does not recommend :ref:`comparisons <query-comparison>` on embedded
   documents because the operations require an *exact* match of the specified
   ``<value>`` document, including the field order.

   For example, the following query does not match any documents in the
   ``inventory`` collection:

   .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
      :language: php
      :dedent: 8
      :start-after: Start Example 16
      :end-before: End Example 16

   Queries that use comparisons on embedded documents can result in
   unpredictable behavior when used with a driver that does not use ordered data
   structures for expressing queries. 
