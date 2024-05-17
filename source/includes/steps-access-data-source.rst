.. include:: /includes/nav/steps-data-sources.rst

.. step:: In the :guilabel:`Deployment` dropdown, select the deployment that contains your data source.

   .. include:: /includes/deployment-description.rst

   After you select a deployment, the following
   information appears:
      
   .. list-table::
      :header-rows: 1
      :widths: 38 72

      * - Field
        - Description

      * - :guilabel:`Deployment Name`
        - Human-readable label that identifies the deployment in 
          |service|.
     
      * - :guilabel:`Deployment Connection Status`
        - Label that indicates whether you connected the 
          deployment to |charts|.

      * - :guilabel:`Type`
        - Label that identifies the deployment as a replica set, 
          {+serverless-instance+}, or {+fdi+}.

      * - :guilabel:`Status`
        - Label that indicates the current operating
          condition of the deployment.

      * - :guilabel:`Version`
        - Label that indicates the MongoDB
          version on which the deployment runs. |charts-short| doesn't
          display :guilabel:`Version` for {+fdis+}.

      * - :guilabel:`Region`
        - Label that indicates the cloud provider and region where
          MongoDB provisions the deployment. |charts-short| doesn't
          display :guilabel:`Region` for {+serverless-instances+}.

      * - :guilabel:`Tier`
        - Label that indicates the |service| :ref:`{+cluster+} tier
          <create-cluster-instance>` for 
          the deployment. |charts-short| doesn't display
          :guilabel:`Tier` for {+fdis+} and {+serverless-instances+}.
