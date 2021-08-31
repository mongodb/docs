.. list-table::
   :widths: 20 14 66
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - groupId
     - string
     - Unique 24-hexadecimal digit string that represents the |service|
       project associated with the request to verify an |ldap| over
       |tls| configuration.

   * - links
     - object array
     - .. include:: /includes/api/links-explanation.rst

   * - request
     - object
     - Contains the details of the request to verify an |ldap| over
       |tls| configuration. |service| doesn't return the
       **bindPassword** in the response.

   * - request.bindUsername
     - string
     - User DN that |service| uses to connect to the |ldap| server.

   * - request.hostname
     - string
     - |fqdn| or IP address of the host that serves the |ldap|
       directory. This host must be visible to the internet or
       connected to your |service| cluster with :doc:`VPC Peering
       </security-vpc-peering>`.

   * - request.port
     - integer
     - Port on which the |ldap| server listens for client connections
       from |service|.

   * - requestId
     - string
     - Unique 24-hexadecimal digit string that represents the request
       to verify the |ldap| over |tls| configuration.

   * - status
     - string
     - Current phase of the |ldap| over |tls| configuration workflow
       returned at the time of the request. |service| returns one of
       the following values: **PENDING**, **SUCCESS**, and **FAIL**.

   * - validations
     - array
     - List of validation messages related to the verification of
       the provided |ldap| over |tls| configuration details. The
       array contains a document for each test that |service| runs.
       |service| stops running tests after the first failure.
       |service| returns one of the following values:

       |  **{** 
       |    **status: "OK" || "FAIL",**
       |    **validationType: "SERVER_SPECIFIED"**
       |  **}**
       |  **{** 
       |    **status: "OK" || "FAIL",**
       |    **validationType: "CONNECT"**
       |  **}**
       |  **{** 
       |    **status: "OK" || "FAIL",**
       |    **validationType: "AUTHENTICATE"**
       |  **}**
       |  **{**  
       |    **status: "OK" || "FAIL",**
       |    **validationType: "AUTHORIZATION_ENABLED"**
       |  **}**
       |  **{**
       |    **status: "OK" || "FAIL",**
       |    **validationType: "PARSE_AUTHZ_QUERY_TEMPLATE"**
       |  **}**
       |  **{**
       |    **status: "OK" || "FAIL",**
       |    **validationType: "QUERY_SERVER"**
       |  **}**
