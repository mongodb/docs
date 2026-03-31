This page uses :ref:`MongoDB Compass <compass-index>` to delete
the documents.

Populate the ``inventory`` collection with the following documents:

.. code-block:: javascript

   [
       { "item": "journal", "qty": 25, "size": { "h": 14, "w": 21, "uom": "cm" }, "status": "A" },
       { "item": "notebook", "qty": 50, "size": { "h": 8.5, "w": 11, "uom": "in" }, "status": "P" },
       { "item": "paper", "qty": 100, "size": { "h": 8.5, "w": 11, "uom": "in" }, "status": "D" },
       { "item": "planner", "qty": 75, "size": { "h": 22.85, "w": 30, "uom": "cm" }, "status": "D" },
       { "item": "postcard", "qty": 45, "size": { "h": 10, "w": 15.25, "uom": "cm" }, "status": "A" }
   ]

For instructions on inserting documents in MongoDB Compass, see
:ref:`Insert Documents <write-op-insert>`.

.. note::

   For complete reference on inserting documents in MongoDB Compass,
   see the :ref:`Compass documentation <compass-insert-documents>`.

Delete All Documents
--------------------

To delete all documents from a collection, click the
:guilabel:`DELETE` button under the :guilabel:`Documents` tab.

.. include:: /includes/fact-delete-all-inventory.rst

.. figure:: /images/compass-delete-all.png
   :alt: MongoDB Compass showing the Documents tab with the DELETE
         button highlighted.

When you confirm the deletion in the pop-up window that appears after
you click :guilabel:`DELETE`, MongoDB Compass deletes all documents
and displays a message indicating how many documents were deleted.

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

To delete all documents that match a deletion criteria, write your
query filter in the Compass query bar, then click the
:guilabel:`DELETE` button under the :guilabel:`Documents` tab. The
following example deletes all documents where ``{ status: "A" }``:

.. figure:: /images/compass-delete-filter.png
   :alt: MongoDB Compass showing the Documents tab with the DELETE
         button highlighted with a filter of { status: "A" }.

When you confirm the deletion in the pop-up window that appears after
you click :guilabel:`DELETE`, MongoDB Compass deletes all documents
and displays a message indicating how many documents were deleted.

Delete Only One Document that Matches a Condition
-------------------------------------------------

To delete a single document that matches a specified filter:

1. Write your query filter in the Compass query bar and click
   :guilabel:`Find`.
#. Hover your mouse over the document you want to delete.
#. Click the :icon-lg:`Trash` button on the right side of your
   document.

The following example deletes a document with ``{ status: "A" }``
from the ``inventory`` collection:

.. figure:: /images/compass-delete-one.png
   :alt: MongoDB Compass Delete One Document that matches a filter

.. seealso::

   - :compass:`Compass Documents </documents/>`
   - :ref:`Compass Query Bar <compass-query-bar>`
