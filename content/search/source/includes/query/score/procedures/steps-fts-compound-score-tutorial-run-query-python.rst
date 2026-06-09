.. procedure::
   :style: normal
      
      
   .. step:: Run a |fts| compound query that alters the score using the :ref:`scoring-constant` option.
      
      a. Create a file named ``compound-constant-query.py``. 
      #. Copy and paste the code example into the ``compound-constant.py`` 
         file.
      
         The following code example:
      
         - Imports ``pymongo``, MongoDB's Python driver, and the ``dns``
           module, which is required to connect ``pymongo`` to ``Atlas`` 
           using a |dns| seed list connection string. 
      
         - Creates an instance of the ``MongoClient`` class to establish a 
           connection to your cluster.
      
         - Uses the following compound clauses to query the collection: 
      
           .. include:: /includes/query/score/facts/fts-compound-constant-desc.rst
      
         - .. include:: /includes/query/score/facts/fts-compound-highlight-desc.rst
      
         - Uses the following pipeline stages:
      
           .. include:: /includes/query/score/facts/fts-compound-score-stages.rst
      
         - Iterates over the cursor to print the documents that match the 
           query.
      
         .. literalinclude:: /includes/query/score/code-snippets/python/compound-constant-query.py
            :language: python
            :linenos:
            :dedent:
            :emphasize-lines: 4
      
      #. .. include:: /includes/shared/facts/fact-fts-driver-connection-string.rst
      #. Run the following command to query your collection:
      
         .. io-code-block::
            :copyable: true
      
            .. input::
               :language: bash
         
               python compound-constant-query.py
            
            .. output::
               :language: python
               :visible: true
      
               {'highlights': [{'path': 'title', 'score': 1.382846713066101, 'texts': [{'type': 'hit', 'value': 'Snow'}, {'type': 'text', 'value': ' in Paradise'}]}], 'year': 2014, 'score': 5.0, 'title': 'Snow in Paradise'}
               {'highlights': [{'path': 'title', 'score': 1.3924485445022583, 'texts': [{'type': 'text', 'value': 'Dead '}, {'type': 'hit', 'value': 'Snow'}, {'type': 'text', 'value': ' 2: Red vs. '}]}], 'year': 2014, 'score': 5.0, 'title': 'Dead Snow 2: Red vs. Dead'}
               {'highlights': [{'path': 'title', 'score': 1.3525336980819702, 'texts': [{'type': 'text', 'value': 'The '}, {'type': 'hit', 'value': 'Snow'}, {'type': 'text', 'value': ' White Murder Case'}]}], 'year': 2014, 'score': 5.0, 'title': 'The Snow White Murder Case'}
               {'highlights': [{'path': 'title', 'score': 1.3766303062438965, 'texts': [{'type': 'hit', 'value': 'Snow'}, {'type': 'text', 'value': ' on the Blades'}]}], 'year': 2014, 'score': 5.0, 'title': 'Snow on the Blades'}
               {'highlights': [], 'title': 'The Secret Life of Walter Mitty', 'score': 0.0, 'year': 2013}
               {'highlights': [], 'year': 2015, 'score': 0.0, 'title': 'Jurassic World'}
               {'highlights': [], 'year': 2014, 'score': 0.0, 'title': 'Action Jackson'}
               {'highlights': [], 'title': 'In Secret', 'score': 0.0, 'year': 2013}
               {'highlights': [], 'year': 2015, 'score': 0.0, 'title': 'The Stanford Prison Experiment'}
               {'highlights': [], 'title': 'The Giver', 'score': 0.0, 'year': 2014}
      
         .. include:: /includes/query/score/facts/fts-compound-constant-score-desc.rst
      
   .. step:: Run a |fts| compound query that alters the score using the :ref:`scoring-boost` option.
      a. Create a file named ``compound-boost-query.py``. 
      
      #. Copy and paste the code example into the 
         ``compound-boost-query.py`` file.
      
         The following code example:
      
         - Imports ``pymongo``, MongoDB's Python driver, and the ``dns``
           module, which is required to connect ``pymongo`` to ``Atlas`` 
           using a |dns| seed list connection string. 
      
         - Creates an instance of the ``MongoClient`` class to establish a 
           connection to your cluster.
      
         - Iterates over the cursor to print the documents that match the 
           query.
      
         .. tabs:: 
      
            .. tab:: Simple Example
               :tabid: simple
      
               The query uses the following pipeline stages:
      
               - :pipeline:`$search` stage to query the collection. The 
                 query:
      
                 - Uses the following ``compound`` operator clauses:
      
                   .. include:: /includes/query/score/facts/fts-compound-boost-desc.rst
      
                   - .. include:: /includes/query/score/facts/fts-compound-highlight-desc.rst
      
               .. include:: /includes/query/score/facts/fts-compound-score-stages.rst
      
               .. literalinclude:: /includes/query/score/code-snippets/python/compound-boost-query.py
                  :language: python
                  :linenos:
                  :dedent:
                  :emphasize-lines: 4
      
            .. tab:: Multiple Weights Example
               :tabid: multi
      
               The query uses the following pipeline stages:
      
               - :pipeline:`$search` stage to query the collection. The 
                 query uses the following ``compound`` operator clauses 
                 with the ``boost`` option to prioritize some fields more 
                 than other fields: 
            
                 .. include:: /includes/query/score/facts/fts-compound-boost-advanced-desc.rst
      
               - :pipeline:`$limit` stage to limit the output to ``10`` 
                 results.
      
               - :pipeline:`$project` stage to:
      
                 - Exclude all fields except ``title``, ``year``, and 
                   ``genres``
                 - Add a field named ``score``
       
               .. literalinclude:: /includes/query/score/code-snippets/python/boost-multi-query.py
                  :language: python
                  :dedent:
                  :emphasize-lines: 4
      
      #. .. include:: /includes/shared/facts/fact-fts-driver-connection-string.rst
      
      #. Run the following command to query your collection:
      
         .. tabs:: 
            :hidden:
      
            .. tab:: Simple Example
               :tabid: simple
      
               .. io-code-block::
                  :copyable: true
      
                  .. input::
                     :language: bash
         
                     python compound-boost-query.py
            
                  .. output::
                     :language: python
                     :visible: true
      
                     {'highlights': [{'path': 'title', 'score': 1.382846713066101, 'texts': [{'type': 'hit', 'value': 'Snow'}, {'type': 'text', 'value': ' in Paradise'}]}], 'year': 2014, 'score': 6.7722930908203125, 'title': 'Snow in Paradise'}
                     {'highlights': [{'path': 'title', 'score': 1.3766303062438965, 'texts': [{'type': 'hit', 'value': 'Snow'}, {'type': 'text', 'value': ' on the Blades'}]}], 'year': 2014, 'score': 6.063445568084717, 'title': 'Snow on the Blades'}
                     {'highlights': [{'path': 'title', 'score': 1.3525336980819702, 'texts': [{'type': 'text', 'value': 'The '}, {'type': 'hit', 'value': 'Snow'}, {'type': 'text', 'value': ' White Murder Case'}]}], 'year': 2014, 'score': 5.509652137756348, 'title': 'The Snow White Murder Case'}
                     {'highlights': [{'path': 'title', 'score': 1.3924485445022583, 'texts': [{'type': 'text', 'value': 'Dead '}, {'type': 'hit', 'value': 'Snow'}, {'type': 'text', 'value': ' 2: Red vs. '}]}], 'year': 2014, 'score': 5.065053939819336, 'title': 'Dead Snow 2: Red vs. Dead'}
                     {'highlights': [], 'title': 'The Secret Life of Walter Mitty', 'score': 1.0, 'year': 2013}
                     {'highlights': [], 'year': 2015, 'score': 1.0, 'title': 'Jurassic World'}
                     {'highlights': [], 'year': 2014, 'score': 1.0, 'title': 'Action Jackson'}
                     {'highlights': [], 'title': 'In Secret', 'score': 1.0, 'year': 2013}
                     {'highlights': [], 'year': 2015, 'score': 1.0, 'title': 'The Stanford Prison Experiment'}
                     {'highlights': [], 'title': 'The Giver', 'score': 1.0, 'year': 2014}
      
               .. include:: /includes/query/score/facts/fts-compound-boost-score-desc.rst
      
            .. tab:: Multiple Weights Example
               :tabid: multi
      
               .. io-code-block::
                  :copyable: true
      
                  .. input::
                     :language: bash
         
                     python compound-boost-query.py
            
                  .. output:: /includes/query/score/code-snippets/output/boost-multi-python-query-results.json
                     :language: python
                     :visible: true
      
   .. step:: Run a |fts| compound query that alters the score using the :ref:`scoring-function` option.
      
      a. Create a file named ``compound-function-query.py``. 
      
      #. Copy and paste the code example into the 
         ``compound-function-query.py`` file.
      
         The following code example:
      
         - Imports ``pymongo``, MongoDB's Python driver, and the ``dns``
           module, which is required to connect ``pymongo`` to ``Atlas`` 
           using a |dns| seed list connection string. 
         - Creates an instance of the ``MongoClient`` class to establish a 
           connection to your cluster.
      
         - Uses the following compound clauses to query the collection: 
      
           .. include:: /includes/query/score/facts/fts-compound-function-desc.rst
      
         - .. include:: /includes/query/score/facts/fts-compound-highlight-desc.rst
      
         - Uses the following pipeline stages:
      
           .. include:: /includes/query/score/facts/fts-compound-score-stages.rst
      
         - Iterates over the cursor to print the documents that match the 
           query.
      
         .. literalinclude:: /includes/query/score/code-snippets/python/compound-function-query.py
            :language: python
            :linenos:
            :emphasize-lines: 4
      
      #. .. include:: /includes/shared/facts/fact-fts-driver-connection-string.rst
      
      #. Run the following command to query your collection:
      
         .. io-code-block::
            :copyable: true
      
            .. input::
               :language: bash
         
               python compound-function-query.py
            
            .. output::
               :language: python
               :visible: true
      
               {'highlights': [{'path': 'title', 'score': 1.3525336980819702, 'texts': [{'type': 'text', 'value': 'The '}, {'type': 'hit', 'value': 'Snow'}, {'type': 'text', 'value': ' White Murder Case'}]}], 'year': 2014, 'score': 10.454826354980469, 'title': 'The Snow White Murder Case'}
               {'highlights': [{'path': 'title', 'score': 1.3766303062438965, 'texts': [{'type': 'hit', 'value': 'Snow'}, {'type': 'text', 'value': ' on the Blades'}]}], 'year': 2014, 'score': 10.3317232131958, 'title': 'Snow on the Blades'}
               {'highlights': [{'path': 'title', 'score': 1.3924485445022583, 'texts': [{'type': 'text', 'value': 'Dead '}, {'type': 'hit', 'value': 'Snow'}, {'type': 'text', 'value': ' 2: Red vs. '}]}], 'year': 2014, 'score': 10.032526969909668, 'title': 'Dead Snow 2: Red vs. Dead'}
               {'highlights': [{'path': 'title', 'score': 1.382846713066101, 'texts': [{'type': 'hit', 'value': 'Snow'}, {'type': 'text', 'value': ' in Paradise'}]}], 'year': 2014, 'score': 8.386146545410156, 'title': 'Snow in Paradise'}
               {'highlights': [], 'title': 'The Secret Life of Walter Mitty', 'score': 1.0, 'year': 2013}
               {'highlights': [], 'year': 2015, 'score': 1.0, 'title': 'Jurassic World'}
               {'highlights': [], 'year': 2014, 'score': 1.0, 'title': 'Action Jackson'}
               {'highlights': [], 'title': 'In Secret', 'score': 1.0, 'year': 2013}
               {'highlights': [], 'year': 2015, 'score': 1.0, 'title': 'The Stanford Prison Experiment'}
               {'highlights': [], 'title': 'The Giver', 'score': 1.0, 'year': 2014}
      
         .. include:: /includes/query/score/facts/fts-compound-function-score-desc.rst
      
