.. procedure:: 
   :style: normal

   .. include:: /includes/nav/steps-advanced.rst

   .. step:: Go to the :guilabel:`Private Endpoints for` |ear-key-provider| page. 

      On the :guilabel:`Advanced` page, in the :guilabel:`Encryption at Rest
      using your Key Management` section, do the following steps:

      a. Expand :guilabel:`Network Settings` for your |ear-key-provider|
         if it's collapsed. 
      
      #. Toggle on the button next to :guilabel:`Require Private 
         Networking`.

      #. Click :guilabel:`Set up`.
         
         The :guilabel:`Set Up Private Networking for AWS` page displays. 

         .. |ear-key-provider| replace:: :guilabel:`AWS KMS`
  
   .. step:: Replicate your encryption key in each region. 

      a. Sign into your |aws| |kms| dashboard.
      #. In the {+atlas-ui+}, click :guilabel:`Copy` to save your customer master key ID.
      #. In your |aws| |kms| dashboard, replicate your key in all desired regions. 
         To learn more, see the :aws:`AWS documentation </kms/latest/developerguide/multi-region-keys-replicate.html#create-replica-keys>`.
      #. In the |service| UI, click :guilabel:`Continue`

   .. step:: Specify the |aws| regions where you want to create private endpoints. 

      a. Select the |aws| regions from the dropdown.
      #. Click :guilabel:`Continue`.

      |service| automatically creates private endpoints in these
      regions to allow you to connect by using private networking.

      |service| can take up
      to three minutes to reflect the current status of your private
      endpoint. The private endpoint can have one of the following
      statuses:   

      .. include:: /includes/list-tables/aws-pvt-endpoint-statuses.rst

   .. step:: Click :guilabel:`Done` to start using the private endpoints.