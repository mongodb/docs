Do not use a field name that is the same as the 
:ref:`dot notation <document-dot-notation-embedded-fields>` for an 
embedded field. If you have a document with an embedded field 
``{ "a" : { "b": ... } }``, other documents in that collection should 
**not** have a top-level field ``"a.b"``.

If you can reference an embedded field and a top-level field in the same 
way, indexing and sharding operations happen on the embedded field. 
You cannot index or shard on the top-level field ``"a.b"`` while the 
collection has an embedded field that you reference in the same way. 

For example, if your collection contains documents with both an embedded 
field ``{ "a" : { "b": ... } }`` and a top-level field ``"a.b"``, 
indexing and sharding operations happen on the embedded field. It is not 
possible to index or shard on the top-level field ``"a.b"`` when your 
collection also contains an embedded field ``{ "a" : { "b": ... } }``.
