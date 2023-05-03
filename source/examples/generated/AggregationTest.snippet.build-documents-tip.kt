Document("\$arrayElemAt", listOf("\$categories", 0))
// is equivalent to
val method2 = // :remove
Document.parse("{ \$arrayElemAt: ['\$categories', 0] }")
