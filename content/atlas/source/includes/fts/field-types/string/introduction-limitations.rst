Use the |fts| ``string`` type to index :manual:`string
</reference/bson-types/#string>` fields. Use the |fts|
:ref:`phrase <phrase-ref>`, :ref:`querystring <querystring-ref>`, :ref:`span <span-ref>`,
:ref:`text <text-ref>`, :ref:`wildcard <wildcard-ref>`, :ref:`regex <regex-ref>`, and
:ref:`moreLikeThis <more-like-this-ref>` operators to query fields indexed as the
``string`` type.

``string`` Type  Limitations
----------------------------

You can't use the |fts| ``string`` type to index fields for
:ref:`facet <fts-facet-ref>` or :ref:`autocomplete <autocomplete-ref>` operator queries. You can't use
the ``string`` type to index fields for sorting |fts| results. Instead,
you must use :ref:`static mappings <static-dynamic-mappings>` to index
the string fields as the following types:

- :ref:`stringFacet <bson-data-types-string-facet>` type to run a
  :ref:`facet <fts-facet-ref>` operator query on string fields. Note that |fts| doesn't
  :ref:`dynamically <static-dynamic-mappings>` index string fields for
  faceting. 

- :ref:`autocomplete <bson-data-types-autocomplete>` type to run
  :ref:`autocomplete <autocomplete-ref>` operator queries on string fields. Note that
  |fts| doesn't :ref:`dynamically <static-dynamic-mappings>` 
  index string fields for :ref:`autocompletion <autocomplete-ref>`.

- :ref:`token <bson-data-types-token>` type to sort the |fts| results by
  the string field. |fts| doesn't :ref:`dynamically
  <static-dynamic-mappings>` index string fields for :ref:`sorting
  <sort-ref>` the results.

- :ref:`token <bson-data-types-token>` type to find an exact match for
  queries using :ref:`equals <equals-ref>`, :ref:`in <in-ref>`, and :ref:`range <range-ref>`
  operators. |fts| doesn't :ref:`dynamically  <static-dynamic-mappings>`
  index string fields as ``token`` type for querying using these
  operators. 

.. important::

   .. include:: /includes/fts/facts/fact-fts-string-size-limit.rst
