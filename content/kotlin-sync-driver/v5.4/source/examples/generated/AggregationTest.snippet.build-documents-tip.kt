    Document("\$arrayElemAt", listOf("\$categories", 0))
// is equivalent to
    Document.parse("{ \$arrayElemAt: ['\$categories', 0] }")
