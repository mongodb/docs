.. note::

   Although the :pipeline:`$sort` stage passes ordered documents as
   input to the :pipeline:`$group` stage, :pipeline:`$group` is not
   guaranteed to maintain this sort order in its own output.
