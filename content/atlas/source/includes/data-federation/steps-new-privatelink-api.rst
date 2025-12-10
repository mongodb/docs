To configure or edit a private endpoint from the API, send a ``POST`` request with the
      private endpoint ID to the ``privateNetworkSettings`` endpoint. 

      The request has the following behavior:

      - If the endpoint ID already exists and there is no change to 
        the comment associated with the endpoint, |service| makes no change 
        to the endpoint ID list.
      - If the endpoint ID already exists and there is a change to the 
        associated comment, |service| updates the ``comment`` value only in 
        the endpoint ID list.
      - If the endpoint ID doesn't exist, |service| appends the new endpoint 
        to the list of endpoints in the endpoint ID list.

      To learn more about the syntax and options, see :oas-bump-atlas-op:`API 
      <createdatafederationprivateendpoint>`.