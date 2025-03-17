You can combine {+avs+} and |fts| queries into a hybrid search for
unified results. 

This tutorial demonstrates how to run a hybrid search on the
``sample_mflix.embedded_movies`` collection, which contains details 
about movies. Specifically, this tutorial takes you through the
following steps: 

1. Create an {+avs+} index on the ``plot_embedding`` field. This field
   contains vector embeddings that represent the summary of a movie's
   plot. 
#. Create an |fts| index on the ``title`` field in the
   ``sample_mflix.embedded_movies`` collection. This field contains the
   movie's name as a text string. 
#. Run a query that uses reciprocal rank fusion to combine the results
   from a :pipeline:`$vectorSearch` query against the
   ``plot_embedding`` field and a :pipeline:`$search` query against the
   ``title`` field.

Why Hybrid Search?
------------------

A hybrid search is an aggregation of different search methods, such
as a full-text and semantic search, for the same query criteria. While
full-text is effective in finding exact matches for query terms,
semantic search provides the added benefit of identifying semantically
similar documents even if the documents don't contain the exact query
term. This ensures that synonymous and contextually similar matches are
also included in the combined results of both methods of search.

Conversely, if you have tokens for proper nouns or specific keywords in
your dataset that you don't expect to be considered in the training of
an embedding model in the same context that they are used in your
dataset, your vector search might benefit from being combined with a
full-text search.   

You can also set weights for each method of search per query. Based on
whether full-text or semantic search results are most relevant and
appropriate for a query, you can increase the weight for that search
method per query.  

What is Reciprocal Rank Fusion?
-------------------------------

Reciprocal rank fusion is a technique to combine results from different
search methods, such as a semantic and a full-text search, into a
single result set by performing the following actions:

1. Calculate the reciprocal rank of the documents in the results.

   .. _calculate-reciprocal-rank: 

   For each ranked document in each search result, first add the rank
   (``r``) of the document with a constant number, ``60``, to smooth
   the score (``rank_constant``), and then divide ``1`` by the sum of
   ``r`` and ``rank_constant`` for the reciprocal rank of the document 
   in the results. 

   .. code-block:: shell 
      :copyable: false 

      reciprocal_rank = 1 / ( r + rank_constant )

   For each method of search, apply different weights (``w``) to give more
   importance to that method of search. For each document, the weighted
   reciprocal rank is calculated by multiplying the weight by the
   reciprocal rank of the document. 

   .. code-block:: shell 
      :copyable: false 

      weighted_reciprocal_rank = w x reciprocal_rank   
  
#. Combine the rank-derived and weighted scores of the documents in the
   results. 
  
   .. _combine-reciprocal-ranks:
     
   For each document across all search results, add the calculated
   reciprocal ranks for a single score for the document. 

#. Sort the results by the combined score of the documents in the
   results. 

   Sort the documents in the results based on the combined score across
   the results for a single, combined ranked list of documents in the
   results. 

Prerequisites 
-------------

Before you begin, complete the |prereq-link|. For this tutorial,
you must have an |service| cluster with MongoDB version v6.0.11, 
or v7.0.2 or later. 

This tutorial includes examples for the following clients:

- {+mongosh+}
- :driver:`MongoDB Node Driver </node/current/>`

.. note::

   Ensure that your |service| {+cluster+} has enough memory to store
   both |fts| and {+avs+} indexes and run performant queries.

Create the {+avs+} and |fts| Indexes 
-------------------------------------------------

This section demonstrates how to create the following indexes on the
fields in the ``sample_mflix.embedded_movies`` collection: 

- An {+avs+} index on the ``plot_embedding`` field for running vector
  queries against that field. 
- An |fts| index on the ``title`` field for running full-text search
  against that field.

Procedure 
~~~~~~~~~

.. tabs-drivers::

   .. tab::
      :tabid: nodejs

      .. include:: /includes/steps-avs-rrf-tutorial-create-index-javascript.rst

   .. tab::
      :tabid: shell

      .. include:: /includes/steps-avs-rrf-tutorial-create-index-mongosh.rst

Run a Combined Semantic Search and Full-Text Search Query 
---------------------------------------------------------

This section demonstrates how to query the data in the
``sample_mflix.embedded_movies`` collection for *star wars* in the
``plot_embedding`` and ``title`` fields by using the
:pipeline:`$vectorSearch` and :pipeline:`$search` pipeline stages and 
combine each document's scores from both stages to re-sort the documents
in the results. This ensures that documents appearing in both searches
appear at the top of the combined results.  

Procedure 
~~~~~~~~~

.. tabs-drivers::

   .. tab::
      :tabid: nodejs

      .. include:: /includes/steps-avs-rrf-javascript-query.rst

   .. tab::
      :tabid: shell

      .. include:: /includes/steps-avs-rrf-shell-query.rst

About the Query 
~~~~~~~~~~~~~~~

The sample query retrieves the sorted search results from the
semantic search and the full-text search, and assigns a reciprocal rank
score to the documents in the results based on their position in the
results array. The reciprocal rank score is calculated by using the
following formula:  

.. code-block:: 
   :copyable: false 

   1.0/{document position in the results + constant value} 

The query then adds the scores from both the searches for each document,
ranks the documents based on the combined score, and sorts the documents
to return a single result. 

Query Variables 
```````````````

The sample query defines the following variables to add weight to the
score, with a lower number providing higher weight:

- ``vector_weight`` 
- ``full_text_weight``

The weighted reciprocal rank score is calculated by using the
following formula:

.. code-block:: 
   :copyable: false 

   weight x reciprocal rank 

Query Stages 
````````````

The sample query uses the following pipeline stages to perform a
semantic search on the collection and retrieve the reciprocal rank of
the documents in the results: 

.. list-table:: 
    :widths: 30 70 

    * - :pipeline:`$vectorSearch` 
      - Searches the ``plot_embedding`` field for the string *star
        wars* specified as vector embeddings in the ``queryVector``
        field of the query. The query uses ``ada-002-text`` embedding,
        which is the same as the vector embedding in the ``plot_embedding``
        field. The query also specifies a search for up to ``100``
        nearest neighbors and limit the results to ``20`` documents
        only. This stage returns the sorted documents from the semantic
        search in the results.
    * - :pipeline:`$group`  
      - Groups all the documents in the results from the semantic search
        in a field named ``docs``. 
    * - :pipeline:`$unwind` 
      - Unwinds the array of documents in the ``docs`` field and store
        the position of the document in the results array in a field
        named ``rank``.  
    * - :pipeline:`$addFields` 
      - Adds a new field named ``vs_score`` that contains the reciprocal
        rank score for each document in the results. Here, reciprocal
        rank score is calculated by dividing ``1.0`` by the sum of
        ``rank`` and a rank constant value of ``60``. Then, the weighted
        reciprocal rank is calculated by multiplying ``vector_weight``
        weight by the reciprocal rank score.
    * - :pipeline:`$project`  
      - Includes only the following fields in the results:  

        - ``vs_score``
        - ``_id`` 
        - ``title`` 

The sample query uses the :pipeline:`$unionWith` stage to perform a text
search on the collection and retrieve the reciprocal rank of the
documents in the results:   

.. list-table:: 
    :widths: 30 70 

    * - :pipeline:`$search` 
      - Searches for movies that contain the term ``star wars`` in the
        ``title`` field. This stage returns the sorted documents from
        the full-text search in the results. 
    * - :pipeline:`$limit` 
      - Limits the output to ``20`` results only.
    * - :pipeline:`$group`  
      - Groups all the documents from the full-text search in a field
        named ``docs``. 
    * - :pipeline:`$unwind` 
      - Unwinds the array of documents in the ``docs`` field and store
        the position of the document in the results array in a field
        named ``rank``.  
    * - :pipeline:`$addFields`  
      - Adds a new field named ``fts_score`` that contains the reciprocal
        rank score for each document in the results. Here, reciprocal
        rank score is calculated by dividing ``1.0`` by the sum of
        ``rank`` and a rank constant value of ``60``. Then, the weighted
        reciprocal rank is calculated by multiplying ``full_text_weight``
        weight by the reciprocal rank score.  
    * - :pipeline:`$project` 
      - Includes only the following fields in the results:  

        - ``fts_score``
        - ``_id`` 
        - ``title``

The sample query uses the following stages to combine the results of the
semantic and text search and return a single ranked list of documents in
the results:

.. list-table:: 
    :widths: 30 70 

    * - :pipeline:`$group` 
      - Groups the documents in the results from the preceding stages by
        ``title``, ``vs_score``, and ``fts_score``. 

    * - :pipeline:`$project` 
      - Includes only the following fields in the results:  

        - ``vs_score``
        - ``fts_score``
        - ``_id`` 
        - ``title`` 

    * - :pipeline:`$project` 
      - Adds a field named ``score`` that contains the sum of
        ``vs_score`` and ``fts_score`` to the results.   

    * - :pipeline:`$sort` 
      - Sorts the results by ``score`` in descending order. 
    
    * - :pipeline:`$limit` 
      - Limits the output to ``10`` results only.

Learn by Watching
~~~~~~~~~~~~~~~~~

Watch a demonstration of an application that showcases hybrid search
queries combining |fts| full-text and vector search to return a single
merged result set. The application implements Relative Score Fusion
(RSF) and Reciprocal Rank Fusion (RRF) to return a merged set created by
using a rank fusion algorithm.

*Duration: 2.43 Minutes*

.. video:: https://youtu.be/ipbLlUh8gwc
