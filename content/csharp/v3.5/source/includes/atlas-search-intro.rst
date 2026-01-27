The ``$search`` aggregation stage performs a full-text search on fields in a
collection. You must define a :ref:`{+search+} <csharp-atlas-search>` index
on the field before you can perform a ``$search`` operation on your data.

To create the {+search+} index that you need for the following example, run
the following code on the ``restaurants`` collection:

.. code-block:: csharp

   var index =  new CreateSearchIndexModel(
     "default", new BsonDocument
      {
        { "mappings", new BsonDocument
         {
           { "dynamic", true }
         }
      }
   });

   var result = collection.SearchIndexes.CreateOne(index);

To create a ``$search`` pipeline stage, use the ``Search()`` method. The
``Search()`` method accepts `SearchDefinition
<{+api-root+}/MongoDB.Driver/MongoDB.Driver.Search.SearchDefinition-1.html>`__
and `SearchOptions
<{+api-root+}/MongoDB.Driver/MongoDB.Driver.Search.SearchOptions-1.html>`__
objects as parameters. The ``SearchDefinition`` object contains the field to
search and the value to search for. You can use the ``SearchOptions`` object to
configure your search operation.

The following code shows how to use LINQ to create a  ``$search`` pipeline stage
that performs the following operations: 

- Searches for documents where the ``Name`` field contains ``"Deli"`` by using
  the ``default`` search index
- Returns the ``Name`` and ``Cuisine`` fields of the matching restaurant
  documents