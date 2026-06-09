.. procedure::
   :style: normal
      
   .. step:: Ensure that you add the following dependency to your project.
      
      .. list-table::
         :widths: 30 70 
      
         * - ``mongodb-driver-kotlin-coroutine``
           - 4.10.0 or higher version
      
   .. step:: Run a |fts| compound query that alters the score using the :ref:`scoring-constant` option.
      
      a. Create a file named ``CompoundConstantQuery.kt``.
      #. Copy and paste the following code into the file.
      
         The code example performs the following tasks:
      
         - Imports ``mongodb`` packages and dependencies.
         - Establishes a connection to your cluster.
         - Uses the following compound clauses to query the collection: 
      
           .. include:: /includes/query/score/facts/fts-compound-constant-desc.rst
      
         - .. include:: /includes/query/score/facts/fts-compound-highlight-desc.rst
      
         - Uses the following pipeline stages:
      
           .. include:: /includes/query/score/facts/fts-compound-score-stages.rst
      
         - Prints the documents that match the query from the ``AggregateFlow`` instance.
      
         .. literalinclude:: /includes/query/score/code-snippets/kotlin/compound-constant-query.kt
            :language: kotlin
            :linenos:
            :dedent:
            :emphasize-lines: 10
      
      #. .. include:: /includes/shared/facts/fact-fts-driver-connection-string.rst
      #. Run the ``CompoundConstantQuery.kt`` file.
      
         When you run the ``CompoundConstantQuery.kt`` program in your IDE, it prints
         the following documents:
               
         .. code-block:: none
            :copyable: false
      
            Document{{title=Snow in Paradise, year=2014, score=6.0, highlights=[Document{{score=1.382846713066101, path=title, texts=[Document{{value=Snow, type=hit}}, Document{{value= in Paradise, type=text}}]}}]}}
            Document{{title=Dead Snow 2: Red vs. Dead, year=2014, score=6.0, highlights=[Document{{score=1.3924485445022583, path=title, texts=[Document{{value=Dead , type=text}}, Document{{value=Snow, type=hit}}, Document{{value= 2: Red vs. , type=text}}]}}]}}
            Document{{title=The Snow White Murder Case, year=2014, score=6.0, highlights=[Document{{score=1.3525336980819702, path=title, texts=[Document{{value=The , type=text}}, Document{{value=Snow, type=hit}}, Document{{value= White Murder Case, type=text}}]}}]}}
            Document{{title=Snow on the Blades, year=2014, score=6.0, highlights=[Document{{score=1.3766303062438965, path=title, texts=[Document{{value=Snow, type=hit}}, Document{{value= on the Blades, type=text}}]}}]}}
            Document{{year=2013, title=The Secret Life of Walter Mitty, score=1.0, highlights=[]}}
            Document{{title=Jurassic World, year=2015, score=1.0, highlights=[]}}
            Document{{title=Action Jackson, year=2014, score=1.0, highlights=[]}}
            Document{{year=2013, title=In Secret, score=1.0, highlights=[]}}
            Document{{title=The Stanford Prison Experiment, year=2015, score=1.0, highlights=[]}}
            Document{{year=2014, title=The Giver, score=1.0, highlights=[]}}
      
         .. include:: /includes/query/score/facts/fts-compound-constant-score-desc.rst
      
   .. step:: Run |fts| compound queries that alter the score using the :ref:`scoring-boost` option.
      
      a. Create a file named ``CompoundBoostQuery.kt``.
      #. Copy and paste the following code into the file.
      
         The code example performs the following tasks:
      
         - Imports ``mongodb`` packages and dependencies.
         - Establishes a connection to your cluster.
         - Prints the documents that match the query from the ``AggregateFlow`` instance.
      
         .. tabs:: 
      
            .. tab:: Simple Example
               :tabid: simple
      
               The query uses the following pipeline stages:
      
               - :pipeline:`$search` stage to query the collection. The 
                 query:
      
                 - Uses the following ``compound`` operator clauses:
      
                   .. include:: /includes/query/score/facts/fts-compound-boost-desc.rst
      
                 .. include:: /includes/query/score/facts/fts-compound-highlight-desc.rst
           
               .. include:: /includes/query/score/facts/fts-compound-score-stages.rst
      
               .. literalinclude:: /includes/query/score/code-snippets/kotlin/compound-boost-query.kt
                  :language: kotlin
                  :linenos:
                  :dedent:
                  :emphasize-lines: 10
      
            .. tab:: Multiple Weights Example
               :tabid: multi
      
               This query uses the following ``compound`` operator clauses 
               with the ``boost`` option to prioritize some fields more 
               than other fields: 
            
               .. include:: /includes/query/score/facts/fts-compound-boost-advanced-desc.rst
       
               .. literalinclude:: /includes/query/score/code-snippets/kotlin/boost-multi-query.kt
                  :language: kotlin
                  :linenos:
                  :dedent:
                  :emphasize-lines: 11
      
      #. .. include:: /includes/shared/facts/fact-fts-driver-connection-string.rst
      #. Run the ``CompoundBoostQuery.kt`` file.
      
         .. tabs:: 
            :hidden:
      
            .. tab:: Simple Example
               :tabid: simple
      
               When you run the ``CompoundBoostQuery.kt`` program in your IDE, it prints
               the following documents:
                     
               .. code-block:: none
                  :copyable: false
      
                  Document{{title=Snow in Paradise, year=2014, score=6.784297466278076, highlights=[Document{{score=1.382846713066101, path=title, texts=[Document{{value=Snow, type=hit}}, Document{{value= in Paradise, type=text}}]}}]}}
                  Document{{title=Snow on the Blades, year=2014, score=6.073266506195068, highlights=[Document{{score=1.3766303062438965, path=title, texts=[Document{{value=Snow, type=hit}}, Document{{value= on the Blades, type=text}}]}}]}}
                  Document{{title=The Snow White Murder Case, year=2014, score=5.517906188964844, highlights=[Document{{score=1.3525336980819702, path=title, texts=[Document{{value=The , type=text}}, Document{{value=Snow, type=hit}}, Document{{value= White Murder Case, type=text}}]}}]}}
                  Document{{title=Dead Snow 2: Red vs. Dead, year=2014, score=5.072136878967285, highlights=[Document{{score=1.3924485445022583, path=title, texts=[Document{{value=Dead , type=text}}, Document{{value=Snow, type=hit}}, Document{{value= 2: Red vs. , type=text}}]}}]}}
                  Document{{year=2013, title=The Secret Life of Walter Mitty, score=1.0, highlights=[]}}
                  Document{{title=Jurassic World, year=2015, score=1.0, highlights=[]}}
                  Document{{title=Action Jackson, year=2014, score=1.0, highlights=[]}}
                  Document{{year=2013, title=In Secret, score=1.0, highlights=[]}}
                  Document{{title=The Stanford Prison Experiment, year=2015, score=1.0, highlights=[]}}
                  Document{{year=2014, title=The Giver, score=1.0, highlights=[]}}
      
               .. include:: /includes/query/score/facts/fts-compound-boost-score-desc.rst
      
            .. tab:: Multiple Weights Example
               :tabid: multi
      
               When you run the ``CompoundBoostQuery.kt`` program in your IDE, it prints
               the following documents:
                     
               .. code-block:: none
                  :copyable: false
      
                  Document{{year=2000, genres=[Adventure, Comedy, Family], title=Snow Day, score=20.998544692993164}}
                  Document{{genres=[Adventure, Comedy, Family], title=Snow Dogs, year=2002, score=20.998544692993164}}
                  Document{{year=1999, genres=[Comedy, Romance], title=Let It Snow, score=19.45327377319336}}
                  Document{{genres=[Action, Comedy, Horror], title=Dead Snow 2: Red vs. Dead, year=2014, score=17.361087799072266}}
                  Document{{genres=[Comedy, Drama], title=Snow White and Russian Red, year=2009, score=16.287294387817383}}
                  Document{{genres=[Comedy, Drama, Romance], title=The Tiger and the Snow, year=2005, score=15.475509643554688}}
                  Document{{genres=[Adventure, Comedy, Family], title=Snow White and the Three Stooges, year=1961, score=14.361087799072266}}
      
   .. step:: Run a |fts| compound query that alters the score using the :ref:`scoring-function` option.
      
      a. Create a file named ``CompoundFunctionQuery.kt``.
      #. Copy and paste the following code into the file.
      
         The code example performs the following tasks:
      
         - Imports ``mongodb`` packages and dependencies.
         - Establishes a connection to your cluster.
         - Uses the following pipeline stages to query the collection:
      
           .. include:: /includes/query/score/facts/fts-compound-function-desc.rst
      
         - Uses the following pipeline stages: 
           
           .. include:: /includes/query/score/facts/fts-compound-score-stages.rst
      
         - .. include:: /includes/query/score/facts/fts-compound-highlight-desc.rst
      
         - Prints the documents that match the query from the ``AggregateFlow`` instance.
      
         .. literalinclude:: /includes/query/score/code-snippets/kotlin/compound-function-query.kt
            :language: kotlin
            :linenos:
            :dedent:
            :emphasize-lines: 10
      
      #. .. include:: /includes/shared/facts/fact-fts-driver-connection-string.rst
      #. Run the ``CompoundFunctionQuery.kt`` file.
      
         When you run the ``CompoundFunctionQuery.kt`` program in your IDE, it prints
         the following documents:
               
         .. code-block:: none
            :copyable: false
      
            Document{{title=The Snow White Murder Case, year=2014, score=10.458952903747559, highlights=[Document{{score=1.3525336980819702, path=title, texts=[Document{{value=The , type=text}}, Document{{value=Snow, type=hit}}, Document{{value= White Murder Case, type=text}}]}}]}}
            Document{{title=Snow on the Blades, year=2014, score=10.336633682250977, highlights=[Document{{score=1.3766303062438965, path=title, texts=[Document{{value=Snow, type=hit}}, Document{{value= on the Blades, type=text}}]}}]}}
            Document{{title=Dead Snow 2: Red vs. Dead, year=2014, score=10.036067962646484, highlights=[Document{{score=1.3924485445022583, path=title, texts=[Document{{value=Dead , type=text}}, Document{{value=Snow, type=hit}}, Document{{value= 2: Red vs. , type=text}}]}}]}}
            Document{{title=Snow in Paradise, year=2014, score=8.392148971557617, highlights=[Document{{score=1.382846713066101, path=title, texts=[Document{{value=Snow, type=hit}}, Document{{value= in Paradise, type=text}}]}}]}}
            Document{{year=2013, title=The Secret Life of Walter Mitty, score=1.0, highlights=[]}}
            Document{{title=Jurassic World, year=2015, score=1.0, highlights=[]}}
            Document{{title=Action Jackson, year=2014, score=1.0, highlights=[]}}
            Document{{year=2013, title=In Secret, score=1.0, highlights=[]}}
            Document{{title=The Stanford Prison Experiment, year=2015, score=1.0, highlights=[]}}
            Document{{year=2014, title=The Giver, score=1.0, highlights=[]}}
      
      
         .. include:: /includes/query/score/facts/fts-compound-function-score-desc.rst
      
