.. procedure::
   :style: normal
      
   .. step:: Ensure that you add the following dependency to your project.
      
      .. list-table::
         :widths: 30 70 
      
         * - ``mongodb-driver-kotlin-coroutine``
           - 4.10.0 or higher version
      
   .. step:: Run a |fts| query with the ``autocomplete`` operator on the ``movies`` collection.
      
      a. Create a file named ``AutocompleteQuery.kt``.
      #. Copy and paste the following code into the ``AutocompleteQuery.kt`` file.
      
         The code example performs the following tasks:
      
         .. include:: /includes/query/operators-collectors/autocomplete/facts/fts-autocomplete-query-advanced-tasks.rst 
         
         .. literalinclude:: /includes/query/operators-collectors/autocomplete/code-snippets/kotlin/tutorial-multi.kt
            :language: kotlin
            :linenos:
            :dedent:
            :emphasize-lines: 10
      
      #. .. include:: /includes/shared/facts/fact-fts-driver-connection-string.rst
      #. Run the ``AutocompleteQuery.kt`` file.
      
         When you run the ``AutocompleteQuery.kt`` program in your IDE, it prints
         the following documents:
      
         .. code-block:: none
            :copyable: false
      
            Document{{plot=Prison Terminal: The Last Days of Private Jack Hall is a moving cinema verite documentary that breaks through the walls of one of Americas oldest maximum security prisons to tell the story ..., title=Prison Terminal: The Last Days of Private Jack Hall}}
            Document{{plot=Now settled in Genovia, Princess Mia faces a new revelation: she is being primed for an arranged marriage to an English suitor., title=The Princess Diaries 2: Royal Engagement}}
            Document{{plot=A young fugitive prince and princess must stop a villain who unknowingly threatens to destroy the world with a special dagger that enables the magic sand inside to reverse time., title=Prince of Persia: The Sands of Time}}
            Document{{plot=The first wedding anniversary of Princess Odette and Prince Derek is distracted by field fires set by Knuckles. His master Clavius, wants to conquer the world, and he needs to capture a ..., title=The Swan Princess: Escape from Castle Mountain}}
            Document{{plot=Jane Austen's classic novel about the prejudice that occurred between the 19th century classes and the pride which would keep lovers apart., title=Pride and Prejudice}}
      
