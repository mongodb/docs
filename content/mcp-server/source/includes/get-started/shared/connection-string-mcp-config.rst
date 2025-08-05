The MongoDB MCP server can connect to your MongoDB deployment for you.

However, if you do not want to expose your connection string to the
LLM's context, or if you want to persist the connection across sessions,
you can add your connection string to the configuration file.

Replace ``<connection-string>`` with your specific connection string in
the ``"args"`` section of the configuration file.

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Value
     - Description

   * - ``<connection-string>``
     - The connection string for your MongoDB deployment. Ensure the
       credentials in your connection string access only the data and
       operations you want the LLMs to use.

       To learn more, see :ref:`Find Your Connection String
       <find-connection-string>` and :ref:`Examples
       <connections-connection-examples>`.
