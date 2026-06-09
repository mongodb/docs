Index Size and Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. important::

   If you create a |fts| index for a collection that has or will soon 
   have more than 2.1 billion index objects, use the :ref:`numPartitions <fts-index-partition>` 
   index option to partition your index
   or :ref:`shard your cluster <create-cluster-sharding>`. Index partitions
   are limited to 2.1 billion objects per partition.

Some index configuration options can lead to indexes that take up a
significant proportion of your disk space. In some cases, your index
could be many times larger than the size of your data. Although this is
expected behavior, it's important to be aware of the following
indexing-intensive features.

Dynamic vs. Static Mappings
```````````````````````````

When you :ref:`create an {+fts+} index <ref-create-index>`, field
mapping defaults to :ref:`dynamic <static-dynamic-mappings>`, which
means that |fts| dynamically indexes all the :ref:`datatypes that can be
dynamically indexed <bson-data-chart>` in your collection. This can lead
to large indexes if you have a large number of fields in your documents,
or if you have fields with long string values.

To reduce the size and performance footprint of your index, we recommend
using :ref:`static mappings <static-dynamic-mappings>` to specify the
fields that you want to index and their types.

``store`` Option
````````````````

When indexing a text field as the |fts| :ref:`string
<bson-data-types-string>` type, you can set the ``store`` option to
``false`` to reduce the size of your index. This prevents |fts| from
storing the exact document text as well as the analyzed values in the
index. However, setting ``store`` to ``false`` prevents you from using
the :ref:`highlight <highlight-ref>` option to adds fields to the result
set that display search terms in their original context.

Autocomplete
````````````

The |fts| :ref:`autocomplete <bson-data-types-autocomplete>` field type
creates indexes that you can use with the :ref:`autocomplete
<autocomplete-ref>` operator to implement search-as-you-type
functionality in your application. However, the ``autocomplete`` field
type can create large indexes and take longer to build than other field
types.

Use the following recommendations to reduce the size and
performance footprint of the ``autocomplete`` type:

- Use the ``autocomplete`` type only for specific fields in static
  mappings. Using a custom ``typeSet`` definition to dynamically index
  string fields as the ``autocomplete`` type can apply the
  ``autocomplete`` type too broadly and significantly increase index
  size and resource usage. In addition, the ``autocomplete`` type has
  specialized, typeahead-oriented scoring behavior suited to specific
  field indexing, not broad dynamic application. To learn more about
  ``similarity.type`` scoring with the ``autocomplete`` type, see
  :ref:`fts-similarity-algorithms`.
- Avoid using ``nGram`` as the ``tokenization`` strategy for the
  ``autocomplete`` type definition, as it creates more tokens for a
  given string than ``edgeGram`` or ``rightEdgeGram`` tokenization.
- Set a smaller range between the ``minGrams`` and ``maxGrams`` option
  values in the ``autocomplete`` type definition, which reduces the
  number of tokens created for each string.

  Generally, we recommend setting ``maxGrams`` to the character count of
  the longest word in the field that you want to query. If you are
  unsure, for English language fields, we recommend starting with
  ``maxGrams`` value of ``10``.

  Setting a larger value for ``minGrams`` can significantly reduce index
  size for fields in a collection with many documents. For example,
  setting ``minGrams`` to ``2`` instead of ``1`` creates 100,000 fewer
  tokens in a collection with 100,000 documents.

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
``````````````````

.. include:: /includes/shared/facts/fact-fts-embedded-documents-limitation.rst

Faceted Search 
``````````````

If you want to filter and facet your data using the same field, we
recommend that you index the field as following |fts| types: 

- :ref:`token <bson-data-types-token>`  
- :ref:`number <bson-data-types-number>`
- :ref:`date <bson-data-types-date>`

For an example of filtering the data by another field for faceting, see
the :ref:`facet-tutorial` tutorial.

``multi`` Analyzers
```````````````````

Using a ``multi`` analyzer to analyze the same field multiple 
different ways can cause large indexes, especially when analyzing 
fields with very long values.

Multilingual Search 
```````````````````

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

To learn how to do a Multilingual Search, see :ref:`fts-multilingual-example`

Synonym Collections
```````````````````

Inserts and updates to a synonym source collection are fast only if the 
synonym source collection is small. For best performance, we recommend 
batching inserts and updates to synonym source collections. 

A :ref:`synonym mapping <synonyms-ref>` definition doesn't require 
additional disk space aside from the disk space utilized by the synonym 
collection in the database. However, synonym mappings create artifacts 
in memory and therefore, for synonym collections with many documents, 
|fts| creates artifacts that occupy more memory.
