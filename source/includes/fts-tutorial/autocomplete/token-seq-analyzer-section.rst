You can search the ``title`` field for movie titles that start with a
term or phrase by indexing the field using the :ref:`keyword analyzer
<ref-keyword-analyzer>`.

.. note:: 

   You must index the field using the :ref:`keyword analyzer
   <ref-keyword-analyzer>` to retrieve results for the following sample
   query. If you index the field using any other :ref:`built-in
   analyzers <ref-built-in-analyzers>`, |fts| doesn't return any results
   because they do not index your text field as a single term.

.. code-block:: json
   :emphasize-lines: 16
   
   {
     "mappings": {
       "dynamic": false,
       "fields": {
         "title": [
         {
           "type": "stringFacet"
         },
         {
            "type": "string"
         },
         {
           "foldDiacritics": false,
           "maxGrams": 7,
           "minGrams": 3,
           "analyzer": "lucene.keyword",
           "tokenization": "edgeGram",
           "type": "autocomplete"
         }]
       }
     }
   }

The following query searches for movie titles that start with the term
``Fast &``.

.. tabs-drivers::

   .. tab::
      :tabid: shell
  
      .. literalinclude:: /includes/fts-tutorial/autocomplete/starts-with-shell.js
         :language: js
         :dedent:

   .. tab::
      :tabid: compass

      .. include:: /includes/fts-tutorial/autocomplete/starts-with.rst

   .. tab:: 
      :tabid: go

      .. literalinclude:: /includes/fts-tutorial/autocomplete/starts-with.go
         :language: go
         :dedent:

   .. tab:: 
      :tabid: java-sync 

      .. literalinclude:: /includes/fts-tutorial/autocomplete/starts-with.java
         :language: java
         :dedent:

   .. tab::
      :tabid: nodejs

      .. literalinclude:: /includes/fts-tutorial/autocomplete/starts-with.js
         :language: js
         :dedent:

   .. tab::
      :tabid: python

      .. literalinclude:: /includes/fts-tutorial/autocomplete/token-seq.py
         :language: python
         :dedent:

.. tabs-drivers::

   .. tab::
      :tabid: shell

      .. include:: /includes/fts-tutorial/autocomplete/starts-with-output-shell-and-compass.rst

   .. tab::
      :tabid: compass

      .. include:: /includes/fts-tutorial/autocomplete/starts-with-output-shell-and-compass.rst

   .. tab:: 
      :tabid: go

      .. include:: /includes/fts-tutorial/autocomplete/starts-with-output-go.rst

   .. tab:: 
      :tabid: java-sync 

      .. include:: /includes/fts-tutorial/autocomplete/starts-with-output-java.rst

   .. tab::
      :tabid: nodejs

      .. include:: /includes/fts-tutorial/autocomplete/starts-with-output-js.rst

   .. tab::
      :tabid: python

      .. include:: /includes/fts-tutorial/autocomplete/starts-with-output-py.rst
