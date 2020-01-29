In MongoDB versions prior to 4.4, the operation does not result in
an error. The result depends on the order in which the fields
are specified in the projection document.

- If the parent document is specified before the embedded field,
  the operation only returns the embedded field.

  The projection document ``{ size: 1, "size.uom": 1 }`` produces the
  same result as the document ``{ "size.uom": 1 }``.

- If the embedded field is specified before the parent document
  the operation returns the entire size document.

  The projection document ``{ "size.uom": 1, size: 1 }`` produces the
  same result as the document ``{ size: 1 }``.
