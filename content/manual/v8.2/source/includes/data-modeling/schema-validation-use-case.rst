Your schema validation needs depend on how users use your application.
Schema validation is most useful for an established application where you have a 
good sense of how to organize your data. 

.. note:: 

   Schema validation rules are also flexible, so they don't need to cover every 
   field in a document, unless your application requires that they do.

You can use schema validation in the following scenarios:

- For an ``events`` collection, ensure that the ``start_date`` field is only
  stored as a date and not a string, so connecting applications don't use 
  unexpected types.

- For a ``store`` collection, ensure that the ``accepted_credit_cards`` 
  field belongs to a list of credit cards that your store accepts, such as 
  ``["Visa", "MasterCard", "American Express"]``. This validation prevents a 
  user from entering an unsupported credit card value.

- For a students collection, ensure that the ``gpa`` field is always a
  positive floating point number. This validation prevents errors during data 
  entry.
