The ``$text`` operator assigns a score to each document that
contains the search term in the indexed fields. The score represents
the relevance of a document to a given text search query. The score can
be part of a |sort-object| specification as well as part of the
projection expression. The ``{ $meta: "textScore" }`` expression
provides information on the processing of the ``$text`` operation.
See |meta-object| for details on accessing the score for
projection or sort.
