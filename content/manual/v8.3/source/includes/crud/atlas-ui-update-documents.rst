.. _update-documents-atlas-ui:

Update a Document with {+atlas+}
------------------------------------

.. note::

   The {+atlas+} UI updates one document at a time. To update multiple 
   documents or replace an entire document, connect to your Atlas deployment
   from :binary:`~bin.mongosh` or a MongoDB driver and follow the example for
   your preferred method.

This example uses the :atlas:`sample supplies dataset 
</sample-data/sample-supplies/>`. To load the sample dataset, see 
:atlas:`Load Sample Data </sample-data/#std-label-load-sample-data>`.

To update a document in {+atlas+}, follow these steps:

.. procedure:: 
   :style: normal

   .. include:: /includes/atlas-nav/steps-db-deployments-page.rst

   .. step:: Navigate to the collection.

      a. For the cluster that contains the sample data, click :guilabel:`Browse Collections`.
      #. In the left navigation pane, select the ``sample_supplies`` database.
      #. Select the ``sales`` collection.

   .. step:: Specify a query filter.

      You can specify a :ref:`query filter document <document-query-filter>`
      in the :guilabel:`Filter` field. A query filter document uses 
      :ref:`query operators <csfle-supported-query-operators>` to specify search conditions.

      Copy the following query filter document into the 
      :guilabel:`Filter` search bar and click :guilabel:`Apply`:

      .. code-block:: javascript

         { saleDate: { $gte: { $date: "2016-01-01T00:00-00:00" }, $lte: { $date: "2016-01-02T00:00-00:00" } } }

      This query filter returns all documents in the ``sample_supplies.sales`` 
      collection where ``saleDate`` is on or between January 1 and 2, 2016 
      UTC time.

   .. step:: Edit a document.

      To edit a document displayed in the query results, hover over the
      document and click on the pencil icon. In the document editor, you can:

      - Add a new field. 
      - Delete an existing field.
      - Edit a field's name, value, or type.
      - Revert a specific change.

      For detailed instructions, see :atlas:`Create, View, Update, and Delete Documents 
      </atlas-ui/documents/#edit-one-document>`.

   .. step:: Save your changes.

      To confirm and save your changes, click the :guilabel:`Update` button.

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

Write Acknowledgement
~~~~~~~~~~~~~~~~~~~~~

Specify the level of acknowledgment requested from MongoDB for write operations
with :ref:`write concerns <write-concern>`.
