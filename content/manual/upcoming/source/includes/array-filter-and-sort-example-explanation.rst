The sort is ascending. The sort key is the first value in the ``genres`` array
when sorted alphabetically:

- In ``The Comancheros``, the first ``genres`` element is ``Action``.
  This value is used as the sort key even though it does not match the
  filter ``{ genres: { $in: [ "Drama", "Western" ] } }``.

- In ``The Son of the Sheik``, the first ``genres`` element is ``Adventure``. 
  Similarly, this operation uses ``Adventure``  as the sort key even though it 
  does not match the filter.

The query returns ``The Comancheros`` first.
