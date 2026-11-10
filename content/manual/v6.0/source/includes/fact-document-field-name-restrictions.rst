- Field names **cannot** contain the ``null`` character.

- The server permits storage of field names that contain dots (``.``)
  and dollar signs (``$``).

- MongodB 5.0 adds improved support for the use of (``$``) and (``.``)
  in field names. There are some restrictions. See
  :ref:`Field Name Considerations <crud-concepts-dot-dollar-considerations>` for more details.

