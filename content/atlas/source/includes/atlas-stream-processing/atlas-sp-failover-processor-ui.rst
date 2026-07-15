.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-stream-processing.rst

   .. step:: Initiate failover.
      
      a. Locate the overview panel of the {+spw+} that hosts the
	 target processor. 
      
      #. Click the ellipsis :guilabel:`Manage` button.
         
      #. Click :guilabel:`Stream Processors` in the left-hand
	 navigation menu.

      #. Locate the target processor from the list of processors in
	 the workspace and click the arrow to expand that processor's
	 region list. Locate the region to which you want to initiate
	 failover and click the :guilabel:`Failover` button In the
	 :guilabel:`Actions` column.

      #. In the modal window, select the :ref:`failover type
         <atlas-sp-architecture-failover>`. To perform a
         :guilabel:`Forced failover`, type ``Force`` in the confirmation
         prompt.

      #. Click the :guilabel:`Activate [TYPE] failover` button, where
	 ``[TYPE]`` is your chosen failover type.
