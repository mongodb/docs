Continue Learning 
-----------------

Run Autocomplete and Partial Match Queries
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can use |fts| to run autocomplete and partial queries
that return results for partial words. This is useful to retrieve 
results with increasing accuracy as more characters
are entered in your application's search field. You must 
index the fields as the |fts| :ref:`autocomplete
<bson-data-types-autocomplete>` type to use the :ref:`autocomplete <autocomplete-ref>` 
operator.

To get started, see :ref:`partial-match-tutorial`.

Group Search Results with Facets
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can use |fts| to run facet queries that group search results
by string, date, or numeric values. You must create an index 
with a :ref:`facet definition <fts-facet-definition>` to use the
:ref:`fts-facet-ref` collector.

To get started, see :ref:`facet-tutorial`.

Use the {+playground+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the `{+playground+} <https://search-playground.mongodb.com/>`__. 
to try different |fts| features by configuring search indexes and running 
queries without an |service| account, {+cluster+}, or collection. 

To learn more, see :ref:`fts-playground`.

Learn with a Course
~~~~~~~~~~~~~~~~~~~

To learn more about |fts|, you can take Unit 1 of the
:mdbu-course:`Atlas Search Course on MongoDB University
</learning-paths/atlas-search>`. The 2.25 hour unit includes an 
overview of |fts| and lessons on how to create |fts| indexes, use 
:pipeline:`$search` with different operators, and generate search 
:ref:`facets <fts-facet-ref>`.

Learn by Watching
~~~~~~~~~~~~~~~~~

You can also watch the following videos to 
learn more about |fts|:

.. collapsible::
   :heading: Video: What is Atlas Search?
   :sub_heading: Watch an overview of Atlas Search and how to get started.
   :expanded: false

   Watch an overview of |service| and |fts| and get started setting up
   |fts| for your data. The video demonstrates how to load sample data on
   your {+cluster+}, create a |fts| index, and run a sample query using
   :guilabel:`Search Tester` and :guilabel:`Data Explorer`. 

   *Duration: 10 Minutes*

   .. video:: https://youtu.be/HsS0z3eOCSQ

.. collapsible::
   :heading: Video: Atlas Search Indexes and Queries
   :sub_heading: Watch a video that demonstrates how to configure an Atlas Search index and run queries.
   :expanded: false

   Follow along with the following video to learn how to configure your 
   |fts| index and run queries from your application. 

   *Duration: 7 Minutes*

   .. video:: https://youtu.be/3fRCD_QptVQ

.. collapsible::
   :heading: Video: Restaurant Finder Demo
   :sub_heading: Watch a video tutorial that demonstrates a demo application that uses Atlas Search.
   :expanded: false

   Follow along with the following video tutorial walk-through that 
   demonstrates how to build |fts| queries for a Restaurant Finder demo 
   application, which is also available at `www.atlassearchrestaurants.com 
   <https://www.atlassearchrestaurants.com/>`__.

   *Duration: 20 Minutes*

   .. video:: https://youtu.be/s2kXYZRE7pA
