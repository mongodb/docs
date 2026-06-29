.. _autocomplete-maxgrams-config:

``maxGrams`` Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``maxGrams`` option specifies the maximum length of substrings
generated during indexing. Increasing ``maxGrams`` improves
matching for longer queries by generating more substrings. Setting
it beyond what you need can increase index size and affect
indexing performance.

Consider the following best practices when you configure
``maxGrams``:

- **Default to no more than 15.** Set ``maxGrams`` to no more than ``15`` when
  possible to avoid unnecessary index growth.

- **Align with query length.** Set ``maxGrams`` based on the typical
  length of user queries, rather than indexing for worst-case
  scenarios.

- **Avoid over-indexing.** If your queries are shorter than your
  current ``maxGrams`` value, you may be indexing more data than
  necessary.

- **Use an alternative for longer queries.** If your queries
  regularly exceed 15 characters, use a :ref:`custom analyzer
  <regex-to-search>` for ``prefix``, ``contains``, and ``suffix`` patterns.

.. _autocomplete-tokenization-performance:

Tokenization Performance
~~~~~~~~~~~~~~~~~~~~~~~~

Indexing a field for autocomplete with an ``edgeGram``,
``rightEdgeGram``, or ``nGram`` tokenization strategy requires more
computation and index storage than indexing a string field.

For the specified tokenization strategy, |fts| concatenates sequential tokens 
before emitting them ("shingling"). |fts| emits tokens between ``minGrams``
and ``maxGrams`` characters in length:

- Keeps tokens less than ``minGrams``.
- Joins tokens greater than ``minGrams`` but less than ``maxGrams``
  to the next tokens to create tokens up to the specified maximum
  number of characters in length.

.. _autocomplete-dynamic-mappings:

Dynamic Mappings
~~~~~~~~~~~~~~~~

The default field types that |fts| uses for :ref:`dynamic mappings <fts-dynamic-mappings>` 
do not include the ``autocomplete`` type. Using the ``autocomplete`` type in dynamic
mappings can increase index size and resource usage, and produce
unexpected scoring results. Use ``autocomplete`` in static mappings.

However, if you need to include ``autocomplete`` in dynamic mappings, you can
add it to a custom ``typeSet`` definition. To learn more about ``autocomplete``
and custom ``typeSet`` configurations, see :ref:`Index Size and Configuration <index-perf>`.

.. _autocomplete-index-build-time:

Index Build Time
~~~~~~~~~~~~~~~~

If your dataset has many documents or a wide data range, building
this index for the :ref:`autocomplete <autocomplete-ref>` operator can
take some time. To reduce the impact on other indexes
and queries while the new index builds, create a separate index with
only the ``autocomplete`` type.

For index performance considerations, 
see :ref:`Index Performance Considerations <index-size-and-config>`.