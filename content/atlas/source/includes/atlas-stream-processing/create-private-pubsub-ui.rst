Add a {+gcp+} Pub/Sub Private Service Connect Connection through the {+atlas-ui+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add a {+gcp+} Pub/Sub connection to your {+spw+} through the
{+atlas-ui+}, follow these steps:

.. procedure::
   :style: normal

   .. step:: Set up GCP Service Account Access.

      Follow the procedure described in :ref:`Set Up and Manage GCP
      Service Account Access <manage-gcp-access>`.

      Note the ``Service Account`` ID for use later in this procedure.
      
      Grant the following roles at both the project and topic levels:

      - `Publisher Role <https://docs.cloud.google.com/pubsub/docs/access-control#pubsub.publisher>`__
      - `Viewer Role <https://docs.cloud.google.com/pubsub/docs/access-control#pubsub.viewer>`__
      
      For more information, see the `Pub/Sub documentation
      <https://docs.cloud.google.com/pubsub/docs/access-control#console>`__.
	   
   .. include:: /includes/nav/steps-network-access.rst

   .. step:: Navigate to the {+atlas-sp+} private endpoint interface.

      a. In the sidebar, click :guilabel:`Private Endpoint`.

      #. Click the :guilabel:`{+atlas-sp+}` tab.

         If you have not created an {+atlas-sp+} private endpoint
         previously, click :guilabel:`Create endpoint`. If you have,
         click :guilabel:`Add ASP Endpoint`.

   .. step:: Select your cloud provider and vendor.

      a. Set :guilabel:`Cloud Provider` to :guilabel:`GCP`.

      #. Set :guilabel:`Vendor` to :guilabel:`Pub/Sub`.

      #. Click :guilabel:`Next, enter service details`

   .. step:: Provide your {+gcp+} endpoint region.

      Your endpoint must be both:

      - In the same :ref:`region <gcp-stream-processing-regions>` as
        your {+service+} {+gcp+} cluster
      - In the same :ref:`region <gcp-stream-processing-regions>` in
        which you intend to host the stream processors that use it.

      #. Click :guilabel:`Next, generate endpoint ID`

   .. include:: /includes/nav/steps-stream-processing.rst

   .. step:: Go to the :guilabel:`Connection Registry`.

      a. Locate the overview panel of the {+spw+} you want to modify
         and click :guilabel:`Manage`.

      #. In the sidebar, click :guilabel:`Connection Registry`.

   .. step:: Add a new connection.

      a. Click :guilabel:`+ Add connection`.
      
      #. Select a :guilabel:`GCP Pub/Sub` connection.  

      #. Provide a :guilabel:`Connection Name`. Each connection name must be unique 
         within a {+spw+}.  This is the name used to reference the connection in 
         {+atlas-sp+} :ref:`aggregations <atlas-sp-aggregation>`.

      #. Click the :guilabel:`Private Service Connect` button.

      #. Toggle :guilabel:`Enable Private Service Connect Networking`
	 on.
	 
      #. From the dropdown menu, select the private endpoint you created earlier.

      #. From the :guilabel:`GCP Service Account` dropdown, select the ID of the 
         unified access role you authorized in a prior step.

      #. Click :guilabel:`Add connection`.
