This tutorial demonstrates how to combine the semantic search results
from a :pipeline:`$vectorSearch` query with full-text search results
from a :pipeline:`$search` query by using reciprocal rank fusion.
Reciprocal rank fusion is a way to combine results from different types
of searches into a single result. This tutorial takes you through the
following steps: 

1. Create an {+avs+} index on the ``plot_embeddings`` field in the
   ``sample_mflix.embedded_movies`` collection. 
#. Create an |fts| index on the ``title`` field in the
   ``sample_mflix.embedded_movies`` collection.
#. Combine and run a :pipeline:`$vectorSearch` query against the
   ``plot_embeddings`` field in the ``sample_mflix.embedded_movies``
   collection with a :pipeline:`$search` query against the ``title``
   field by using reciprocal rank fusion.

Prerequisites 
-------------

Before you begin, ensure that your |service| {+cluster+} meets the
requirements described in the :ref:`avs-tutorials-prereqs`.

.. note:: 

   Ensure that your |service| {+cluster+} has enough memory to store
   both |fts| and {+avs+} indexes and run performant queries.

Create the {+avs+} and |fts| Indexes 
-------------------------------------------------

This section demonstrates how to create the following indexes on the
fields in the ``sample_mflix.embedded_movies`` collection: 

- An {+avs+} index on the ``plot_embeddings`` field for running vector
  queries against that field. 
- An |fts| index on the ``title`` field for running full-text search
  against that field.  

Required Access
~~~~~~~~~~~~~~~

To create {+avs+} and |fts| indexes, you must have at least
:authrole:`Project Data Access Admin` access to the project.

Procedure 
~~~~~~~~~

.. include:: /includes/steps-avs-rrf-tutorial-create-index.txt 

Run a Combined Semantic Search and Full-Text Search Query 
---------------------------------------------------------

This section demonstrates how to query the data in the
``sample_mflix.embedded_movies`` collection by using the
:pipeline:`$vectorSearch` and :pipeline:`$search` pipeline stages and
combine each document's scores from both stages to re-sort 
the documents in the results. This ensures that
documents appearing in both searches appear at the top of the
combined results.  

About the Query 
~~~~~~~~~~~~~~~

The following query retrieves the sorted search results from the
semantic search and the full-text search, and assigns a reciprocal rank
score to the documents in the results based on their position in the
results array. The reciprocal rank score is calculated by using the
following formula:  

.. code-block:: 
   :copyable: false 

   1.0/{document position in the results + vector or full-text penalty + constant value}

The query then adds the scores from both the searches for each document,
ranks the documents based on the combined score, and sorts the documents
to return a single result. 

Query Variables 
```````````````

The sample query defines the following variables to add weight to the
score, with a lower number providing higher weight:

- ``vector_penalty`` 
- ``full_text_penalty``

Query Stages 
````````````

The sample query uses the following pipeline stages:

- :pipeline:`$vectorSearch` stage to search the ``plot_embeddings``
  field for the string *new york* specified as vector embeddings in 
  the ``queryVector`` field of the query. The query uses ``ada-002-text``
  embedding, which is the same as the vector embedding in the
  ``plot_embedding`` field. The query also specifies a search for up to
  ``100`` nearest neighbors and limit the results to ``20`` documents
  only. This stage returns the sorted documents from the semantic search
  in the results.
- :pipeline:`$group` stage to group all the documents in the results
  from the semantic search in a field named ``docs``.
- :pipeline:`$unwind` stage to unwind the array of documents in the
  ``docs`` field and store the position of the document in the results
  array in a field named ``rank``. 
- :pipeline:`$addFields` stage to add a new field named ``vs_score``
  that contains the reciprocal rank score for each document in the
  results. Here, reciprocal rank score is calculated by dividing ``1.0``
  by the sum of ``rank``, the ``vector_penalty`` weight, and a constant
  value of ``1``.   
- :pipeline:`$project` stage to include only the following fields in 
  the results:  

  - ``vs_score``
  - ``_id`` 
  - ``title`` 

- :pipeline:`$unionWith` stage to combine the results from the preceding
  stages with the results of the following stages in the sub-pipeline: 

  - :pipeline:`$search` stage to search for movies that contain the term
    ``new york`` in the ``title`` field. This stage returns the sorted
    documents from the full-text search in the results.
  - :pipeline:`$limit` stage to limit the output to ``20`` results only.
  - :pipeline:`$group` stage to group all the documents from the
    full-text search in a field named ``docs``.
  - :pipeline:`$unwind` stage to unwind the array of documents in the
    ``docs`` field and store the position of the document in the results
    array in a field named ``rank``. 
  - :pipeline:`$addFields` stage to add a new field named ``fts_score``
    that contains the reciprocal rank score for each document in the
    results. Here, reciprocal rank score is calculated by dividing
    ``1.0`` by the sum of the value of ``rank``, the ``full_text
    penalty`` weight, and a constant value of ``1``. 
  - :pipeline:`$project` stage to include only the following fields in 
    the results:  

    - ``fts_score``
    - ``_id`` 
    - ``title``

- :pipeline:`$group` stage to group the documents in the results from
  the preceding stages by ``title``, ``vs_score``, and ``fts_score``.

- :pipeline:`$project` stage to include only the following fields in 
  the results:  

  - ``vs_score``
  - ``fts_score``
  - ``_id`` 
  - ``title`` 

- :pipeline:`$project` stage to add a field named ``score`` that
  contains the sum of ``vs_score`` and ``fts_score`` to the results.  

- :pipeline:`$sort` stage to sort the results by ``score`` in descending 
  order. 
- :pipeline:`$limit` stage to limit the output to ``10`` results only.


Procedure 
~~~~~~~~~

.. include:: /includes/steps-avs-rrf-shell-query.txt

Learn by Watching
~~~~~~~~~~~~~~~~~

Watch a demonstration of an application that showcases hybrid search
queries combining |fts| full-text and vector search to return a single
merged result set. The application implements Relative Score Fusion
(RSF) and Reciprocal Rank Fusion (RRF) to return a merged set created by
using a rank fusion algorithm.

*Duration: 2.43 Minutes*

.. video:: https://youtu.be/ipbLlUh8gwc
