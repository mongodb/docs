.. _schema-design-antipatterns:

===========================
Schema Design Anti-Patterns
===========================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Schema design anti-patterns are inefficient ways to structure your database 
schema. They can create unnecessary complexity and cause performance issues. 
Recognizing and avoiding schema design anti-patterns can help create 
applications with better performance. 

Get Started
-----------

To learn more about schema design anti-patterns, see the following pages:

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - Schema Design Anti-Pattern
     - Definition

   * - :ref:`Avoid Unbounded Arrays <unbounded-arrays-antipattern>`
     - A document stores an unbounded array that can grow to be too large. The large 
       array can exceed the document size limit and cause a decrease in index 
       performance.

   * - :ref:`Reduce Number of Collections <reduce-collections>`
     - You create a large number of collections in your database. Having too many 
       collections can decrease storage engine performance. 

   * - :ref:`Remove Unnecessary Indexes <unnecessary-indexes-antipattern>`
     - Your collection contains unnecessary indexes. Unnecessary 
       indexes consume additional disk space and can degrade write performance.

   * - :ref:`Reduce Bloated Documents <bloated-documents-antipattern>`
     - Your collection has excessively large documents. The large documents 
       can degrade the performance of your most common queries. 

   * - :ref:`Reduce $lookup Operations <reduce-lookup-operations>`
     - You are running too many $lookup operations on your data. This increases 
       query complexity and reduces query performance.

Details
--------

The :ref:`MongoDB Atlas Performance Advisor <schema-design-performance-advisor>` (available for 
M10 clusters or higher) and :compass:`MongoDB Compass Performance Insights 
</manage-data/performance-insights>` identify schema design anti-patterns in your 
database. It is important to understand the Atlas anti-pattern warnings in order to 
properly correct the issues and prevent the use of anti-patterns. 

.. _schema-design-performance-advisor:

View Schema Suggestions in Performance Advisor
----------------------------------------------

.. procedure::
   :style: normal
      
   .. include:: /includes/data-modeling/steps-db-deployments-page.rst

   .. step:: Click the replica set where the collection resides.

      If the replica set is part of a sharded cluster, first click the
      sharded cluster containing the replica set.
      
   .. step:: Click :guilabel:`Performance Advisor`.
      
   .. step:: View recommendations.

      In the :guilabel:`Performance Advisor` tab, click 
      :guilabel:`Explore Recommendations` on the 
      :guilabel:`Improve Schema` card.

   .. step:: (Optional) Change which host results to view.

      By default, the results correspond to one of the primary hosts. 
      However, you can select another host from the drop-down.

Learn More
----------

For recommended schema design patterns, see the following: :ref:`schema-design-patterns` and 
:ref:`data-modeling-apply-patterns`.

.. toctree::
   :titlesonly: 
   :hidden: 

   /data-modeling/design-antipatterns/unbounded-arrays
   /data-modeling/design-antipatterns/reduce-collections
   /data-modeling/design-antipatterns/unnecessary-indexes
   /data-modeling/design-antipatterns/bloated-documents
   /data-modeling/design-antipatterns/reduce-lookup-operations
