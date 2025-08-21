Starting in v6.0, the MongoDB :pipeline:`$lookup` aggregation stage 
supports :pipeline:`$search` inside the :pipeline:`$lookup` 
``pipeline`` option. Using :pipeline:`$lookup`, you can join 
multiple collections in the same database at query-time and run a 
:pipeline:`$search` query to further narrow down your search.

This tutorial demonstrates how to run a :pipeline:`$lookup` query 
with :pipeline:`$search` against the ``accounts`` and ``customers`` 
collections in the ``sample_analytics`` database.
It takes you through the following steps:

1. Create a default |fts| index on the ``accounts`` 
   collection in the ``sample_analytics`` database.
#. Run a :pipeline:`$lookup` query with :pipeline:`$search` to find 
   customers from the ``customers`` collection whose accounts have 
   purchased both ``CurrencyService`` and ``InvestmentStock`` products 
   in the ``accounts`` collection.

Considerations
~~~~~~~~~~~~~~

To run :pipeline:`$lookup` query with :pipeline:`$search`, your 
cluster must run MongoDB v6.0 or later. To upgrade your MongoDB version, 
see :ref:`upgrade-major-MongoDB-version`.

:pipeline:`$lookup` queries are less performant because |fts| 
does a full document lookup on the database for each document in the 
collection.

To learn how to improve the performance of ``$lookup`` queries, see
:ref:`embedded-documents-arrays-anti-pattern`.