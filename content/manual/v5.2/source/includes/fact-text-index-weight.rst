For a ``text`` index, the *weight* of an indexed field denotes the
significance of the field relative to the other indexed fields in terms
of the text search score.

For each indexed field in the document, MongoDB multiplies the number
of matches by the weight and sums the results. Using this sum, MongoDB
then calculates the score for the document. See :expression:`$meta`
operator for details on returning and sorting by text scores.

The default weight is 1 for the indexed fields. To adjust the weights
for the indexed fields, include the ``weights`` option in the
:method:`db.collection.createIndex()` method.
