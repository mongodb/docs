This tutorial describes how to create an index with a :ref:`facet 
definition <fts-facet-definition>` on string, date, and numeric fields 
in the ``sample_mflix.movies`` collection. It shows how to run a |fts| 
query against those fields for results grouped by values for the string 
field and by ranges for the date and numeric fields, including the 
count for each of those groups. It takes you through the following 
steps: 

1. Set up a |fts| index with facet definition on the ``genres``, 
   ``released``, and ``year`` fields in the ``sample_mflix.movies`` 
   collection.
#. Run a |fts| query against the ``released`` field in the 
   ``sample_mflix.movies`` collection for results grouped by values for 
   the ``genres`` field and by ranges for the ``year`` field.

Prerequisites 
-------------

To complete these tutorials, in addition to the prerequisites listed in
the :ref:`fts-design-patterns-prereqs`, you must have a MongoDB
instance running MongoDB 7.0 or later.