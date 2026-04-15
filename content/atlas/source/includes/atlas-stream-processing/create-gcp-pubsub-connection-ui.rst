Add a GCP Pub/Sub Connection through the {+atlas-ui+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add a {+gcp+} Pub/Sub connection to your {+spw+} through the
{+atlas-admin-api+}, follow these steps:

.. procedure::
   :style: normal

   .. step:: Set up GCP Service Account Access

      Follow the procedure described in :ref:`Set Up and Manage GCP
      Service Account Access <manage-gcp-access>`.

      Note the ``Service Account`` ID for later in this procedure.
      
      Ensure that you grant the following roles at both the project and topic levels:

      - `Publisher Role <https://docs.cloud.google.com/pubsub/docs/access-control#pubsub.publisher>`__
      - `Viewer Role <https://docs.cloud.google.com/pubsub/docs/access-control#pubsub.viewer>`__
      
      For more information, see the `Pub/Sub documentation
      <https://docs.cloud.google.com/pubsub/docs/access-control#console>`__.

   .. include:: /includes/nav/steps-stream-processing.rst  
		
   .. step:: Go to the :guilabel:`Connection Registry`.  

      a. Locate the overview panel of the {+spw+} you want to  
         modify and click :guilabel:`Manage`.  

      #. Select the :guilabel:`Connection Registry` tab.  

   .. step:: Click :guilabel:`+ Add connection`.  

   .. step:: Add a new connection.  

      a. Select a :guilabel:`GCP Pub/Sub` connection.  

      #. Provide a :guilabel:`Connection Name`. Each connection
         name must be unique within a {+spw+}.  This is the name
         used to reference the connection in {+atlas-sp+}
         :ref:`aggregations <atlas-sp-aggregation>`.

      #. From the :guilabel:`GCP Service Account` dropdown, select
	 the service account defined earlier in this procedure.
	      
      #. Click :guilabel:`Add connection`.
