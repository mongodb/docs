Define the Index for the |fts-field-type| Type 
----------------------------------------------

.. procedure::
   :style: normal

   .. step:: Retrieve your Service Account access token for the project. 

      Use your service account to generate an access token, which 
      authenticates your requests to the {+atlas-admin-api+}.
      To learn how to generate an access token, see 
      :ref:`example-api-request`.  

   .. step:: Make an |api| call.

      Replace the following values in the ``curl`` command below. This 
      command sends a ``POST`` request to your cluster to 
      create a |fts| index with the |fts-field-type| field type.

      - Replace {``ACCESS-TOKEN``} with the output from the preceding step
      - Replace {``groupId``} with the project ID of the project where 
        you want to create the |fts| index 
      - Replace {``clusterName``} with the name of the cluster where 
        you want to create the |fts| index

      .. literalinclude:: /includes/fts/field-types/geo/create_index_api.sh
         :language: shell
         :copyable: true
         :linenos:
