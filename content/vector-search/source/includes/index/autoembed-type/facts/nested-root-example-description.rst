The following index definition on the ``sample_airbnb.listingsAndReviews`` 
collection indexes the following fields:

- The string fields (``address.country`` and ``property_type``), 
  a numeric field (``bedrooms``), and a date field (``reviews.date``) 
  for pre-filtering the data.

- The embedded field (``reviews.comments``) for which to automatically 
  generate vector embeddings using the ``voyage-4`` embedding model.

- The ``reviews`` array field as the ``nestedRoot`` field that contains 
  the nested field for which to automatically generate vector embeddings.