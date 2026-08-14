Add an AWS Lambda Private Link Connection through the {+atlas-ui+}
------------------------------------------------------------------

To add an {+aws+} Lambda Private Link connection to your {+spw+}
through the {+atlas-ui+}, follow these steps:

.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-network-access.rst

   .. step:: Navigate to the {+atlas-sp+} private endpoint interface.

      a. In the sidebar, click :guilabel:`Private Endpoint`.

      #. Click the :guilabel:`{+atlas-sp+}` tab.

	 If you have not created an {+atlas-sp+} private endpoint
	 previously, click :guilabel:`Create endpoint`. If you have,
	 click :guilabel:`Add ASP Endpoint`.

   .. step:: Select your cloud provider and vendor.

      a. Set :guilabel:`Cloud Provider` to :guilabel:`AWS`.

      #. Set :guilabel:`Vendor` to :guilabel:`Lambda`.

      #. Click :guilabel:`Next, enter service details`

   .. step:: Provide your {+aws+} Lambda endpoint region.

      Your endpoint must be in the same region in which you
      intend to host the stream processors that use it.

   .. step:: Set up Unified AWS Access.

      Follow the procedure described in `Set Up Unified AWS
      Access
      <https://docs.mongodb.com/atlas/security/set-up-unified-aws-access/?interface=atlas-ui>`__.

      Note the ARN value in ``Statement.Principal.AWS`` to use
      later in this procedure.

   .. include:: /includes/nav/steps-project-access-manager

   .. include:: /includes/nav/steps-stream-processing.rst  

   .. step:: Go to the :guilabel:`Connection Registry`.  

      a. Locate the overview panel of the {+spw+} you want to  
	 modify and click :guilabel:`Configure`.  

      #. Select the :guilabel:`Connection Registry` tab.  

   .. step:: Click :guilabel:`+ Add connection`.  

   .. step:: Add a new connection.  

      a. Select an :guilabel:`AWS Lambda` connection.  

      #. Provide a :guilabel:`Connection Name`. Each connection
	 name must be unique within a {+spw+}. This is the name
	 used to reference the connection in {+atlas-sp+}
	 :ref:`aggregations <atlas-sp-aggregation>`.

      #. Click the :guilabel:`PrivateLink` button. Then, toggle
	 :guilabel:`Enable PrivateLink networking`.

	 From the dropdown menu, select the private endpoint you
	 created earlier.

      #. From the :guilabel:`AWS IAM Role ARN` dropdown, select
	 the ARN of the unified access role you authorized in a
	 prior step.

      #. Click :guilabel:`Add connection`.
