This page uses :ref:`MongoDB Compass <compass-index>` to update documents.

|populate-inventory|

.. code-block:: javascript

   [
       { "item": "canvas", "qty": 100, "size": { "h": 28, "w": 35.5, "uom": "cm" }, "status": "A" },
       { "item": "journal", "qty": 25, "size": { "h": 14, "w": 21, "uom": "cm" }, "status": "A" },
       { "item": "mat", "qty": 85, "size": { "h": 27.9, "w": 35.5, "uom": "cm" }, "status": "A" },
       { "item": "mousepad", "qty": 25, "size": { "h": 19, "w": 22.85, "uom": "cm" }, "status": "P" },
       { "item": "notebook", "qty": 50, "size": { "h": 8.5, "w": 11, "uom": "in" }, "status": "P" },
       { "item": "paper", "qty": 100, "size": { "h": 8.5, "w": 11, "uom": "in" }, "status": "D" },
       { "item": "planner", "qty": 75, "size": { "h": 22.85, "w": 30, "uom": "cm" }, "status": "D" },
       { "item": "postcard", "qty": 45, "size": { "h": 10, "w": 15.25, "uom": "cm" }, "status": "A" },
       { "item": "sketchbook", "qty": 80, "size": { "h": 14, "w": 21, "uom": "cm" }, "status": "A" },
       { "item": "sketch pad", "qty": 95, "size": { "h": 22.85, "w": 30.5, "uom": "cm" }, "status": "A" }
   ]

For instructions on inserting documents using |compass|, see
:ref:`Insert Documents <write-op-insert>`.

Update Documents in a Collection
--------------------------------

To update a document in Compass, hover over the target
document and click the pencil icon:

.. figure:: /images/compass-update-doc-button.png
   :alt: Click edit document

After clicking the pencil icon, the document enters edit mode:

.. figure:: /images/compass-update-edit-mode.png
   :alt: Document edit mode

You can now change the this document by clicking the item you wish
to change and modifying the value.

For detailed instructions, see :ref:`Compass documentation <compass-modify-documents>`
or follow the :ref:`example <write-op-updateOne>` below.

Update a Single Document
~~~~~~~~~~~~~~~~~~~~~~~~

The following example demonstrates using |compass| to modify
a single document where ``item: paper`` in the ``inventory``
collection:

.. note::

   This example uses the Compass
   :ref:`Table View <compass-documents-table-view>` to modify the
   document. The editing process using the Compass
   :ref:`List View <compass-documents-list-view>` follows a similar 
   approach.

   For more information on the differences between Table View
   and List View in Compass, refer to the
   :ref:`Compass documentation <compass-view-documents>`.

Modify the target document as follows:

- Change the ``status`` field from ``D`` to ``P``.

- Change the ``size.uom`` field from ``in`` to ``cm``.

- Add a new field called ``lastModified`` whose value will
  be today's date.

1. Click the :guilabel:`Table` button in the top navigation
   to access the :ref:`Table View <compass-documents-table-view>`:

   .. figure:: /images/compass-table-btn-click.png
      :alt: Access Table View

#. Use the Compass :ref:`query bar <compass-query-bar-filter>` to
   locate the target document.

   Copy the following filter document into the query bar and click
   :guilabel:`Find`:

   .. code-block:: javascript

      { item: "paper" }

   .. figure:: /images/compass-update-paper-filter.png
      :alt: Find Paper document

#. Hover over the ``status`` field and click the pencil icon
   which appears on the right side of the document to enter
   edit mode:

   .. figure:: /images/compass-edit-paper-example.png
      :alt: Click edit button

#. Change the value of the field to ``"P"``.

#. Click the :guilabel:`Update` button below the field to
   save your changes.

#. Hover over the ``size`` field and click the
   outward-pointing arrows which appear on the right side of
   the field. This opens a new tab which displays the fields
   within the ``size`` object:

   .. figure:: /images/compass-edit-paper-expand.png
      :alt: Expand size object

#. Using the same process outlined in steps 3-5 for editing the
   ``status`` field, change the value of the ``size.uom`` field
   to ``"cm"``.

#. Click the left-most tab above the table labelled
   ``inventory`` to return to the original table view, which
   displays the top-level document:

   .. figure:: /images/compass-edit-inv-tab-click.png
      :alt: Click inventory tab

#. Hover over the ``status`` field and click the pencil icon
   which appears on the right side of the document to re-enter
   edit mode.

#. Click inside the ``status`` field and click the
   :guilabel:`plus button` icon which appears in the edit menu.

   Click the :guilabel:`Add Field After status` button which
   appears below the plus button:

   .. figure:: /images/compass-edit-paper-add-field-after.png
      :alt: Add field after status

#. Add a new field called ``lastModified`` with a value of
   today's date. Set the field type to ``Date``:

   .. figure:: /images/compass-edit-paper-add-last-modified.png
      :alt: Submit update

#. Click the :guilabel:`Update` button below the field to
   save your changes.

   .. note::

      Because |compass| does not support
      :update:`$currentDate` or any other
      :ref:`Field Update Operators <field-update-operators>`,
      you must manually enter the date value in Compass.

Update Multiple Documents
~~~~~~~~~~~~~~~~~~~~~~~~~

You can update only one document at a time in |compass|.

To update multiple documents, connect to your 
MongoDB deployment from :binary:`~bin.mongosh` or a MongoDB driver
and follow the examples in this section for your preferred method.

Replace a Document
~~~~~~~~~~~~~~~~~~

You can't replace a document in |compass|.

To replace a document, connect to your 
MongoDB deployment from :binary:`~bin.mongosh` or a MongoDB driver
and follow the examples in this section for your preferred method.

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

The upsert option is not available in |compass|.

Write Acknowledgement
~~~~~~~~~~~~~~~~~~~~~

Specify the level of acknowledgment requested from MongoDB for write operations
with :ref:`write concerns <write-concern>`.

.. seealso::

   - :compass:`Compass Documents </documents/>`
   - :ref:`Compass Query Bar <compass-query-bar>`
