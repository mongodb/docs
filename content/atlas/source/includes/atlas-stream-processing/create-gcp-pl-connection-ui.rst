.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-network-access.rst

   .. step:: Navigate to the {+atlas-sp+} private endpoint interface.

      a. Select the :guilabel:`Private Endpoint` tab

      #. Select the :guilabel:`{+atlas-sp+}` tab

	 If you have not created an {+atlas-sp+} private endpoint
	 previously, click :guilabel:`Create endpoint`. If you have,
	 click :guilabel:`Add ASP Endpoint`.

   .. step:: Select your cloud provider and vendor

      a. Set :guilabel:`Cloud Provider` to :guilabel:`GCP`.

      #. Set :guilabel:`Vendor` to :guilabel:`Confluent Cloud`.

      #. Click :guilabel:`Next, enter service details`

   .. step:: Provide your {+gcp+} storage endpoint region

      Your endpoint must be in the same region in which you
      intend to host the stream processors that use it.

      :red:`WARNING:` **GCP Project ID Error**: You must have a |service| 
      Cluster or Stream Processing workspace configured with |gcp| as your 
      cloud provider in the same region where you plan to create the 
      {+gcp+} Private Link Connection.

   .. step:: Copy your GCP project ID

      Confluent Cloud requires your {+gcp+} Project ID to obtain the details of
      the endpoint and create the connection to Confluent Cloud.

   .. step:: Create a Private Service Connect Access in Confluent Coud
    
      Follow the instructions on the official 
      `Confluent Cloud documentation <https://docs.confluent.io/cloud/current/networking/private-links/gcp-private-service-connect.html#add-a-private-service-connect-access-in-ccloud>`__ to obtain your project's Service Attachment URI(s)
      and DNS Domain.

   .. step:: Select your project type
      
      Select the type of your project cluster: 

      - Single-zone cluster
      - Multi-zone cluster
      - Serverless
    
   .. step:: Provide your Service Attachment URI(s)

      Enter the URI for the service attachments of your Confluent Cloud project. 
      
      If you selected the :guilabel:`Multi-zone cluster` option, provide the URIs
      for all the zones of your cluster.

      URIs must match the following structure: 
      
      .. code-block:: sh

         projects/*/regions/<region>/serviceAttachments/*
      
   .. step:: Provide the DNS Domain to your Confluent Cloud project

   .. step:: Click :guilabel:`Next, generate endpoint ID`

      After a few minutes of processing, you have successfully 
      created a private link to you {+gcp+} storage in Confluent Cloud with 
      the {+atlas-ui+}.
