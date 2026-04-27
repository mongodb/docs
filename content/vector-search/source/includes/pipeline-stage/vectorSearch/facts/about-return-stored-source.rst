.. _avs-return-stored-source:
.. _mdb-vs-return-stored-source:

Return Stored Source Fields 
~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you configured the :ref:`storedSource <avs-stored-source-definition>`
option in the :ref:`index <avs-types-vector-search>` for a collection,
{+avs+} stores the specified fields on ``mongot``. You can use the
``returnStoredSource`` boolean option in your {+avs+} queries to
retrieve only those fields, rather than fetching full documents from the
collection.

By default, {+avs+} performs full document lookup implicitly on the 
backend database after {+avs+} matches documents for the query. This 
lookup could significantly degrade performance for subsequent 
aggregation pipeline stages that fetch all matched dataset from 
:pipeline:`$vectorSearch` stage. 

If you configured the ``storedSource`` option, you can use the
``returnStoredSource`` option to retrieve only parts of the documents
directly stored on {+avs+} and avoid full document lookup on the
database. This allows you to perform most database-side filtering
operations on documents with a minimum number of fields. You can then
retrieve all the fields from the documents at a later stage in the
pipeline using :pipeline:`$lookup`.

.. _avs-return-stored-source-behavior:
.. _mdb-vs-return-stored-source-behavior: 

Behavior
````````

You can set one of the following values for the  ``returnStoredSource`` 
option: 

- ``true`` - to return only stored source fields directly from {+avs+}
- ``false`` - to do an implicit full document lookup on the backend 
  database (default)

If you run {+avs+} queries with the ``returnStoredSource`` boolean option 
set to ``true``:

- {+avs+} returns an empty document if the document doesn't include the 
  fields configured for storing.
- {+avs+} returns errors if the index definition doesn't include the 
  Stored Source configuration.
- {+avs+} might return stale data due to a replication lag.
- {+avs+} might return duplicate data on sharded clusters.

If you perform a high volume and rate of data insert and update 
operations for your collection on the backend database, {+avs+} might 
return stale data because the data stored on ``mongot`` might not be 
current due to a replication lag. You can view the approximate number 
of milliseconds that {+avs+} is behind in replicating changes from the 
:term:`oplog` of |mongod| in the |service| UI. To learn more, see 
:ref:`review-atlas-search-metrics`.

If there are :manual:`orphaned documents 
</reference/glossary/#term-orphaned-document>` during chunk migration, 
{+avs+} might return duplicate documents for queries against sharded 
cluster. 

.. _avs-return-stored-source-use-case:
.. _mdb-vs-return-stored-source-use-case: 

Sample Use  
``````````

If many of the results of the ``$vectorSearch`` stage are discarded
afterward and you need to perform implicit document lookup on your
database, we recommend using the ``returnStoredSource`` option. You
can store fields required for sorting or filtering and use
``returnStoredSource`` option at query time to perform the following
actions:

1. Intermediate operations on partial documents returned by {+avs+}.
2. :pipeline:`$lookup` at the end of the pipeline if full documents are 
   needed. 

.. important:: 

   For efficiency, configure only a minimum number of fields for 
   storage on {+avs+}. Use this option if your documents are large enough 
   to cause issues during lookup.
