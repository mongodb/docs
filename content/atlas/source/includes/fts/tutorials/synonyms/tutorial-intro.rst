This tutorial describes how to add a collection that configures words as synonyms,
create an index that defines synonym mappings on the  ``sample_mflix.movies``
collection, and run |fts| queries against the ``title`` field using words
that are configured as synonyms.
  
The tutorial takes you through the following steps: 

1. Load one or more sample synonyms source collections in the 
   ``sample_mflix`` database.
#. Create a |fts| index with one or more synonym mappings for the 
   ``sample_mflix.movies`` collection.
#. Run |fts| queries against the ``title`` field in the 
   ``sample_mflix.movies`` collection for words configured as synonyms 
   in the synonyms source collection.

Before you begin, ensure that your cluster meets the 
requirements described in the :ref:`fts-accuracy-tutorials-prereqs`. 

.. note:: 

   To create multiple synonym mappings and run the advanced sample 
   query in this tutorial, you need an ``M10`` or higher {+cluster+}.