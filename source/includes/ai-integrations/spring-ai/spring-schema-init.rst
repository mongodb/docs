.. procedure::
   :style: normal

   .. step:: Enable schema initialization.
      
      When you configure |service| as the vector store in your
      application, Spring AI can initialize the backend schema automatically.
      This initialization includes creating an {+avs+} index on the collection
      that contains your vector embeddings. You can enable schema initialization
      by adding the following setting to your ``application.properties`` file:
      
      .. code-block:: none
      
         spring.ai.vectorstore.mongodb.initialize-schema=true

      Specifying ``initialize-schema=true`` causes Spring AI to
      programmatically create an {+avs+} index on your {+cluster+}.
      Because of this, you must connect your application to a
      {+dedicated-cluster+}. If you're running a free or shared tier {+cluster+},
      you must separately create the index through the {+atlas-ui+},
      {+atlas-admin-api+}, or {+atlas-cli+}.

      To learn more, see :ref:`avs-create-index`.
