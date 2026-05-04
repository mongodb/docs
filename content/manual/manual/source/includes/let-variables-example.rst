The following example:

- Matches documents from the ``sample_mflix.movies`` collection where the 
  ``imdb.rating`` field is greater than 8.5, limited to three results
- Defines a ``minRating`` variable in ``let``, which is referenced in
  ``$gt`` as ``$$minRating``