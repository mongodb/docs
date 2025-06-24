The ``$text`` operator assigns a score to each result document. The
score represents the relevance of a document to a given query. The score
can be part of a |sort-object| specification as well as part of the
projection expression. The ``{ $meta: "textScore" }`` expression
provides information on the processing of the ``$text`` operation. See
|meta-object| for details on accessing the score for projection or sort.
