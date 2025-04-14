.. procedure:: 
   :style: normal 

   .. step:: Navigate to {+aws-bedrock+} management console. 

      a. Log in to the `AWS Console <https://aws.amazon.com/console/>`__.
      #. In the upper-left corner, click the :guilabel:`Services` dropdown menu.
      #. Click :guilabel:`Machine Learning`, and then select :guilabel:`{+aws-bedrock+}`.

   .. step:: Manage model access.

      {+aws-bedrock+} doesn't grant access to :abbr:`FMs (foundation models)` 
      automatically. If you haven't already,
      follow the steps to :aws:`add model access 
      </bedrock/latest/userguide/model-access.html>`
      for the **Titan Embeddings G1 - Text** and **Anthropic Claude V2.1** models.

   .. step:: Create the knowledge base.
      
      a. In the left navigation of the {+aws-bedrock+} console, 
         click :guilabel:`Knowledge Bases`.
      #. Click :guilabel:`Create` and then select :guilabel:`Knowledge base with vector store`.
      #. Specify ``mongodb-atlas-knowledge-base`` as the :guilabel:`Knowledge Base name`.
      #. Click :guilabel:`Next`.

      By default, {+aws-bedrock+} creates a new |iam| role to access
      the knowledge base.

   .. step:: Add a data source.

      a. Specify a name for the data source used by the knowledge base.
      #. Enter the |uri| for the |s3| bucket that contains your data source. 
         Or, click :guilabel:`Browse S3` and find the |s3| bucket 
         that contains your data source from the list.
      #. Click :guilabel:`Next`. 
      
         {+aws-bedrock+} displays available embeddings models that you can use to 
         convert your data source's text data into vector embeddings. 
         
      #. Select the :guilabel:`Titan Embeddings G1 - Text` model.

   .. step:: Connect |service| to the Knowledge Base.

      a. In the :guilabel:`Vector database` section, select :guilabel:`Choose a vector store you have created`.
      #. Select :guilabel:`MongoDB Atlas` and configure the following options:
         
         - For the :guilabel:`Hostname`, enter the |url| for your |service| {+cluster+}
           located in its :manual:`connection string
           </reference/connection-string/#find-your-mongodb-atlas-connection-string>`.
           The hostname uses the following format:

           .. code-block::

              <clusterName>.mongodb.net

         - For the :guilabel:`Database name`, enter ``bedrock_db``.
         - For the :guilabel:`Collection name`, enter ``test``.
         - For the :guilabel:`Credentials secret ARN`, enter the |arn| 
           for the secret that contains your |service| {+cluster+} credentials.
           To learn more, see :aws:`AWS Secrets Manager concepts </secretsmanager/latest/userguide/getting-started.html>`.

      #. In the :guilabel:`Metadata field mapping` section, configure the 
         following options to determine the search index and field names 
         that |service| uses to embed and store your data source:

         - For the :guilabel:`Vector search index name`, enter ``vector_index``.
         - For the :guilabel:`Vector embedding field path`, enter ``embedding``.
         - For the :guilabel:`Text field path`, enter ``bedrock_text_chunk``.
         - For the :guilabel:`Metadata field path`, enter ``bedrock_metadata``.

      #. If you :ref:`configured an endpoint service 
         <bedrock-configure-privatelink>`,
         enter your :guilabel:`PrivateLink Service Name`.

      #. Click :guilabel:`Next`. 

   .. step:: Review and create the knowledge base.

      After reviewing the details for your knowledge base, 
      click :guilabel:`Create knowledge base` to finalize your creation.

   .. step:: Sync the data source.
      
      After {+aws-bedrock+} creates the knowledge base, it prompts you 
      to sync your data. In the :guilabel:`Data source` section, 
      select your data source and click :guilabel:`Sync` to sync 
      the data from the |s3| bucket and load it into |service|.

      When the sync completes, you can view your vector embeddings 
      :ref:`in the {+atlas-ui+} <atlas-ui-view-collections>`
      by navigating to the ``bedrock_db.test`` collection in your {+cluster+}.
