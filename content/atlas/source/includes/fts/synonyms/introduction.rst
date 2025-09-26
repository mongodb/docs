The ``synonyms`` option in a |fts| :ref:`index definition
<ref-index-definitions>` specifies synonym mappings that allow you to 
index and search your collection for words that have the same or nearly the same meaning.  
To configure a |fts| :ref:`index <ref-index-definitions>` with synonym mappings, you 
must:

1. Add a collection of synonym documents to your {+cluster+}. Ensure that:  

   - Your collection is in the same database as the index that will 
     reference the collection
   - The documents are :ref:`properly formatted <synonyms-coll-spec>`

#. Reference the synonym source collection in a synonym mapping in 
   the :ref:`index definition <ref-index-definitions>`. 

A synonym mapping configures a |fts| index to support queries that apply synonyms from a synonym 
source collection in the same database as the collection you are indexing. You can use synonyms 
only in queries that use the :ref:`text <text-ref>` operator.

.. note:: Free (``M0``) Tier Cluster Limitation

   .. include:: /includes/fts/facts/fact-fts-synonym-mapping-limitation.rst

This page describes the format of the synonyms source collection and 
how to define synonym mappings that reference the synonym source 
collection in your |fts| index. 