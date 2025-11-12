You query a time series collection the same way you query a standard MongoDB collection.

To return one document from a time series collection, you use a 
`FilterDefinitionBuilder<TDocument> <|api-root|/MongoDB.Driver/MongoDB.Driver.FilterDefinitionBuilder-1.html>`__ 
to create a filter to match a document. You pass the filter to the 
``Find()`` method of the ``IMongoCollection<TDocument>`` class.  The following 
example creates a FilterDefinition and also uses a ProjectionDefinition to omit 
the ``_id`` field from the results. It returns a ``List<BsonDocument>``.

.. io-code-block::

   .. input:: /code-examples/tested/csharp/driver/TimeSeries/CreateQuery/QueryTimeSeriesCollection.snippet.timeseries-find-one.cs
      :language: csharp
      :category: syntax example

   .. output:: /code-examples/tested/csharp/driver/TimeSeries/CreateQuery/FindOneOutput.txt
      :language: text

For more information on querying your collection, see
:driver:`MongoDB C# Driver documentation </csharp/sync/current/crud/query-documents/find/>`.

.. tip:: Optimize Query Performance

   To learn how to optimize queries on your time series collection, see
   :ref:`tsc-best-practice-optimize-query-performance`.