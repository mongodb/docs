You must use the |fts| ``token`` type to index :manual:`string 
</reference/bson-types/#string>` fields to enable sorting and faceting
on these fields. Then, you can perform the following actions:

- Use the ``sort`` option in your query
  to sort the results by the indexed field. To learn more, see
  :ref:`sort-ref`. 
- Use the ``facet`` collector in your query to group the results by the
  indexed field. To learn more, see :ref:`facet-tutorial`.

Additionally, you must index string fields as the ``token`` type 
in order to use the :ref:`equals <equals-ref>`, :ref:`in <in-ref>`
and :ref:`range <range-ref>` operators. To learn more, see the 
documentation for each respective :ref:`operator <operators-ref>`.

.. note::

   You can also use the ``token`` type to index
   string fields for pre-filtering your data for :pipeline:`$vectorSearch`
   queries. To learn more, see :ref:`fts-vector-search`.

``token`` Type Limitations 
--------------------------

When you index a field as the ``token`` type, you must index that field
as ``string`` type also to query the text value using operators such as
:ref:`text <text-ref>`, :ref:`phrase <phrase-ref>`, etc. For the following operators,
you don't need to index the field as ``string`` type also to query the
text value in the field:  

- :ref:`equals <equals-ref>`
- :ref:`in <in-ref>`
- :ref:`range <range-ref>`

.. note::

   We do not recommend indexing a field with both the ``stringFacet`` (deprecated)
   and ``token`` types, unless you require a different normalizer for the ``token``
   type for a use case other than faceting. With this index definition, |fts|
   uses the ``stringFacet`` definition for faceting.

Review the Behavior of the |fts-field-type| Type
------------------------------------------------

When you index a field as ``token`` type, |fts| indexes the terms in
the string as a single token (searchable term) and stores them in a
columnar storage for efficient filtering or sort operations. You
can use a :ref:`normalizer <ref-built-in-normalizers>` to transform the
token. By default, the normalizer is set to ``none`` and so |fts|
indexes strings in their original form. 

The major difference between the |fts| ``string`` and ``token`` types is
that |fts| creates one or more tokens for fields indexed as ``string``
type whereas |fts| creates only a single token for fields indexed as the
``token`` type. 

If a string being indexed as a ``token`` field type exceeds 8181
characters, |fts| truncates it to 8181 characters before indexing.