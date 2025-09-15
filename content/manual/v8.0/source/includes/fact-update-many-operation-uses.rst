The update operation:

- uses the :update:`$set` operator to update the value of the
  ``size.uom`` field to ``"in"`` and the value of the ``status``
  field to ``"P"``,

- uses the :update:`$currentDate` operator to update the value
  of the ``lastModified`` field to the current date. If
  ``lastModified`` field does not exist,
  :update:`$currentDate` will create the field. See
  :update:`$currentDate` for details.