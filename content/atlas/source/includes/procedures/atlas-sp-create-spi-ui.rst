.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-stream-processing.rst

   .. step:: Create your {+spw+}.

      a. Click :guilabel:`Create workspace` in the upper
         right corner.

      #. Configure your new {+spw+}.

         i. Select a default tier.

         #. Enter a string for the :guilabel:`Workspace Name`. Each 
            {+spw+} name must be unique within a project. 

         #. (Optional) Set a max tier size.

         To learn more about default tier and max tier sizes, see :ref:`atlas-sp-default-tier-spw`.
	    
         #. Select a :guilabel:`Cloud Provider`.      

         #. Select a :guilabel:`Region` from the dropdown menu.

         #. (Optional) Select up to two :ref:`failover regions
            <atlas-sp-architecture-failover>` from the :guilabel:`Regional
            Failover` dropdown menu.
 
         #. Click :guilabel:`Create`.
