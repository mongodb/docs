.. list-table::
   :widths: 15 15 70
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - id
     - string
     - Unique identifier of this Agent API Key.

   * - key
     - string
     - Agent API Key.

       .. note::

          After creating this Agent API Key, subsequent requests 
          return the last four characters of Agent API Keys.

   * - desc
     - string
     - Label for this Agent API Key.

   * - createdTime
     - number
     - |epoch-time| when the Agent API Key was created.

   * - createdUserId
     - string
     - Unique identifier of user who created this Agent API Key.

   * - createdIpAddr
     - string
     - |ipaddr| address that created this Agent API Key.

   * - createdBy
     - string
     - Means that created this Agent API Key. Accepted values are:

       - USER
       - OLD_KEY
       - PROVISIONING
       - ATLAS
       - SERVER_POOLS
       - PUBLIC_API
