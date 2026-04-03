.. list-table::
   :header-rows: 1
   :widths: 20 40

   * - Value

     - Description

   * - ``allowSSL``

     - Connections between servers do not use |tls|. For incoming
       connections, the server accepts both |tls| and
       non-TLS.

   * - ``preferSSL``

     - Connections between servers use |tls|. For incoming
       connections, the server accepts both |tls| and
       non-TLS.

   * - ``requireSSL``

     - The server uses and accepts only |tls| encrypted connections.
