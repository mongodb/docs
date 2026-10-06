If the value of the expression is an array, ``$addToSet`` appends the
whole array as a single element.

If the value of the expression is a document, MongoDB determines that
the document is a duplicate if another document in the array matches the
to-be-added document exactly. Specifically, the existing document has
the exact same fields and values in the exact same order.
