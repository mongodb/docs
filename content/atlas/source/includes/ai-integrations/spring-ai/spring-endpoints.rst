.. procedure::
   :style: normal

   .. step:: Add import statements.
      
      Paste the following code into the ``Controller.java`` file to
      import the necessary classes:
      
      .. code-block:: java
         :caption: /controller/Controller.java
         
         import org.springframework.ai.document.Document;
         import org.springframework.ai.vectorstore.VectorStore;
         import org.springframework.ai.vectorstore.SearchRequest;
         import org.springframework.beans.factory.annotation.Autowired;
         import org.springframework.web.bind.annotation.*;
         
         import java.util.List;
         import java.util.Map;
         import java.util.stream.Collectors;

   .. step:: Create the controller.
      
      Paste the following code to perform the following tasks:

      - Annotate the ``Controller`` class to mark it as the application
        controller.

      - Create a mapping to map requests to the ``/tutorial`` path.
    
      - Autowire the ``VectorStore`` bean.
      
      .. code-block:: java
         :caption: /controller/Controller.java

         @RestController
         @RequestMapping("/tutorial")
         public class Controller {
             @Autowired
             private VectorStore vectorStore;
             
             // Add endpoints here...
         }

   .. step:: Create an endpoint to add documents to the vector store.
      
      Paste the following code into your controller to create a ``GET``
      endpoint that creates sample documents and saves them to your vector store as vector embeddings:

      .. code-block:: java
         :caption: /controller/Controller.java

         @GetMapping("/add")
         public String addDocuments() {
             List<Document> docs = List.of(
                     new Document("Proper tuber planting involves site selection, proper timing, and exceptional care. Choose spots with well-drained soil and adequate sun exposure. Tubers are generally planted in spring, but depending on the plant, timing varies. Always plant with the eyes facing upward at a depth two to three times the tuber's height. Ensure 4 inch spacing between small tubers, expand to 12 inches for large ones. Adequate moisture is needed, yet do not overwater. Mulching can help preserve moisture and prevent weed growth.", Map.of("author", "A", "type","post")),
                     new Document("Successful oil painting necessitates patience, proper equipment, and technique. Begin with a carefully prepared, primed canvas. Sketch your composition lightly before applying paint. Use high-quality brushes and oils to create vibrant, long-lasting artworks. Remember to paint 'fat over lean,' meaning each subsequent layer should contain more oil to prevent cracking. Allow each layer to dry before applying another. Clean your brushes often and avoid solvents that might damage them. Finally, always work in a well-ventilated space.", Map.of("author", "A")),
                     new Document("For a natural lawn, selection of the right grass type suitable for your climate is crucial. Balanced watering, generally 1 to 1.5 inches per week, is important; overwatering invites disease. Opt for organic fertilizers over synthetic versions to provide necessary nutrients and improve soil structure. Regular lawn aeration helps root growth and prevents soil compaction. Practice natural pest control and consider overseeding to maintain a dense sward, which naturally combats weeds and pest.", Map.of("author", "B", "type","post"))
             );
     
             vectorStore.add(docs);
             return "Documents added successfully!\n";
         }

   .. step:: Create an endpoint to perform a semantic search.
      
      Paste the following code into your controller to create a ``GET``
      endpoint that performs a semantic search query for the phrase ``"learn how to grow things"`` and
      returns the two most relevant results:

      .. code-block:: java
         :linenos:
         :caption: /controller/Controller.java

         @GetMapping("/search")
         public List<Map<String, Object>> searchDocuments() {
     
             List<Document> results = vectorStore.similaritySearch(
                     SearchRequest
                             .query("learn how to grow things")
                             .withTopK(2)
             );
     
             return results.stream().map(doc -> Map.of(
                     "content", doc.getContent(),
                     "metadata", doc.getMetadata()
             )).collect(Collectors.toList());
         }

   .. step:: (Optional) Perform a semantic search with metadata filtering.

      To perform a search with metadata filtering, you can use the
      ``Filter.Expression`` builder class from the Java Sync driver.
      
      You can use an :abbr:`MQL (MongoDB Query Language)`
      match expression to pre-filter for documents. This example filters
      for documents in which the value of the ``author`` field is
      ``"A"``. Then, it performs a semantic search query for the phrase
      ``"learn how to grow things"``.

      In the body of the ``searchDocuments()`` method defined in the
      preceding step, replace the code that calls the
      ``similaritySearch()`` method (lines 4-8
      in the preceding block) with the following code:

      .. code-block:: java
         :caption: /controller/Controller.java

         FilterExpressionBuilder b = new FilterExpressionBuilder();

         List<Document> results = vectorStore.similaritySearch(
                 SearchRequest.defaults()
                         .withQuery("learn how to grow things")
                         .withTopK(2)
                         .withSimilarityThreshold(0.5)
                         .withFilterExpression(b.eq("author", "A").build())
         );

      .. note::

         You must add the path for your metadata field to your {+avs+}
         index. See the :ref:`avs-types-filter` section of the How to
         Index Fields for Vector Search tutorial to learn more.

      To learn more about metadata pre-filtering, see 
      :ref:`vectorSearch-agg-pipeline-filter`.
