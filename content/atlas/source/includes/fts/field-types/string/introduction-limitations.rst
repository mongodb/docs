Use the |fts| ``string`` type to index :manual:`string
</reference/bson-types/#string>` fields. Use the |fts|
:ref:`phrase <phrase-ref>`, :ref:`querystring <querystring-ref>`, :ref:`span <span-ref>`,
:ref:`text <text-ref>`, :ref:`wildcard <wildcard-ref>`, :ref:`regex <regex-ref>`, and
:ref:`moreLikeThis <more-like-this-ref>` operators to query fields indexed as the
``string`` type.

``string`` Type Considerations 
-------------------------------------------

The ``string`` type doesn't support all |fts| features for string
fields. Index the string field as a :ref:`token <bson-data-types-token>`
to: 

- Run a :ref:`facet <fts-facet-ref>` query on string fields.
- Sort the |fts| results by string fields.
- Find an exact match for queries using :ref:`equals <equals-ref>`,
  :ref:`in <in-ref>`, and :ref:`range <range-ref>` operators.

The |fts| :ref:`dynamic mappings <fts-enable-dynamic-mappings>` with
the default ``typeSet`` only indexes string fields as ``string`` types.
Specify a custom ``typeSet`` to dynamically index strings as ``token`` or
``autocomplete`` to use their supported features.

.. important::

   .. include:: /includes/fts/facts/fact-fts-string-size-limit.rst 
