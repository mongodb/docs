a. Connect to the |service| {+cluster+} using {+mongosh+}.

   Open {+mongosh+} in a terminal window and connect to your |service|
   {+cluster+}. For detailed instructions on connecting, see
   :ref:`Connect via mongosh <connect-mongo-shell>`.

#. Switch to the database that contains the collection for which you want to create the index. 

   .. example:: 

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: shell
              
            use sample_mflix 

         .. output:: 
            :language: shell 

            switched to db sample_mflix

#. Run the :method:`db.collection.createSearchIndex()` method.

   .. literalinclude:: /includes/avs/index-management/create-index/basic-example-mongosh.sh  
      :language: shell
      :copyable: true 
      :linenos:

   .. include:: /includes/avs/tutorial/avs-quick-start-basic-index-description.rst
