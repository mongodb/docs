.. list-table::
   :header-rows: 1
   :widths: 20 10 60 10

   * - Option 
     - Type 
     - Description 
     - Required? 

   * - ``--apiKey`` 
     - string 
     - |api| key for `Opsgenie 
       <https://www.atlassian.com/software/opsgenie>`__.  
     - yes

   * - ``--output``, ``-o``
     - string 
     - .. include:: /includes/extracts/fact-basic-options-output.rst
     - no

   * - ``--profile``, ``-P``
     - string
     - .. include:: /includes/extracts/fact-basic-options-profile.rst
     - no

   * - ``--projectId``
     - string
     - .. include:: /includes/extracts/fact-basic-options-project-id.rst
     - no

   * - ``--region`` 
     - string 
     - |api| |url| region to use. Value can be one of the 
       following: 
 
       - ``EU`` for Europe
       - ``US`` for United States

       The default value is ``US``.
     - yes