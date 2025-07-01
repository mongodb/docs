.. note::

   If you change the name of a stream processor for which you had
   :ref:`configured <configure-alerts>` the :ref:`Stream Processor State
   is failed <atlas-sp-alerts>` alert by using an :guilabel:`Operator`
   (which contains matcher expressions like ``is``, ``contains``, and
   more), |service| won't trigger alerts for the renamed stream
   processor if the matcher expression doesn't match the new name. To
   monitor the renamed stream processor, :ref:`reconfigure 
   <configure-alerts>` the alert. 
