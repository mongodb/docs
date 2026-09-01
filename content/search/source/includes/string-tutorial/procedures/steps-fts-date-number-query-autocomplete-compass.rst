.. procedure::
   :style: normal

   .. step:: Connect to your cluster in |compass|.

      Open |compass| and connect to your cluster. For detailed
      instructions on connecting, see :ref:`atlas-connect-via-compass`.

   .. step:: Use the ``airbnb_mat-view`` collection in the ``sample_airbnb`` database.

      On the :guilabel:`Database` screen, click the ``sample_airbnb`` database, then click the ``airbnb_mat_view`` collection.

   .. step:: Run the following MongoDB Search query using the operator for which you created the index.

      .. include:: /includes/string-tutorial/facts/fts-query-intro.rst

      .. tabs::

         .. tab:: Year Search
            :tabid: yearquery

            .. include:: /includes/string-tutorial/facts/fts-date-query-desc.rst

            .. list-table::
               :header-rows: 1
               :widths: 25 75

               * - Pipeline Stage
                 - Query

               * - ``$search``
                 - .. code-block:: javascript

                      {
                        "index": "date-number-fields-tutorial",
                        "compound": {
                          "should": [{
                            "autocomplete": {
                              "path": "lastScrapedDate",
                              "query": "2"
                            }
                          },
                          {
                            "autocomplete": {
                              "path": "maximumNumberOfNights",
                              "query": "1"
                            }
                          }]
                        }
                      }

               * - ``$limit``
                 - .. code-block:: javascript

                      {
                        5
                      }

               * - ``$project``
                 - .. code-block:: javascript

                      {
                        "_id": 0
                      }

            If you enabled :guilabel:`Auto Preview`, |compass|
            displays the following documents next to the
            :pipeline:`$project` pipeline stage:

            .. literalinclude:: /includes/string-tutorial/code-snippets/shell/autocomplete-date-sh-compass-query-results.json
               :language: json
               :linenos:

         .. tab:: Number Search
            :tabid: numericquery

            .. include:: /includes/string-tutorial/facts/fts-numeric-query-desc.rst

            .. list-table::
               :header-rows: 1
               :widths: 25 75

               * - Pipeline Stage
                 - Query

               * - ``$search``
                 - .. code-block:: javascript

                      {
                        "index": "date-number-fields-tutorial",
                        "compound": {
                          "should": [{
                            "autocomplete": {
                              "path": "maximumNumberOfNights",
                              "query": "3"
                            }
                          },
                          {
                            "autocomplete": {
                              "path": "accommodatesNumber",
                              "query": "2"
                            }
                          }]
                        }
                      }

               * - ``$limit``
                 - .. code-block:: javascript

                      {
                        5
                      }

               * - ``$project``
                 - .. code-block:: javascript

                      {
                        "_id": 0
                      }

            If you enabled :guilabel:`Auto Preview`, |compass|
            displays the following documents next to the
            :pipeline:`$project` pipeline stage:

            .. literalinclude:: /includes/string-tutorial/code-snippets/shell/autocomplete-numeric-sh-compass-query-results.json
               :language: json
               :linenos:
