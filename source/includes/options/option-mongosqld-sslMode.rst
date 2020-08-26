.. option:: --sslMode <mode>

   *Default*: disabled

   .. versionadded:: 2.3
   
   Enable or disable :abbr:`TLS (Transport Level Security)`/:abbr:`SSL
   (Secure Sockets Layer)` for connections to :doc:`mongosqld
   </reference/mongosqld>`. The argument to the ``sslMode`` option can
   be one of the following:
   
   .. list-table::
      :header-rows: 1
      :widths: 20 40
   
      * - Value
   
        - Description
   
      * - ``disabled``
   
        - :doc:`mongosqld </reference/mongosqld>` cannot accept
          connections secured using TLS/SSL.
   
      * - ``allowSSL``
   
        - :doc:`mongosqld </reference/mongosqld>` can accept connections
          secured using TLS/SSL.
   
      * - ``requireSSL``
   
        - :doc:`mongosqld </reference/mongosqld>` can only accept
          connections secured using TLS/SSL.
   

