With :writeconcern:`j: true <j>`, MongoDB returns only after the
requested number of members, including the primary, have written to the
journal. Previously :writeconcern:`j: true <j>` write concern in a
replica set only requires the :term:`primary` to write to the journal,
regardless of the :ref:`w: \<value\> <wc-w>` write concern.
