Starting in MongoDB 6.1:

- To improve efficiency, MongoDB may batch multiple document deletions
  together.
- The :dbcommand:`explain` command :ref:`results <explain-results>`
  contain a new ``BATCHED_DELETE`` stage for batched document deletions.
