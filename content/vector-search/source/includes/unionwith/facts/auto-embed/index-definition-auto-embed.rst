The ``multiple-auto-embed-search`` index definition indexes the
following fields:

- ``fullplot`` field, which contains the full plot of a movie. 

  This field mapping is required for all the use cases in this
  tutorial.

- ``title`` field, which contains the title of a movie.

  This field mapping is required for the :ref:`second use case
  <avs-unionwith-use-cases>`.

Both fields use the ``autoEmbed`` :ref:`type <avs-types-auto-embed>`.
{+avs+} automatically generates ``2048``-dimensional embeddings for
these fields by using the ``voyage-4`` embedding model.