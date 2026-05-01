The following query uses the :pipeline:`$vectorSearch` stage to search
the ``reviews.comments_embedding`` field in the
``sample_airbnb.listingsAndReviews`` collection using vector embeddings
for the string *great location close to everything*. It considers up to
``100`` nearest neighbors, and returns ``10`` documents in the results.

The query pre-filters the documents by matching the ``address.country``
field value to *United States* and number of bedrooms between 2 and 3.
It then uses the ``nestedOptions`` option to return the document that
has the *average* score from the matching child documents as the overall
score for the parent document.

The query also specifies a :pipeline:`$project` stage to do the following:

- Exclude the ``_id`` field and include only the ``name``, ``address``,
  and ``reviews.comments`` fields in the results.
- Add a field named ``score`` that shows the vector search score
  of the documents in the results.
