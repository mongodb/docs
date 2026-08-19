Starting in MongoDB 9.0, the server matches dotted field paths to
``null`` differently when an intermediate component of the path is an
array of scalar values. This change affects the :query:`$eq`,
:query:`$ne`, :query:`$in`, and :query:`$nin` operators.

For example, consider a collection that has the document
``{ "a": [ 1 ] }``. The path ``a.b`` doesn't exist in that document.

- In MongoDB 8.x and earlier, the predicate
  ``{ "a.b": { "$ne": null } }`` matches the document.

- Starting in MongoDB 9.0, the same predicate doesn't match the
  document, and the predicate ``{ "a.b": { "$eq": null } }`` matches it
  instead.

If your query uses such a predicate, the same ``--query`` value selects
a different set of documents on MongoDB 9.0 than on earlier versions.
An operation that filters on ``{ "$ne": null }`` returns fewer
documents. Review any query that compares a dotted path to ``null``
before you dump or export data from a MongoDB 9.0 deployment. Confirm
that the query still selects the documents you expect.
