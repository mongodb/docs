- ``0`` corresponds to :collflag:`usePowerOf2Sizes` flag set to
  ``false`` and :collflag:`noPadding` flag set to ``false``.

- ``1`` corresponds to :collflag:`usePowerOf2Sizes` flag set to
  ``true`` and :collflag:`noPadding` flag set to ``false``.

- ``2`` corresponds to :collflag:`usePowerOf2Sizes` flag set to
  ``false`` and :collflag:`noPadding` flag set to ``true``.

- ``3`` corresponds to :collflag:`usePowerOf2Sizes` flag set to
  ``true`` and :collflag:`noPadding` flag set to ``true``.

.. note::
   MongoDB 3.0 ignores the :collflag:`usePowerOf2Sizes` flag.
   See :dbcommand:`collMod` and :method:`db.createCollection()` for
   more information.
