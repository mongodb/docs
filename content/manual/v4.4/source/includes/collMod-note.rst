The ``noPadding`` and ``usePowerOf2Sizes`` MMAPv1 options for the
:dbcommand:`collMod` command are removed. Do not use those options
because upgrading from MongoDB 4.0 to 4.2 causes the 4.2 :ref:`secondary
members <replica-set-secondary-members>` to immediately halt.
