.. |query_operations| replace:: query operations with projection

This page provides examples of |query_operations| using
:ref:`MongoDB Compass <compass-index>`. 

.. include:: /includes/driver-examples/examples-intro.rst

.. code-block:: javascript

   [
         { "item": "journal", "status": "A", "size": { "h": 14, "w": 21, "uom": "cm" }, "instock": [ { "warehouse": "A", "qty": 5 } ] },
         { "item": "notebook", "status": "A", "size": { "h": 8.5, "w": 11, "uom": "in" }, "instock": [ { "warehouse": "C", "qty": 5 } ] },
         { "item": "paper", "status": "D", "size": { "h": 8.5, "w": 11, "uom": "in" }, "instock": [ { "warehouse": "A", "qty": 60 } ] },
         { "item": "planner", "status": "D", "size": { "h": 22.85, "w": 30, "uom": "cm" }, "instock": [ { "warehouse": "A", "qty": 40 } ] },
         { "item": "postcard", "status": "A", "size": { "h": 10, "w": 15.25, "uom": "cm" }, "instock": [ { "warehouse": "B", "qty": 15 }, { "warehouse": "C", "qty": 35 } ] }
   ]

Return All Fields in Matching Documents
---------------------------------------

If you do not specify a :term:`projection` document, the
:method:`db.collection.find()` method returns all fields in the
matching documents.

The following example returns all fields from all documents in the
``inventory`` collection where the ``status`` equals ``"A"``:

1. Copy the following expression into the :guilabel:`Filter`
   field:

   .. code-block:: javascript

      { status: "A" }

#. Click :guilabel:`Find`.

The operation corresponds to the following SQL statement:

.. code-block:: sql

   SELECT * from inventory WHERE status = "A"

Return the Specified Fields and the ``_id`` Field Only
------------------------------------------------------

A projection can explicitly include several fields by setting the
``<field>`` to ``1`` in the projection document. The following
operation returns all documents that match the query. In the result
set, only the ``item``, ``status`` and, by default, the ``_id`` fields
return in the matching documents.

1. Copy the following expression into the :guilabel:`Filter`
   field:

   .. code-block:: javascript

      { status: "A" }

#. Click :guilabel:`Options` to open the additional query
   options.

#. Copy the following expression into the :guilabel:`Project`
   field:

   .. code-block:: javascript

      { item: 1, status: 1 }

#. Click :guilabel:`Find`.

The operation corresponds to the following SQL statement:

.. code-block:: sql

   SELECT _id, item, status from inventory WHERE status = "A"

Suppress ``_id`` Field
----------------------

You can remove the ``_id`` field from the results by setting it to
``0`` in the projection, as in the following example:

1. Copy the following expression into the :guilabel:`Filter`
   field:

   .. code-block:: javascript

      { status: "A" }

#. Click :guilabel:`Options` to open the additional query
   options.

#. Copy the following expression into the :guilabel:`Project`
   field:

   .. code-block:: javascript

      { item: 1, status: 1, _id: 0 }

#. Click :guilabel:`Find`.

The operation corresponds to the following SQL statement:

.. code-block:: sql

   SELECT item, status from inventory WHERE status = "A"

.. note::

   With the exception of the ``_id`` field, you cannot combine inclusion
   and exclusion statements in projection documents.

Return All But the Excluded Fields
----------------------------------

Instead of listing the fields to return in the matching document, you
can use a projection to exclude specific fields. The following example
which returns all fields except for the ``status`` and the ``instock``
fields in the matching documents:

1. Copy the following expression into the :guilabel:`Filter`
   field:

   .. code-block:: javascript

      { status: "A" }

#. Click :guilabel:`Options` to open the additional query
   options.

#. Copy the following expression into the :guilabel:`Project`
   field:

   .. code-block:: javascript

      { status: 0, instock: 0 }

#. Click :guilabel:`Find`.

.. note::

   With the exception of the ``_id`` field, you cannot combine inclusion
   and exclusion statements in projection documents.

Return Specific Fields in Embedded Documents
--------------------------------------------

You can return specific fields in an embedded document. Use the
:ref:`dot notation <document-dot-notation>` to refer to the embedded
field and set to ``1`` in the projection document.

The following example returns:

- The ``_id`` field (returned by default),
- The ``item`` field,
- The ``status`` field,
- The ``uom`` field in the ``size`` document.

The ``uom`` field remains embedded in the ``size`` document.

1. Copy the following expression into the :guilabel:`Filter`
   field:

   .. code-block:: javascript

      { status: "A" }

#. Click :guilabel:`Options` to open the additional query
   options.

#. Copy the following expression into the :guilabel:`Project`
   field:

   .. code-block:: javascript

      { item: 1, status: 1, "size.uom": 1 }

#. Click :guilabel:`Find`.

You can also specify embedded fields using the nested form. For example, 
``{ item: 1, status: 1, size: { uom: 1 } }``.

Suppress Specific Fields in Embedded Documents
----------------------------------------------

You can suppress specific fields in an embedded document. Use the
:ref:`dot notation <document-dot-notation>` to refer to the embedded
field in the projection document and set to ``0``.

The following example specifies a projection to exclude the ``uom``
field inside the ``size`` document. All other fields are returned in
the matching documents:

1. Copy the following expression into the :guilabel:`Filter`
   field:

   .. code-block:: javascript

      { status: "A" }

#. Click :guilabel:`Options` to open the additional query
   options.

#. Copy the following expression into the :guilabel:`Project`
   field:

   .. code-block:: javascript

      { "size.uom": 0 }

#. Click :guilabel:`Find`.

You can also specify embedded fields using the nested form. For example, 
``{ size: { uom: 0 } }``.

Projection on Embedded Documents in an Array
--------------------------------------------

Use :ref:`dot notation <document-dot-notation>` to project specific
fields inside documents embedded in an array.

The following example specifies a projection to return:

- The ``_id`` field (returned by default),
- The ``item`` field,
- The ``status`` field,
- The ``qty`` field in the documents embedded in the ``instock`` array.

1. Copy the following expression into the :guilabel:`Filter`
   field:

   .. code-block:: javascript

      { status: "A" }

#. Click :guilabel:`Options` to open the additional query
   options.

#. Copy the following expression into the :guilabel:`Project`
   field:

   .. code-block:: javascript

      { item: 1, status: 1, "instock.qty": 1 }

#. Click :guilabel:`Find`.

Project Specific Array Elements in the Returned Array
-----------------------------------------------------

.. include:: /includes/fact-projection-ops.rst

.. include:: /includes/fact-projection-slice-example.rst

1. Copy the following expression into the :guilabel:`Filter`
   field:

   .. code-block:: javascript

      { status: "A" }

#. Click :guilabel:`Options` to open the additional query
   options.

#. Copy the following expression into the :guilabel:`Project`
   field:

   .. code-block:: javascript

      { item: 1, status: 1, instock: { $slice: -1 } }

#. Click :guilabel:`Find`.

Project Fields with Aggregation Expressions
-------------------------------------------

You can specify :ref:`aggregation expressions <aggregation-expressions>`
in a query projection. Aggregation expressions let you project new
fields and modify the values of existing fields.

For example, the following operation uses aggregation expressions to
override the value of the ``status`` field, and project new fields
``area`` and ``reportNumber``.

.. note::

   The following example uses MongoDB Shell syntax. For driver examples
   of projection with aggregation, see your :driver:`driver
   documentation </>`.

.. io-code-block::
   :copyable: true

   .. input::
      :language: javascript
      
      db.inventory.find(
         { },
         {
            _id: 0,
            item: 1,
            status: {
               $switch: {
                  branches: [
                     {
                        case: { $eq: [ "$status", "A" ] },
                        then: "Available"
                     },
                     {
                        case: { $eq: [ "$status", "D" ] },
                        then: "Discontinued"
                     },
                  ],
                  default: "No status found"
               }
            },
            area: {
               $concat: [
                  { $toString: { $multiply: [ "$size.h", "$size.w" ] } },
                  " ",
                  "$size.uom"
               ]
            },
            reportNumber: { $literal: 1 }
         }
      )

   .. output::
      :language: javascript

      [
         {
            item: 'journal',
            status: 'Available',
            area: '294 cm',
            reportNumber: 1
         },
         {
            item: 'planner',
            status: 'Discontinued',
            area: '685.5 cm',
            reportNumber: 1
         },
         {
            item: 'notebook',
            status: 'Available',
            area: '93.5 in',
            reportNumber: 1
         },
         {
            item: 'paper',
            status: 'Discontinued',
            area: '93.5 in',
            reportNumber: 1
         },
         {
            item: 'postcard',
            status: 'Available',
            area: '152.5 cm',
            reportNumber: 1
         }
      ]