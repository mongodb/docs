Index Size and Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. important::

   If you create a |fts| index for a collection that has or will soon 
   have more than 2.1 billion index objects, use the :ref:`numPartitions <fts-index-partition>` 
   index option to partition your index
   or :ref:`shard your cluster <create-cluster-sharding>`. Index partitions
   are limited to 2.1 billion objects per partition.

When you :ref:`create <ref-create-index>` a |fts| index, field mapping 
defaults to :ref:`dynamic <static-dynamic-mappings>`, which means that 
|fts| dynamically indexes all the :ref:`datatypes that can be 
dynamically indexed <bson-data-chart>` in your collection. Other options
such as enabling highlights can also result in your index taking up more
disk space. You can reduce the size and performance footprint of your
|fts| index by:

- Specifying a custom :ref:`index definition
  <ref-index-definitions>` to narrow the amount and type of data that is
  indexed.

- Setting the ``store`` option to ``false`` when specifying a 
  :ref:`string <bson-data-types-string>` type in an index definition.

.. note::

   Some limitations apply to |fts| on ``M0`` and {+Flex-clusters+}
   only. To learn more, see 
   :ref:`{+fts+} Search Free and Flex Tier Limitations 
   <atlas-fts-shared-tier-limitations>`.

Considerations
``````````````

Some index configuration options can lead to indexes that take up a 
significant proportion of your disk space. In some cases, your index 
could be many times larger than the size of your data. Although this is 
expected behavior, it's important to be aware of the following 
indexing-intensive features:

Autocomplete
++++++++++++

The |fts| :ref:`autocomplete <autocomplete-ref>` operator can be used to build
functionality similar to search-as-you-type in your application. The 
|fts| :ref:`autocomplete <bson-data-types-autocomplete>` field type
can cause large indexes, especially in the following cases:

- Using ``nGram`` tokenization.
- Setting a wide ``minGrams`` to ``maxGrams``  range.
- Setting a ``minGram`` value of ``1`` on a collection with millions of 
  documents.

You can reduce the space used by the ``autocomplete`` type index by
doing the following:

- Reduce the range of ``minGrams`` and ``maxGrams`` to the minimum.
  Generally, we recommend setting ``maxGrams`` to the character count of
  the longest word in the field that you want to query. If you are
  unsure, for English language fields, we recommend starting with
  ``maxGrams`` value of ``10``.
- Avoid ``nGram`` tokenization strategy as, for a given string, |fts|
  creates more tokens for ``nGram`` than for ``edgeGram`` or
  ``rightEdgeGram`` tokenization. 

When indexing a ``string`` field as the :ref:`autocomplete
<bson-data-types-autocomplete>` type, we recommend that you index the
field as the |fts| :ref:`string <bson-data-types-string>` type also for 
the following advantages: 

- Boost the score of exact matches when using the
  :ref:`autocomplete <autocomplete-ref>` operator.
- Query the same field in the same query using the 
  :ref:`autocomplete <autocomplete-ref>` operator and another operator that supports
  string search, such as the :ref:`text <text-ref>` operator. For an example,
  see the :ref:`autocomplete-compound` example.

Embedded Documents 
++++++++++++++++++

.. include:: /includes/fts/facts/fact-fts-embedded-documents-limitation.rst

Faceted Search 
++++++++++++++

If you want to filter and facet your data using the same field, we
recommend that you index the field as following |fts| types: 

- :ref:`token <bson-data-types-token>`  
- :ref:`number <bson-data-types-number>`
- :ref:`date <bson-data-types-date>`

For an example of filtering the data by another field for faceting, see
the :ref:`facet-tutorial` tutorial.

``multi`` Analyzers
+++++++++++++++++++

Using a ``multi`` analyzer to analyze the same field multiple 
different ways can cause large indexes, especially when analyzing 
fields with very long values.

Multilingual Search 
+++++++++++++++++++

You can use the |fts| :ref:`ref-language-analyzers` to index many 
languages. For the list of languages for which |fts| provides built-in
analyzers, see the :ref:`ref-language-analyzers`. To index and query 
languages that are currently not in the list of built-in
:ref:`ref-language-analyzers`, you can create a :ref:`custom analyzer
<custom-analyzers>`. For an example, see the 
:ref:`custom-language-analyzer-eg`. 

Suppose you have one document for each language in your collection.
Consider the following:  

- You can index the fields separately in the same index using the
  :ref:`ref-language-analyzers`. A single index can support multiple
  languages in the same query. 

- Alternatively, you can create an index per language, which is useful
  in isolating the different language documents. Note that each index
  is a change stream cursor and so this might be expensive to
  maintain.

- If you have the language documents nested inside a parent document,
  you can create a single index. However, your index definition payload 
  might be large and your query might be complex. 

To learn more about these data models and index definitions, see the
`MongoDB blog <https://www.mongodb.com/developer/products/atlas/atlas-search-multi-language-data-modeling/>`__. 

Synonym Collections
+++++++++++++++++++

Inserts and updates to a synonym source collection are fast only if the 
synonym source collection is small. For best performance, we recommend 
batching inserts and updates to synonym source collections. 

A :ref:`synonym mapping <synonyms-ref>` definition doesn't require 
additional disk space aside from the disk space utilized by the synonym 
collection in the database. However, synonym mappings create artifacts 
in memory and therefore, for synonym collections with many documents, 
|fts| creates artifacts that occupy more memory.
