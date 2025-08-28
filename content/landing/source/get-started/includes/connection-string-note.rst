.. important:: 

   Replace the ``<connection string URI>`` placeholder with
   the :manual:`connection string
   </reference/connection-string/>` for your cluster. For
   example, to connect to a deployment running on the default
   localhost port 27017, use the following connection string:

   .. code-block:: none

      "mongodb://127.0.0.1:27017/myTestDb"

   You can find your connection string in the MongoDB CLI by
   running the following command in your shell:

   .. code-block:: bash

      atlas clusters connectionStrings describe myTestDb