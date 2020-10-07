.. list-table::
   :header-rows: 1
   :widths: 20 10 60 10

   * - Option 
     - Type 
     - Description 
     - Required? 

   * - ``--apiKey`` 
     - string 
     - |api| key for `Datadog <https://www.datadoghq.com/>`__.  
     - yes

   * - ``--output``, ``-o``
     - string 
     - .. include:: /includes/extracts/fact-basic-options-output.rst
     - no

   * - ``--profile``, ``-P``
     - string
     - Name of the profile where the public and private 
       keys for the project are saved. If omitted, uses the 
       {+default-profile+}. To learn more about creating a 
       profile, see :ref:`mcli-configure`.
     - no

   * - ``--projectId``
     - string
     - Unique identifier of the project. If omitted, uses the 
       project ID in the profile or :ref:`environment variable 
       <mcli-env-var>`.
     - no

   * - ``--region`` 
     - string 
     - |api| |url| region to use. Value can be one of the 
       following: 
 
       - ``EU`` for Europe
       - ``US`` for United States

       The default value is ``US``.
     - yes
