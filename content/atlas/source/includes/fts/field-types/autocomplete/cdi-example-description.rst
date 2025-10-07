The following index definition for the ``sample_mflix.movies``
collection in the :ref:`sample dataset <available-sample-datasets>`
indexes all string fields at the root-level in the documents in the
collection as the ``autocomplete`` type with default settings. It also
excludes string fields like ``poster``, ``languages``, ``rated``,
``lastupdated``, ``fullplot``, and ``awards`` from being indexed.