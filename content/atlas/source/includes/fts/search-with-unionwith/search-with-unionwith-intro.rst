Starting in v6.0, the MongoDB :pipeline:`$unionWith` aggregation stage 
supports :pipeline:`$search` inside the :pipeline:`$unionWith` 
``pipeline`` option. Using :pipeline:`$unionWith`, you can combine 
:pipeline:`$search` results from multiple collections in the same 
database in the result set.

.. warning:: 

   .. include:: /includes/fts/facts/fact-sharded-cluster-upgrade.rst

This tutorial demonstrates how to run a :pipeline:`$unionWith` query 
with :pipeline:`$search` against the ``companies`` and ``inspections`` 
collections in the ``sample_training`` database. It takes you through 
the following steps:

1. Create a default |fts| index on the ``companies`` and ``inspections`` 
   collections in the ``sample_training`` database.
#. Run a :pipeline:`$unionWith` query with :pipeline:`$search` to perform 
   a union of companies with ``mobile`` in their name from both the
   ``companies`` and ``inspections`` collections.

.. note:: 

   To run a :pipeline:`$unionWith` query with :pipeline:`$search`, your 
   {+cluster+} must run MongoDB v6.0 or higher. To upgrade your MongoDB version, 
   see :ref:`upgrade-major-MongoDB-version`.