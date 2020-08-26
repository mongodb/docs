.. commandoption:: sample

   Samples the namespaces specified by the
   :option:`--db <mongodrdl --db>`, optional
   :option:`--collection <mongodrdl --collection>`, and other
   :ref:`command line options <mongodrdl-command-line-options>` to
   output a :ref:`.drdl <drdl>` file. The ``sample`` command
   encapsulates all the :binary:`~bin.mongodrdl` behavior prior to
   version 2.11.
   
   .. code-block:: sh
   
      mongodrdl sample --db <db-name> --collection <collection-name> --out <filename>.drdl
   

