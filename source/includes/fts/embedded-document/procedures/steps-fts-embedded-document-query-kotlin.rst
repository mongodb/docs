.. procedure:: 
   :style: normal

   .. step:: Ensure that you add the following dependency to your project.

      .. list-table::
         :widths: 30 70 

         * - ``mongodb-driver-kotlin-coroutine``
           - 4.10.0 or higher version

   .. step:: Create files named ``BasicEmbeddedDocumentsSearch.kt``, ``ComplexEmbeddedDocumentQuery.kt``, and ``NestedEmbeddedDocumentsSearch.kt``.

   .. step:: Copy and paste the code for the |fts| query into the respective file.
 
      To learn more about these queries, see :ref:`embedded-documents-tutorial-queries`. 

      .. tabs:: 

         .. tab:: Nested Array  
            :tabid: basic

            To learn more about this query, see :ref:`embedded-documents-tutorial-queries`.

            .. literalinclude:: /includes/fts/embedded-document/basic-query.kt
               :language: kotlin
               :linenos:
               :dedent:
               :emphasize-lines: 10

            .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

         .. tab:: Nested Array Within Object 
            :tabid: complex

            To learn more about this query, see :ref:`embedded-documents-tutorial-queries`.

            .. literalinclude:: /includes/fts/embedded-document/complex-nested-array.kt
               :language: kotlin
               :linenos:
               :dedent:
               :emphasize-lines: 10

            .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

         .. tab:: Nested Array Within Array 
            :tabid: advanced

            To learn more about this query, see :ref:`embedded-documents-tutorial-queries`.

            .. literalinclude:: /includes/fts/embedded-document/nested-array-query.kt 
               :language: kotlin
               :linenos:
               :dedent:
               :emphasize-lines: 10

            .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

   .. step:: Run each Kotlin file.

      .. tabs:: 
         :hidden: true

         .. tab:: Nested Array  
            :tabid: basic

            When you run the ``BasicEmbeddedDocumentsSearch.kt`` program in your IDE, it prints
            the following documents:
            
            .. code-block:: none
               :copyable: false
               
               Document{{teachers=[Document{{first=Jane, last=Earwhacker, classes=[Document{{subject=art, grade=9th}}, Document{{subject=science, grade=12th}}]}}, Document{{first=John, last=Smith, classes=[Document{{subject=math, grade=12th}}, Document{{subject=art, grade=10th}}]}}], score=0.7830756902694702, highlights=[Document{{score=1.4921371936798096, path=teachers.last, texts=[Document{{value=Smith, type=hit}}]}}]}}
               Document{{teachers=[Document{{first=Jane, last=Smith, classes=[Document{{subject=science, grade=9th}}, Document{{subject=math, grade=12th}}]}}, Document{{first=John, last=Redman, classes=[Document{{subject=art, grade=12th}}]}}], score=0.468008816242218, highlights=[Document{{score=1.4702850580215454, path=teachers.last, texts=[Document{{value=Smith, type=hit}}]}}]}}

            .. include:: /includes/fts/extracts/fts-embedded-document-basic-query-results.rst

         .. tab:: Nested Array Within Object
            :tabid: complex

            When you run the ``ComplexEmbeddedDocumentQuery.kt`` program in your IDE, it prints
            the following documents:
            
            .. code-block:: none
               :copyable: false
               
               Document{{_id=2, name=Lincoln High, clubs=Document{{sports=[Document{{club_name=dodgeball, description=provides students an opportunity to play dodgeball by throwing balls to eliminate the members of the opposing team while avoiding being hit themselves.}}, Document{{club_name=martial arts, description=provides students an opportunity to learn self-defense or combat that utilize physical skill and coordination without weapons.}}]}}, score=0.633669912815094}}
               Document{{_id=1, name=Evergreen High, clubs=Document{{sports=[Document{{club_name=archery, description=provides students an opportunity to practice and hone the skill of using a bow to shoot arrows in a fun and safe environment.}}, Document{{club_name=ultimate frisbee, description=provides students an opportunity to play frisbee and learn the basics of holding the disc and complete passes.}}]}}, score=0.481589138507843}}

            .. include:: /includes/fts/extracts/fts-embedded-document-complex-query-results.rst

         .. tab:: Nested Array Within Array 
            :tabid: advanced 

            When you run the ``NestedEmbeddedDocumentsSearch.kt`` program in your IDE, it prints
            the following documents:
            
            .. code-block:: none
               :copyable: false
               
               Document{{teachers=[Document{{first=Jane, last=Smith, classes=[Document{{subject=art of science, grade=12th}}, Document{{subject=applied science and practical science, grade=9th}}, Document{{subject=remedial math, grade=12th}}, Document{{subject=science, grade=10th}}]}}, Document{{first=Bob, last=Green, classes=[Document{{subject=science of art, grade=11th}}, Document{{subject=art art art, grade=10th}}]}}], score=0.9415585994720459, highlights=[Document{{score=0.7354040145874023, path=teachers.classes.subject, texts=[Document{{value=art of , type=text}}, Document{{value=science, type=hit}}]}}, Document{{score=0.7871346473693848, path=teachers.classes.subject, texts=[Document{{value=applied , type=text}}, Document{{value=science, type=hit}}, Document{{value= and practical , type=text}}, Document{{value=science, type=hit}}]}}, Document{{score=0.7581484317779541, path=teachers.classes.subject, texts=[Document{{value=science, type=hit}}]}}, Document{{score=0.7189631462097168, path=teachers.classes.subject, texts=[Document{{value=science, type=hit}}, Document{{value= of art, type=text}}]}}]}}
               Document{{teachers=[Document{{first=Jane, last=Earwhacker, classes=[Document{{subject=art, grade=9th}}, Document{{subject=science, grade=12th}}]}}, Document{{first=John, last=Smith, classes=[Document{{subject=math, grade=12th}}, Document{{subject=art, grade=10th}}]}}], score=0.7779859304428101, highlights=[Document{{score=1.502043604850769, path=teachers.classes.subject, texts=[Document{{value=science, type=hit}}]}}]}}

            .. include:: /includes/fts/extracts/fts-embedded-document-advanced-query-results.rst
