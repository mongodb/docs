.. list-table::
   :widths: 25 10 65
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``{PUBLIC-KEY}``
     - string
     - Public API key for your |api| credentials.

   * - ``{PRIVATE-KEY}``
     - string
     - :ref:`Private API Key <mms-prog-api-key>` for your |api|
       credentials.

   * -
       .. cond:: cloud

          ``{+cloudmgr-url+}``

       .. cond:: onprem

          ``{+opsmgr-url+}``

     - string
     - |url| of your |mms| instance.

   * - ``{OPS-MANAGER-VERSION}``
     - string
     - Major and minor version of your |onprem| instance.

       .. example::

          ``4.2``
