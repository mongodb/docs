.. only:: onprem

   This endpoint retrieves the API keys for a specific |mms| user. You 
   must be one of the following users to successfully call this 
   endpoint:

   * The |mms| user specified in the digest authentication 

   * The |mms| user with the :authrole:`GLOBAL_OWNER` role

.. only:: cloud

   This endpoint creates an API key for a specific |mms| user. You must
   be the |mms| user specified in the digest authentication to 
   successfully use this endpoint.

.. note::

   You must have access to an a public API key generated from the GUI by your
   administrator before you can successfully user this endpoint.  See 
   :ref:`generate-public-api-key` for instructions.