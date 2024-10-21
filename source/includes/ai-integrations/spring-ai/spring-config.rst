.. procedure::
   :style: normal

   .. step:: Add import statements.
      
      Paste the following code into the ``Config.java`` file to
      import the necessary classes:
      
      .. code-block:: java
         :caption: /config/Config.java
                  
         import org.springframework.ai.embedding.EmbeddingModel;
         import org.springframework.ai.openai.OpenAiEmbeddingModel;
         import org.springframework.ai.openai.api.OpenAiApi;
         import org.springframework.ai.vectorstore.MongoDBAtlasVectorStore;
         import org.springframework.ai.vectorstore.VectorStore;
         import org.springframework.beans.factory.annotation.Value;
         import org.springframework.boot.SpringBootConfiguration;
         import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
         import org.springframework.context.annotation.Bean;
         import org.springframework.context.annotation.Configuration;
         import org.springframework.data.mongodb.core.MongoTemplate;
         
   .. step:: Reference application properties.
      
      Paste the following code into the ``Config.java`` file to
      reference the values that you set in your application properties file:
      
      .. code-block:: java
         :caption: /config/Config.java
      
         @Configuration
         @SpringBootConfiguration
         @EnableAutoConfiguration
         public class Config {
         
             @Value("${spring.ai.openai.api-key}")
             private String openAiKey;
         
             @Value("${spring.data.mongodb.database}")
             private String databaseName;
         
             @Value("${spring.ai.vectorstore.mongodb.collection-name:vector_store}")
             private String collectionName;
         
             @Value("${spring.ai.vectorstore.mongodb.indexName:vector_index}")
             private String indexName;
         
             @Value("${spring.data.mongodb.uri}")
             private String mongoUri;

             @Value("${spring.ai.vectorstore.mongodb.initialize-schema}")
             private Boolean initSchema;

             // Add beans here...

         }

   .. step:: Create the ``EmbeddingModel`` Spring bean.
      
      Next, paste the following code to generate the ``OpenAiEmbeddingModel`` instance
      that uses the OpenAI API to create vector embeddings:

      .. code-block:: java
         :caption: /config/Config.java
         
         @Bean
         public EmbeddingModel embeddingModel() {
             return new OpenAiEmbeddingModel(new OpenAiApi(openAiKey));
         }

   .. step:: Create the ``VectorStore`` Spring bean.

      .. _spring-ai-vectorstore-bean:
      
      Finally, paste the following code to create bean that returns a
      ``VectorStore`` instance. The ``VectorStore`` instance uses the
      ``MongoTemplate`` that corresponds to your deployment and the
      ``OpenAiEmbeddingModel`` created in the preceding step.

      .. code-block:: java
         :caption: /config/Config.java

         @Bean
         public VectorStore mongodbVectorStore(MongoTemplate mongoTemplate, EmbeddingModel embeddingModel) {
             return new MongoDBAtlasVectorStore(mongoTemplate, embeddingModel,
                     MongoDBAtlasVectorStore.MongoDBVectorStoreConfig.builder().build(), initSchema);
         }
