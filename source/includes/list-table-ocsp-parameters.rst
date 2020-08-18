.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Parameter
     - Description

   * - :parameter:`ocspEnabled`

     - Enables or disables the OCSP support.

   * - :parameter:`ocspStaplingRefreshPeriodSecs`

     - Specifies the number of seconds to wait before refreshing the
       stapled OCSP status response.

       .. include:: /includes/fact-4.4-stapling-refresh-rename.rst

       .. versionchanged:: 4.4.1

   * - :parameter:`tlsOCSPStaplingTimeoutSecs`
   
     - Specifies the maximum number of seconds the
       :binary:`~bin.mongod`/:binary:`~bin.mongos` instance should
       wait to receive the OCSP status response for its certificates.

   * - :parameter:`tlsOCSPVerifyTimeoutSecs`
   
     - Specifies the maximum number of seconds that the
       :binary:`~bin.mongod`/:binary:`~bin.mongos` should wait for
       the OCSP response when verifying client certificates.
