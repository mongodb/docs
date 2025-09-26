.. _fts-tutorial-run-query:

Build a |fts| Query
--------------------

.. collapsible::
   :heading: What are Atlas Search queries?
   :expanded: false

   |fts| queries take the form of an :manual:`aggregation pipeline stage 
   </aggregation>`. You use |fts| primarily with the :pipeline:`$search` stage, 
   which must be the first stage in the query pipeline. You can also use 
   this stage in conjunction with other stages in your pipeline.

   When you run a |fts| query, |fts| uses the search index to
   locate and retrieve relevant data from the collection. 
   |fts| also provides the :pipeline:`$searchMeta` stage, 
   multiple sub-pipelines, and several query 
   :ref:`operators <operators-ref>` and :ref:`collectors <collectors-ref>` 
   that you can use to further refine your search results. 

   To learn more, see :ref:`fts-about-queries`.

In this section, you run queries against the indexed collection.