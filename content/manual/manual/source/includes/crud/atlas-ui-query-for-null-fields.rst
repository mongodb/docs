.. _query-null-documents-atlas-ui:

Query for Null or Missing Fields with {+atlas+}
----------------------------------------------------

The example in this section uses the :atlas:`sample training dataset 
</sample-data/sample-training/>`. To learn how to load the sample dataset 
into your {+atlas+} deployment, see :atlas:`Load Sample Data 
</sample-data/#std-label-load-sample-data>`.

To query for a ``null`` or missing field in {+atlas+}, follow these steps:

.. procedure:: 
   :style: normal

   .. include:: /includes/atlas-nav/steps-db-deployments-page.rst

   .. step:: Navigate to the collection.

      a. For the cluster that contains the sample data, click :guilabel:`Browse Collections`.
      #. In the left navigation pane, select the ``sample_training`` database.
      #. Select the ``companies`` collection.

   .. step:: Insert a blank document.

      Click the :guilabel:`Insert Document` button to display the 
      dialog box, and then click :guilabel:`Insert`
      to insert a document with only the ``_id`` field.

   .. step:: Specify a query filter document.

      To find a document that contains a ``null`` or missing value,
      specify a :ref:`query filter document <document-query-filter>`
      in the :guilabel:`Filter` field. A query filter document uses
      :ref:`query operators <csfle-supported-query-operators>`
      to specify search conditions.

      Query operators in MongoDB treat ``null`` values differently. To apply a
      query filter, copy each of the following documents into the
      :guilabel:`Filter` search bar and click :guilabel:`Apply`.

      Use the following query filter to match documents that contain a
      ``description`` field with a ``null`` value or do not contain
      the ``description`` field:

      .. code-block:: javascript

         { description : null }

      Use the following query filter to match only documents that contain 
      a ``description`` field with a ``null`` value. This filter specifies
      that the value of the field must be :ref:`BSON Type <bson-types>` ``Null`` 
      (BSON Type 10):

      .. code-block:: javascript

         { description : { $type: 10 } }

      Use the following query filter to match only documents that
      do not contain the ``description`` field. Only the document
      that you inserted earlier should appear:

      .. code-block:: javascript

         { description : { $exists: false } }
