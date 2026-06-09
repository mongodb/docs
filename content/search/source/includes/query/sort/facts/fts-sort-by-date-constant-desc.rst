The following query shows how to run a :ref:`compound <compound-ref>`
operator query and sort the results by a date field. It uses the following
operators:

- :ref:`wildcard <wildcard-ref>` operator to search for movie titles that begin
  with ``Summer``.

- :ref:`near <near-ref>` operator to search for movies that were released in
  and about five months before or after April 18, 2014.

  .. note::

     When you use ``pivot`` on a date field, its unit of measure is
     in milliseconds. |fts| calculates a score for each document based
     on how close the date field is to the specified date. To learn
     more, see :ref:`near <near-ref>`.
