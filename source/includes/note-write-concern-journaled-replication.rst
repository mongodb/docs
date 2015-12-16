.. note:: Requiring *journaled* write concern in a replica set only
   requires a journal commit of the write operation to the
   :term:`primary` of the set regardless of the 
   :ref:`w: \<value\> <wc-w>` write concern.
