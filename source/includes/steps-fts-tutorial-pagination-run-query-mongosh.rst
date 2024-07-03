.. procedure:: 
   :style: normal 

   .. step:: Connect to your cluster in {+mongosh+}.

      Open {+mongosh+} in a terminal window and connect to your
      {+cluster+}. For detailed instructions on  connecting, see
      :ref:`Connect via mongosh <connect-mongo-shell>`.

   .. step:: Switch to the ``sample_mflix`` database. 

      .. io-code-block::
         :copyable: true
      
         .. input::
            :language: shell

            use sample_mflix
      
         .. output:: 
            :language: shell
      
            switched to db sample_mflix

   .. step:: Copy, paste, and run the queries. 
