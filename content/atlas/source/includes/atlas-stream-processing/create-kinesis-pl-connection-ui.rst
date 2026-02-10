.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-network-access.rst

   .. step:: Navigate to the {+atlas-sp+} private endpoint interface.

      a. Select the :guilabel:`Private Endpoint` tab.

      #. Select the :guilabel:`{+atlas-sp+}` tab.

      #. If you have not created an {+atlas-sp+} private endpoint
         previously, click :guilabel:`Create endpoint`. If you have,
         click :guilabel:`Add ASP Endpoint`.

   .. step:: Select your cloud provider and vendor.

      a. Set :guilabel:`Cloud Provider` to :guilabel:`AWS`.

      #. Set :guilabel:`Vendor` to :guilabel:`Kinesis`.

      #. Click :guilabel:`Next, enter service details`

   .. step:: Provide your {+aws-kinesis+} endpoint region.

      Your endpoint must be in the same :ref:`region <aws-stream-processing-regions>` 
      in which you intend to host the stream processors that use it.

   .. step:: Set up Unified AWS Access.

      .. include:: /includes/atlas-stream-processing/unified-aws-access.rst

   .. include:: /includes/nav/steps-stream-processing.rst  

   .. step:: Go to the :guilabel:`Connection Registry`.  

      a. Locate the overview panel of the {+spw+} you want to modify and click :guilabel:`Manage`.  

      #. In the sidebar, click :guilabel:`Connection Registry`.  

   .. step:: Add a new connection.  

      a. Click :guilabel:`+ Add connection`.
      
      #. Select an :guilabel:`AWS Kinesis` connection.  

      #. Provide a :guilabel:`Connection Name`. Each connection name must be unique 
         within a {+spw+}.  This is the name used to reference the connection in 
         {+atlas-sp+} :ref:`aggregations <atlas-sp-aggregation>`.

      #. Click the :guilabel:`PrivateLink` button. From the dropdown menu, select 
         the private endpoint you created earlier.

      #. From the :guilabel:`AWS IAM Role ARN` dropdown, select the ARN of the 
         unified access role you authorized in a prior step.

      #. Click :guilabel:`Add connection`.    