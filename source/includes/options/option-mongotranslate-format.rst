.. option:: --format

   *Default*: ``multiline``

   *Optional.* Valid options are ``none`` and ``multiline``. The
   default ``multiline`` option displays results in a more easily
   readable format.
   
   .. list-table::
      :header-rows: 1
      :widths: 30 30 40
   
      * - Command Type
        - Option
        - Description
   
      * - Without the :option:`--explain <mongotranslate --explain>` option 
        - ``--format none``
        - Returns an aggregation pipeline all on one line.
   
      * - Without the :option:`--explain <mongotranslate --explain>` option
        - ``--format multiline``
        - Returns an aggregation pipeline with one pipeline
          stage per line.
   
      * - With the :option:`--explain <mongotranslate --explain>` option 
        - ``--format none``
        - Returns all fields on one line.
   
      * - With the :option:`--explain <mongotranslate --explain>` option
        - ``--format multiline``
        - Returns one field per line, with additional formatting for
          arrays and object subfields.
   

