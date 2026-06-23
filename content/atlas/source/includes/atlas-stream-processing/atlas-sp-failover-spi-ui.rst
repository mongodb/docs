.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-stream-processing.rst

   .. step:: Initiate failover.
      
      a. Locate the overview panel of the {+spw+} for which you want
	 to initiate failover. 
      
      #. Click the :guilabel:`Manage` button in the upper-right.

      #. Ensure you are on the :guilabel:`Stream Processors`
	 management page.
         
      #. Click the ellipsis button :guilabel:`. . .` in the
	 upper-right. From the dropdown menu, select
	 :guilabel:`Failover all processors`.
	 
      #. In the modal window, under the :guilabel:`Select failover
	 regions` heading, click the name of the region to which you
	 want to failover.

      #. In the modal window, select the :ref:`failover type
         <atlas-sp-architecture-failover>`. To perform a
         :guilabel:`Forced failover`, type ``Force`` in the confirmation
         prompt.

      #. Click the :guilabel:`Activate [TYPE] failover` button, where
	 ``[TYPE]`` is your chosen failover type.
	 
