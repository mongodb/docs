Overview
--------

In this guide, you can learn how to use the {+driver-long+} to update
values in |single-or-multiple|.

The {+driver-short+} provides the following methods to update values:

- |sync-method|: Updates one or more fields in |single-or-multiple|.
- |async-method|: The asynchronous version of |sync-method|.

The following sections describe these methods in more detail.

.. include:: /includes/method-overloads.rst

.. include:: /includes/atlas-sample-data.rst

Methods and Parameters
----------------------

The |sync-method| and |async-method| methods accept the following parameters:

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Parameter
     - Description

   * - ``filter``
     - An instance of the ``FilterDefinition`` class that specifies the |document-or-documents|
       to update.
       To learn how to create a query filter, see :ref:`csharp-specify-query`.

       **Data Type:** `FilterDefinition <{+new-api-root+}/MongoDB.Driver/MongoDB.Driver.FilterDefinition-1.html>`__

   * - ``update``
     - An instance of the ``UpdateDefinition`` class. This object specifies the kind of update
       operation, the fields to update, and the new value for each field. To learn how to
       create an ``UpdateDefinition`` object, see |fields-link| and |arrays-link|.

       **Data Type:** `UpdateDefinition<TDocument> <{+new-api-root+}/MongoDB.Driver/MongoDB.Driver.UpdateDefinition-1.html>`__

   * - ``options``
     - *Optional.* An instance of the ``UpdateOptions`` class that specifies the
       configuration for the update operation. The default value is ``null``. For a list
       of available options, see :ref:`csharp-update-options`.

       **Data Type:** `UpdateOptions <{+new-api-root+}/MongoDB.Driver/MongoDB.Driver.UpdateOptions.html>`__

   * - ``cancellationToken``
     - *Optional.* A token that you can use to cancel the operation.

       **Data type**: ``CancellationToken``

Update Multiple Values
----------------------

The |sync-method| and |async-method| methods each accept only one
``UpdateDefinition`` object. The following sections describe how
to update multiple values in a single method call.

Combined Update Definitions
~~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``Builders.Update.Combine()`` method lets you combine multiple ``UpdateDefinition``
objects. This method accepts the following parameter:

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Parameter
     - Description

   * - ``updates``
     - An array of update definitions to combine.

       **Data Type:** ``UpdateDefinition<TDocument>[]``

The ``Combine()`` method returns a single ``UpdateDefinition`` object that defines
multiple update operations.

The following code example uses the ``Combine()`` method to combine a
:manual:`$set </reference/operator/update/set/#mongodb-update-up.-set>` operation and an
:manual:`$unset </reference/operator/update/unset/#mongodb-update-up.-unset>`
operation:

|combine-code-example-tabs|

Update Pipelines
~~~~~~~~~~~~~~~~

If your application connects to {+mdb-server+} 4.2 or later, you can join
a sequence of update operations into a single
:manual:`aggregation pipeline. </core/aggregation-pipeline/>`

To create an update pipeline, call the ``Builders.Update.Pipeline()`` method. This method
accepts the following parameter:

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Parameter
     - Description

   * - ``pipeline``
     - A ``PipelineDefinition`` instance that represents the update pipeline. To create
       a ``PipelineDefinition`` object, create a BSON document for each update operation you
       want to perform, then pass these documents to the ``PipelineDefinition.Create()`` method.

       **Data Type:** ``PipelineDefinition<TDocument, TDocument>``

The ``Pipeline()`` method returns a single ``UpdateDefinition`` object that defines
multiple aggregation stages.

The following code example uses the ``Pipeline()`` method to combine a
:manual:`$set </reference/operator/update/set/#mongodb-update-up.-set>` operation and an
:manual:`$unset </reference/operator/update/unset/#mongodb-update-up.-unset>`
operation:

|pipeline-code-example-tabs|

.. note:: Unsupported Operations

   Update pipelines don't support all update operations, but they do support certain
   aggregation stages not found in other update definitions. For a list of
   update operations supported by pipelines, see
   :manual:`Updates with Aggregation Pipeline </tutorial/update-documents-with-aggregation-pipeline/>`
   in the {+mdb-server+} manual.

.. _csharp-update-options:

Configuration Options
---------------------

The |sync-method| and |async-method| methods optionally accept an
``UpdateOptions`` object as a parameter. You can use this argument to configure the
update operation.

The ``UpdateOptions`` class contains the following properties:

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Property
     - Description

   * - ``ArrayFilters``
     - Specifies which array elements to modify for an update operation on an array field.
       See :manual:`the {+mdb-server+} manual</reference/command/update/#update-elements-match-arrayfilters-criteria>`
       for more information.

       **Data Type:** IEnumerable<`ArrayFilterDefinition <{+new-api-root+}/MongoDB.Driver/MongoDB.Driver.ArrayFilterDefinition.html>`__>

   * - ``BypassDocumentValidation``
     - Specifies whether the update operation bypasses document validation. This lets you 
       update documents that don't meet the schema validation requirements, if any 
       exist. See :manual:`the {+mdb-server+} manual</core/schema-validation/#schema-validation>`
       for more information on schema validation.

       **Data Type:** ``bool?``

   * - ``Collation``
     - Specifies the kind of language collation to use when sorting
       results. See :manual:`the {+mdb-server+} manual</reference/collation/#std-label-collation>`
       for more information on collation.

       **Data Type:** `Collation <{+new-api-root+}/MongoDB.Driver/MongoDB.Driver.Collation.html>`__

   * - ``Comment``
     - Gets or sets the user-provided comment for the operation. 
       See :manual:`the {+mdb-server+} manual</reference/command/update/#command-fields>`
       for more information.

       **Data Type:** `BsonValue <{+new-api-root+}/MongoDB.Bson/MongoDB.Bson.BsonValue.html>`__

   * - ``Hint``
     - Gets or sets the index to use to scan for documents. 
       See :manual:`the {+mdb-server+} manual</reference/command/update/#std-label-update-command-hint>`
       for more information.

       **Data Type:** `BsonValue <{+new-api-root+}/MongoDB.Bson/MongoDB.Bson.BsonValue.html>`__

   * - ``IsUpsert``
     - Specifies whether the update operation performs an upsert operation if no 
       documents match the query filter. 
       See :manual:`the {+mdb-server+} manual </reference/command/update/#std-label-update-command-upsert>`
       for more information.

       **Data Type:** ``bool``

   * - ``Let``
     - Gets or sets the let document. 
       See :manual:`the {+mdb-server+} manual </reference/command/update/#std-label-update-let-syntax>`
       for more information.

       **Data Type:** `BsonDocument <{+new-api-root+}/MongoDB.Bson/MongoDB.Bson.BsonDocument.html>`__

Return Value
------------

The |sync-method| method returns an ``UpdateResult``, and the |async-method|
method returns a ``Task<UpdateResult>`` object.
The ``UpdateResult`` class contains the following properties:

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Property
     - Description

   * - ``IsAcknowledged``
     - Indicates whether the update operation was acknowledged by MongoDB.

       **Data Type:** ``bool``
   
   * - ``IsModifiedCountAvailable``
     - Indicates whether you can read the count of update records on the
       ``UpdateResult``.

       **Data Type:** ``bool``

   * - ``MatchedCount``
     - The number of documents that matched the query filter, regardless of
       whether one was updated. 

       **Data Type:** ``long``

   * - ``ModifiedCount``
     - The number of documents updated by the update operation. 

       **Data Type:** ``long``

   * - ``UpsertedId``
     - The ID of the document that was upserted in the database, if the driver
       performed an upsert.

       **Data Type:** `BsonValue <{+new-api-root+}/MongoDB.Bson/MongoDB.Bson.BsonValue.html>`__

Additional Information
----------------------

|instruqt-lab-instructions|

For runnable examples of the update operations, see the |usage-examples-link| page.

To learn more about creating query filters, see the :ref:`csharp-specify-query` guide.

API Documentation
~~~~~~~~~~~~~~~~~

For more information about any of the methods or types discussed in this
guide, see the following API documentation:

- |sync-api-link|
- |async-api-link|
- `UpdateOptions <{+new-api-root+}/MongoDB.Driver/MongoDB.Driver.UpdateOptions.html>`__
- `UpdateResult <{+new-api-root+}/MongoDB.Driver/MongoDB.Driver.UpdateResult.html>`__

|instruqt-lab-component|