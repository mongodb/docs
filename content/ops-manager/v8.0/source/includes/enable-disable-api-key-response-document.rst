.. list-table::
   :widths: 10 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``createdAt``
     - timestamp
     - The time the API key was created.
       
   * - ``description``
     - string
     - Description of the API key.
       
   * - ``enabled``
     - boolean
     - Indicates whether the API key is enabled.
       
   * - ``id``
     - string
     - The unique identifier of the API key.
       
   * - ``obfuscatedKey``
     - string
     - The last twelve digits of the API key that you enabled or disabled.
       The remainder of the key is obfuscated for security.
       
   * - ``usedCount``
     - number
     - The number of times that the API key has been used by the
       associated user.
   
   * - ``userId``
     - string
     - The user ID associated with the request for a new API key.