.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-network-access.rst

   .. step:: Navigate to the {+atlas-sp+} private endpoint interface.

      a. Select the :guilabel:`Private Endpoint` tab.

      #. Select the :guilabel:`{+atlas-sp+}` tab.

	 If you have not created an {+atlas-sp+} private endpoint
	 previously, click :guilabel:`Create endpoint`. If you have,
	 click :guilabel:`Add ASP Endpoint`.

   .. step:: Select your cloud provider and vendor.

      a. Set :guilabel:`Cloud Provider` to :guilabel:`Azure`.

      #. Set :guilabel:`Vendor` to :guilabel:`EventHub`.

      #. Click :guilabel:`Next, enter service details`

   .. step:: Provide your AWS |s3| endpoint region.

      Your endpoint must be in the same region in which you
      intend to host the stream processors that use it.

   .. step:: Set up Unified AWS Access.

      Follow the procedure described in `Set Up Unified AWS
      Access
      <https://docs.mongodb.com/atlas/security/set-up-unified-aws-access/?interface=atlas-ui>`__.

      Ensure that you grant your IAM role ``ListAllMyBuckets`` and
      ``PutObject`` permissions.

      Note the ARN value in ``Statement.Principal.AWS`` to use
      later in this procedure.

   .. include:: /includes/nav/steps-project-access-manager

   .. step:: Create an API key.

      The :oas-bump-atlas-op:`Create One Connection
      <createGroupStreamConnection>` API endpoint
      requires digest authorization when creating an S3 Connection. To
      support this, you must create an API Key.

      a. In the :guilabel:`Project Access Manager`, select the
	 :guilabel:`Applications` tab, then click :guilabel:`API Keys`.

      b. Click :guilabel:`Create API Key`. Provide a short description
	 for the key.

      c. In the :guilabel:`Project Permissions` dropdown menu,
	 select both the :guilabel:`Project Stream Processing Owner` and
	 :guilabel:`Project Owner` roles. Click :guilabel:`Next`.

      d. Save both the public and private keys to use later in this procedure.

   .. include:: /includes/nav/steps-stream-processing.rst  

   .. step:: Go to the :guilabel:`Connection Registry`.  

      a. Locate the overview panel of the {+spw+} you want to  
	 modify and click :guilabel:`Configure`.  

      #. Select the :guilabel:`Connection Registry` tab.  

   .. step:: Click :guilabel:`+ Add connection`.  

   .. step:: Add a new connection.  

      a. Select an :guilabel:`S3` connection.  

      #. Provide a :guilabel:`Connection Name`. Each connection
	 name must be unique within a {+spw+}.  This is the name
	 used to reference the connection in {+atlas-sp+}
	 :ref:`aggregations <atlas-sp-aggregation>`.

      #. Click the :guilabel:`PrivateLink` button. From the
	 dropdown menu, select the private endpoint you created
	 earlier.

      #. From the :guilabel:`AWS IAM Role ARN` drodpwon, select
	 the ARN of the unified access role you authorized in a
	 prior step.

      #. Click :guilabel:`Add connection`.
