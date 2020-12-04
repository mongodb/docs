In MongoDB, sorts are inherently stable, unless sorting on a field which
contains duplicate values:

- a *stable sort* is one that returns the same sort order each time it
  is performed
- an *unstable sort* is one that may return a different sort order
  when performed multiple times

If a stable sort is desired, include at least one field in your sort
that contains exclusively unique values. The easiest way to guarantee
this is to include the ``_id`` field in your sort query.
