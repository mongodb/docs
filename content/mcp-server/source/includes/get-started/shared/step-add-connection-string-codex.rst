.. step:: (Optional) Specify a cluster connection string.

   .. include:: /includes/get-started/shared/connection-string-mcp-config-codex.rst

   .. list-table::
      :widths: 30 70
      :header-rows: 1

      * - Value
        - Description

      * - ``<connection-string>``
        - The connection string for your MongoDB deployment. Ensure the
          credentials in your connection string access only the data and
          operations you want the LLMs to use.

          To learn more, see :ref:`Connection Strings <mongodb-uri>` in the 
          MongoDB Database Manual. 

   .. literalinclude:: /includes/get-started/shared/example-configs/mcp-config-codex-atlas-connection-string.toml
      :language: toml
      :emphasize-lines: 4