.. procedure:: 
   :style: normal 

   .. step:: Ensure that you add the following dependency to your project.

      .. list-table::
         :widths: 30 70 

         * - ``mongodb-driver-kotlin-coroutine``
           - 4.10.0 or higher version

   .. step:: Create a file named ``CaseInsensitiveQuery.kt``.

   .. step:: Copy and paste the following code into the ``CaseInsensitiveQuery.kt`` file.

      .. include:: /includes/fts/extracts/fts-normalized-sort-query-desc.rst

      .. include:: /includes/fts/extracts/fts-normalized-sort-query-stages.rst

      .. literalinclude:: /includes/fts/case-insensitive/query.kt
         :language: kotlin
         :linenos:
         :dedent:
         :emphasize-lines: 10

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Run the ``CaseInsensitiveQuery.kt`` file.

      When you run the ``CaseInsensitiveQuery.kt`` program in your IDE, it prints
      the following documents:

      .. code-block:: none
         :copyable: false

         Document{{title=atomic train, awards=Document{{wins=1, nominations=1}}, score=3.3326687812805176}}
         Document{{title=Atomic Train, awards=Document{{wins=1, nominations=1, text=1 win & 1 nomination.}}, score=3.3326687812805176}}
         Document{{title=how to train your dragon, awards=Document{{wins=32, nominations=51}}, score=2.2382168769836426}}
         Document{{title=How to Train Your Dragon, awards=Document{{wins=32, nominations=51, text=Nominated for 2 Oscars. Another 30 wins & 51 nominations.}}, score=2.2382168769836426}}
         Document{{title=How to Train Your Dragon 2, awards=Document{{wins=18, nominations=52, text=Nominated for 1 Oscar. Another 17 wins & 52 nominations.}}, score=2.0173802375793457}}

      .. include:: /includes/fts/extracts/fts-normalized-sort-query-results.rst

      .. code-block:: none
         :copyable: false 

         Document{{title=Atomic Train, awards=Document{{wins=1, nominations=1, text=1 win & 1 nomination.}}, score=3.3326687812805176}}
         Document{{title=How to Train Your Dragon, awards=Document{{wins=32, nominations=51, text=Nominated for 2 Oscars. Another 30 wins & 51 nominations.}}, score=2.2382168769836426}}
         Document{{title=How to Train Your Dragon 2, awards=Document{{wins=18, nominations=52, text=Nominated for 1 Oscar. Another 17 wins & 52 nominations.}}, score=2.0173802375793457}}
         Document{{title=Howard Zinn: You Can't Be Neutral on a Moving Train, awards=Document{{wins=1, nominations=0, text=1 win.}}, score=1.446497917175293}}
         Document{{title=Last Train Home, awards=Document{{wins=14, nominations=9, text=14 wins & 9 nominations.}}, score=2.8655927181243896}}

      .. include:: /includes/fts/extracts/fts-normalized-sort-query-run-query.rst 
