This page contains tutorials that demonstrate the 
different ways you can run |fts| queries across multiple collections:

- To join collections and search across them, use :pipeline:`$lookup` with :pipeline:`$search`.
- To combine search results from multiple collections, use :pipeline:`$unionWith` with :pipeline:`$search`.
- To consolidate multiple collections so you can index and search them together, use
  materialized views.

.. include:: /includes/fts/fts-design-patterns-prereqs.rst