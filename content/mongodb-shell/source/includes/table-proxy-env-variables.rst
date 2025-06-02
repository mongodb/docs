.. list-table::
   :header-rows: 1
   :widths: 20 35 45

   * - Variable
     - Description
     - Example

   * - ``MONGODB_PROXY``

     - Proxy connections to ``mongodb://`` and ``mongodb+srv://`` URLs, such 
       as database clusters.

     - The following example sets the ``MONGODB_PROXY`` environment variable to
       proxy all MongoDB connections through a CONNECT proxy located at 
       ``example.com:8080`` with TLS enabled.

       .. code-block:: sh 
          :copyable: false 
          
          export MONGODB_PROXY=https://example.com:8080

   * - ``HTTP_PROXY``

     - Proxy connections to ``http://`` URLs. HTTP connections are mostly 
       used for OIDC authentication. 
     
       If you also set ``HTTPS_PROXY``, the value of ``HTTPS_PROXY`` takes 
       precedence for all requests.

     - The following example sets the ``HTTP_PROXY`` environment variable to 
       proxy HTTP connections through a CONNECT proxy located at 
       ``example.com:8080``:

       .. code-block:: sh 
          :copyable: false 

          export HTTP_PROXY=http://example.com:8080 

   * - ``HTTPS_PROXY``

     - Proxy connections to ``https://`` URLs. HTTPS connections are mostly 
       used for OIDC authentication. 
     
       If you also set ``HTTP_PROXY``, the value of ``HTTPS_PROXY`` takes 
       precedence for all requests.

     - The following example sets the ``HTTPS_PROXY`` environment variable to 
       proxy all HTTPS connections through a CONNECT proxy located at 
       ``localhost:8080`` without TLS:

       .. code-block:: sh 
          :copyable: false 

          export HTTPS_PROXY=http://localhost:8080
       
   * - ``ALL_PROXY``

     - Proxy all connections to the specified URL.

     - The following example sets the ``ALL_PROXY`` environment variable to 
       proxy all outbound network connections through a Socks5 proxy located at 
       ``example.com:1234`` with credentials included in the URL: 

       .. code-block:: sh 
          :copyable: false 

          export ALL_PROXY=socks5://username:password@example.com:1234

   * - ``NO_PROXY``

     - Comma-separated list of hostnames that should be excluded from 
       proxying.

     - The following example sets the ``NO_PROXY`` environment variable to 
       bypass the proxy for connections to ``localhost`` and 
       ``internal-db.example.com``.

       .. code-block:: sh 
          :copyable: false 

          export NO_PROXY=localhost,internal-db.example.com 
