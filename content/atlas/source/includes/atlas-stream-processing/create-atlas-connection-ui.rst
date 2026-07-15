Add an Atlas Cluster Connection through the {+atlas-ui+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add an Atlas Cluster connection to your {+spw+} through the
{+atlas-ui+}, follow these steps:

.. procedure::
   :style: normal

   .. step:: **(Optional)** Enable cross-project connections.

      To create a cross-project {+service+} connection, first enable
      this functionality. To learn more, see :ref:`Cross-Project
      Connections <atlas-sp-manage-connections-cross-project>`
	   
   .. include:: /includes/nav/steps-stream-processing.rst
		
   .. step:: Go to the :guilabel:`Connection Registry`.

      a. Locate the overview panel of the {+spw+} you want to 
         modify and click :guilabel:`Manage`. 

      #. Select the :guilabel:`Connection Registry` tab.

   .. step:: Click :guilabel:`+ Add Connection`.

   .. step:: Add a new connection.

      To create a new connection to an {+service+}
      :manual:`change stream </changeStreams>`:

      a. Select an :guilabel:`{+service+} Database` 
	 connection.

      #. Provide a :guilabel:`Connection Name`. Each
	 connection name must be unique within an {+spw+}. 
	 This is the name used to reference the connection in 
	 {+atlas-sp+} :ref:`aggregations <atlas-sp-aggregation>`.

      #. From the dropdown menu, select an :guilabel:`{+service+}
         {+Cluster+}`. {+atlas-sp+} can connect only to
	 dedicated-tier {+clusters+}. If you enable cross-project
	 support, the available {+clusters+} appear grouped by
	 project.

      #. **(Optional)** If you plan to use this connection to create a
	 stream processor with :ref:`failover processor
	 <atlas-sp-architecture-failover>` functionality, configure
	 the :guilabel:`Failover region settings`.
	 
      #. Click :guilabel:`+ Add Connection`.
      

.. include:: /includes/atlas-stream-processing/atlas-stage-support.rst
