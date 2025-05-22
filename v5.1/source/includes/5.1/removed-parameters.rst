MongoDB 5.1 removes the following server parameters:

.. list-table::
    :header-rows: 1
    :widths: 25 75

    * - Removed Parameters
      - Description

    * - :option:`--tlsFIPSMode <mongod --tlsFIPSMode>`
      - This option is removed from the MongoDB Community Edition. It
        is available in MongoDB Enterprise edition.

        FIPS was not a supported feature in MongoDB Community Edition.
        If your installation made use of FIPS anyway, you will need to
        :doc:`reconfigure your TLS/SSL connections </tutorial/configure-ssl>`
        before upgrading. 


