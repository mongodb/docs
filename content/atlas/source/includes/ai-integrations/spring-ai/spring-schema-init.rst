.. procedure::
   :style: normal

   .. step:: Enable schema initialization.
      
      When you configure |service| as the vector store in your
      application, Spring AI can initialize the backend schema automatically.
      This initialization includes creating a {+avs+} index on the collection
      that contains your vector embeddings.
      
      To enable schema initialization, add the following setting to your ``application.properties`` file:
      
      .. code-block::
         :caption: src/main/resources/application.properties

         spring.ai.vectorstore.mongodb.initialize-schema=true

      Specifying ``initialize-schema=true`` causes Spring AI to
      programmatically create a {+avs+} index on your {+cluster+}. To learn
      more, see :ref:`avs-create-index`.
