The ``$vectorSearch`` aggregation stage performs an *approximate nearest neighbor* search
on a vector in the specified field. Your collection *must* have a
defined Atlas Vector Search index before you can perform a vector search on your data.

.. tip::

   To obtain the sample dataset used in the following example, see :ref:`csharp-quickstart`.
   To create the sample Atlas Vector Search index used in the following example, see
   :atlas:`Create an Atlas Vector Search Index </atlas-vector-search/create-index>` in the
   Atlas manual.

To create a ``$vectorSearch`` pipeline stage, call the ``VectorSearch()`` method on a
``PipelineStageDefinitionBuilder`` object. The ``VectorSearch()`` method accepts the
following parameters:

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - Parameter
     - Description

   * - ``field``
     - The field to perform the vector search on.

       **Data type**: ``Expression<Func<TInput, TField>>``

   * - ``queryVector``
     - The encoded vector that will be matched with values from the database.
       Although the data type of this parameter is ``QueryVector``, you can also pass an
       array of ``float`` values.
       
       **Data type**: `QueryVector <{+new-api-root+}/MongoDB.Driver/MongoDB.Driver.QueryVector.html>`__

   * - ``limit``
     - The maximum number of documents to return.
   
       **Data type**: {+int-data-type+}
   
   * - ``options``
     - Configuration options for the vector search operation.
    
       **Data type**: `VectorSearchOptions<TDocument> <{+new-api-root+}/MongoDB.Driver/MongoDB.Driver.VectorSearchOptions-1.html>`__

You can use the ``options`` parameter to configure your vector search operation. The
``VectorSearchOptions`` class contains the following properties:

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Property
     - Description

   * - ``Exact``
     - Whether the vector search uses the exact nearest neighbor (ENN) algorithm.
       If this property is set to ``false``, the vector search uses the approximate nearest
       neighbor (ANN) algorithm. If this property is set to ``true``, the
       ``NumberOfCandidates`` property must be ``null``.
   
       | **Data type**: {+bool-data-type+}
       | **Default**: ``false``

   * - ``Filter``
     - Additional search criteria that the found documents must match.
   
       | **Data Type:** `FilterDefinition<TDocument> <{+new-api-root+}/MongoDB.Driver/MongoDB.Driver.FilterDefinition-1.html>`__
       | **Default**: ``null``
   
   * - ``IndexName``
     - The index to perform the vector search on.
   
       | **Data type**: {+string-data-type+}
       | **Default**: ``null``

   * - ``NumberOfCandidates``
     - The number of neighbors to search in the index.
   
       | **Data type**: ``int?``
       | **Default**: ``null``

Consider the ``embedded_movies`` collection in the ``sample_mflix`` database.
The following ``EmbeddedMovie`` class represents a document in this database:

.. code-block:: csharp

   public class EmbeddedMovie
   {
       [BsonElement("title")]
       public string Title { get; set; }

       [BsonElement("plot_embedding")]
       public double[] Embedding { get; set; }

       [BsonElement("score")]
       public double Score { get; set; }
   }

You can use a ``$vectorSearch`` stage to perform a semantic search on the ``plot_embedding``
field of the documents in the collection.
The following example shows how to use |mechanism| to generate an aggregation pipeline to
perform the following operations:

- Perform a vector search on the Atlas Vector Search index of the ``plot_embedding``
  field by using vector embeddings for the string ``"time travel"``
- Fetch the ``Title`` and ``Plot`` fields from documents found in the vector search