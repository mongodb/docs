.. procedure:: 
   :style: normal

   .. include:: /includes/nav/steps-advanced.rst

      .. |ear-key-provider| replace:: :guilabel:`AWS KMS`

   .. include:: /includes/ear/steps-ear-pvt-endpoints-mgmnt-page.rst

   .. step:: Click :guilabel:`Create new endpoints`. 

   .. step:: Specify the regions where you want to create private endpoints. 

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