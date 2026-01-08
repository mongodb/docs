.. _atlas-sp-gcp-confluent-private-link-add:

==================================================
GCP Confluent Private Link Connections
==================================================

To create a {+gcp+} Confluent Private Link connection to use in your
{+atlas-sp+} project:

.. procedure::
   :style: normal

   .. step:: Configure Confluent cluster.

      Call the ``streams/accountDetails`` endpoint to get your |service| 
      project's {+gcp+} project ID:

      .. code-block:: bash

         curl --location 'https://cloud.mongodb.com/api/atlas/v2/groups/<project_id>/streams/accountDetails?cloudProvider=gcp&regionName=<region>' \
         --header 'Accept: application/vnd.atlas.2024-11-13+json'

         {
            "cidrBlock": "192.168.123.0/21",
            "gcpProjectId": "f1a2b3c4d5e687a8a9b0c1d2e3f4a5b6",	    
            "vpcNetworkName": "nt-a1b2c3d4e5f6a7b8c9d0e1f2-xyz987ab",
            "cloudProvider": "gcp"
         }

      Note the value of ``gcpProjectId`` for a later step.
	 
   .. step:: Retrieve the Service Attachment URIs from Confluent.

      1. In your Confluent account, `provision a Google Cloud Private
         Service Connect network
         <https://docs.confluent.io/cloud/current/networking/private-links/gcp-private-service-connect.html>`__.

      #. Navigate to the :guilabel:`Ingress connections` tab for your
	 network.

      #. Note the value of :guilabel:`DNS domain`. You will need this
	 value for a later step.

      #. Click the :guilabel:`+ Private Service Connect Access`
	 button.

      #. Provide a name for the connection.

      #. In the :guilabel:`GCP Project ID` field, provide the
	 ``gcpProjectId`` which you noted in the ``getAccountDetails``
	 response.

      #. Under :guilabel:`Step 2`, Note the service attachment URIs
	 for a later step.

	 For multi-zone clusters, note all three URIs. For a
	 single-zone cluster, navigate to the :guilabel:`Cluster
	 settings` page for your cluster. Under :guilabel:`Cloud
	 details`, note the value of :guilabel:`Zones`. Note the value
	 of the service attachment URI belonging to that zone.

   .. step:: Click :guilabel:`Add`.

   .. step:: Request a connection to your cloud provider.

      .. list-table::
         :widths: 20 80
         :header-rows: 1

         * - Key
           - Value

         * - ``region``
           - Region of the Confluent cluster

         * - ``dnsDomain``
           - The DNS domain of your cluster's network.
             Eg: ``abcxyz12345.us-central1.gcp.confluent.cloud``

         * - ``gcpServiceAttachmentUris``
           - The service attachment URIs provided by Confluent during
	     Private Service Connect configuration
	     
             - Multi-Zone Clusters: Include the unique URI corresponding 
               to each Availability Zone where your cluster has Private Link enabled.
             - Single-AZ Clusters: Provide only the single URI for the 
               specific Availability Zone where your cluster is deployed.

      The following example illustrates a Multi-Zone cluster.
	       
      .. io-code-block:: 
         :copyable: true 

         .. input::

            curl --location 'https://cloud.mongodb.com/api/atlas/v2/groups/8358217d3abb5c76c3434648/streams/privateLinkConnections' \
            --digest \
            --user "slrntglrbn:933fb118-ac62-4991-db05-ee67a3481fde" \
            --header 'Content-Type: application/json' \
            --header 'Accept: application/vnd.atlas.2024-11-13+json' \
            --data '{ 
              "dnsDomain": "abcxyz12345.us-central1.gcp.confluent.cloud",
              "gcpServiceAttachmentUris: [
	        "projects/demo-proj/regions/us-central1/serviceAttachments/l-ipsum-service-attachment-us-central1-a",
                "projects/demo-proj/regions/us-central1/serviceAttachments/l-ipsum-service-attachment-us-central1-b",
                "projects/demo-proj/regions/us-central1/serviceAttachments/l-ipsum-service-attachment-us-central1-c"		
              ]
              "provider": "gcp",
              "region": "us-central1",	      
              "vendor": "CONFLUENT",	      
            }'


         .. output::

           {
	      "_id": "65f8a3b4c5d6e7f8a9b0c1d2",
              "dnsDomain": "abcxyz12345.us-central1.gcp.confluent.cloud",
              "gcpServiceAttachmentUris: [
	        "projects/demo-proj/regions/us-central1/serviceAttachments/l-ipsum-service-attachment-us-central1-a",
                "projects/demo-proj/regions/us-central1/serviceAttachments/l-ipsum-service-attachment-us-central1-b",
                "projects/demo-proj/regions/us-central1/serviceAttachments/l-ipsum-service-attachment-us-central1-c"		
              ]
              "provider": "gcp",
              "region": "us-central1",	      
              "vendor": "CONFLUENT",	      
            }
	    
   .. step:: Create the Atlas-side connection.

      .. include:: /includes/steps-create-sp-kafka-pl-atlas-side-connection.rst
