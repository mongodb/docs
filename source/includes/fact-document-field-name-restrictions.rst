- Field names **cannot** contain the ``null`` character.

- Top-level field names **cannot** start with the dollar sign (``$``) character.

  Otherwise, starting in MongoDB 3.6, the server permits storage of
  field names that contain dots (i.e. ``.``) and dollar signs (i.e.
  ``$``).

  .. important::

     The MongoDB Query Language cannot always meaningfully express
     queries over documents whose field names contain these characters
     (see :issue:`SERVER-30575`).

     Until support is added in the query language, the use of ``$`` and
     ``.`` in field names is not recommended and is not supported by
     the official MongoDB drivers.
