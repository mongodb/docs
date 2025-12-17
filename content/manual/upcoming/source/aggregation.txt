.. _aggregation:

======================
Aggregation Operations
======================

.. default-domain:: mongodb

.. facet::
   :name: genre
   :values: reference

.. meta:: 
   :keywords: sample dataset
   :description: Aggregation operations process multiple documents and return computed results.

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

.. dismissible-skills-card::
   :skill: Fundamentals of Data Transformation
   :url: https://learn.mongodb.com/skills?openTab=aggregation

Aggregation operations process multiple documents and return computed
results. You can use aggregation operations to:

- Group values from multiple documents together.

- Perform operations on the grouped data to return a single result.

- Analyze data changes over time.

- Query the most up-to-date version of your data. 

By using the built-in aggregation operators in MongoDB, you can perform 
analytics on your cluster without having to move your data to another platform. 

Get Started 
-----------

To perform aggregation operations, you can use:

- :ref:`Aggregation pipelines <aggregation-pipeline-intro>`, which are
  the preferred method for performing aggregations.

- :ref:`Single purpose aggregation methods
  <single-purpose-agg-methods>`, which are simple but lack the
  capabilities of an aggregation pipeline.

.. |page-topic| replace:: :atlas:`run aggregation pipelines in the UI </atlas-ui/agg-pipeline>`

.. cta-banner::
   :url: https://www.mongodb.com/docs/atlas/atlas-ui/agg-pipeline
   :icon: Cloud

   .. include:: /includes/fact-atlas-compatible.rst

.. _aggregation-pipeline-intro:

Aggregation Pipelines
---------------------

.. include:: /includes/aggregation-pipeline-introduction.rst

Aggregation Pipeline Example
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/sample-data-usage.rst

This pipeline finds the top three directors who have directed 
the most movies in the database. 

First, add a :pipeline:`$match` stage to filter the documents to movies 
that have directors listed (excluding documents where directors field is null or empty):

.. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/full-pipeline/run-pipeline.snippet.match-stage.js
   :language: javascript
   :category: usage example

The ``$match`` stage reduces the number of documents in our pipeline by 
filtering out movies without director information. Next, use :pipeline:`$unwind` 
to deconstruct the directors array so we can count movies per individual director:

.. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/full-pipeline/run-pipeline.snippet.unwind-stage.js
   :language: javascript
   :category: usage example

Then, :pipeline:`$group` the documents by director name and count 
the number of movies each director has made: 


.. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/full-pipeline/run-pipeline.snippet.group-stage.js
   :language: javascript
   :category: usage example

To find the directors with the most movies, use the :pipeline:`$sort` 
stage to sort the remaining documents in descending order by movie count:

.. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/full-pipeline/run-pipeline.snippet.sort-stage.js
   :language: javascript
   :category: usage example

After you sort your documents, use the :pipeline:`$limit` stage to return the 
top three directors who have directed the most movies:

.. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/full-pipeline/run-pipeline.snippet.limit-stage.js
   :language: javascript
   :category: usage example

The full pipeline is given in this example: 

.. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/full-pipeline/run-pipeline.snippet.full-pipeline.js
   :language: javascript
   :category: usage example

This pipeline returns these results:

.. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/full-pipeline/output.sh
   :language: javascript
   :category: example return object

For runnable examples containing sample input documents, see
:ref:`Complete Aggregation Pipeline Examples
<aggregation-pipeline-examples>`. 

Learn More About Aggregation Pipelines
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To learn more about aggregation pipelines, see
:ref:`aggregation-pipeline`.

.. _single-purpose-agg-methods:

Single Purpose Aggregation Methods
----------------------------------

The single purpose aggregation methods aggregate documents from a single
collection. The methods are simple but lack the capabilities of an
aggregation pipeline.

.. list-table::
   :header-rows: 1
   :widths: 50 50
   
   * - Method
     - Description

   * - :method:`db.collection.estimatedDocumentCount()`
     - Returns an approximate count of the documents in a collection or
       a view.

   * - :method:`db.collection.count()`
     - Returns a count of the number of documents in a collection or a
       view.

   * - :method:`db.collection.distinct()`
     - Returns an array of documents that have distinct values for the
       specified field.

.. toctree::
   :titlesonly:
   :hidden:

   Aggregation Pipeline </core/aggregation-pipeline>
   Reference </reference/aggregation>
   Map-Reduce </core/map-reduce>
