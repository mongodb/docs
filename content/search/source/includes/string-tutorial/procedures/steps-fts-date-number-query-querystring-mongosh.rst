.. procedure::
   :style: normal

   .. step:: Connect to your cluster using {+mongosh+}.

      Open {+mongosh+} in a terminal window and connect to your
      cluster. For detailed instructions on connecting, see
      :ref:`connect-mongo-shell`.

   .. step:: Use the ``sample_airbnb`` database.

      Run the following command at {+mongosh+} prompt:

      .. io-code-block::
         :copyable: true

         .. input::
            :language: sh

            use sample_airbnb

         .. output::
            :language: sh
            :emphasize-lines: 1
            :visible: false

            switched to db sample_airbnb

   .. step:: Run the following |fts| queries using the operator for which you created the index.

      .. include:: /includes/string-tutorial/facts/fts-query-intro.rst

      .. tabs::

         .. tab:: AND Query
            :tabid: and-query

            .. include:: /includes/string-tutorial/facts/fts-and-query-desc.rst

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: json

                  db.airbnb_mat_view.aggregate([
                    {
                      "$search": {
                        "index": "date-number-fields-tutorial",
                        "queryString": {
                          "defaultPath": "propertyType",
                          "query": "propertyType: (Apartment OR Condominium) AND accommodatesNumber: 4 AND lastScrapedDate: 2019"
                        }
                      }
                    },
                    { $limit: 5 },
                    {
                      $project: {
                        "_id": 0
                      }
                    }
                  ])

               .. output:: /includes/string-tutorial/code-snippets/shell/querystring-and-sh-compass-query-results.json
                  :language: json
                  :linenos:
                  :visible: false

         .. tab:: OR Query
            :tabid: or-query

            .. include:: /includes/string-tutorial/facts/fts-or-query-desc.rst

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: json

                  db.airbnb_mat_view.aggregate([
                    {
                      "$search": {
                        "index": "date-number-fields-tutorial",
                        "queryString": {
                          "defaultPath": "propertyType",
                          "query": "propertyType: House OR accommodatesNumber: 2 OR lastScrapedDate: 2019 OR maximumNumberOfNights: 30"
                        }
                      }
                    },
                    { $limit: 5 },
                    {
                      $project: {
                        "_id": 0
                      }
                    }
                  ])

               .. output:: /includes/string-tutorial/code-snippets/shell/querystring-or-sh-compass-query-results.json
                  :language: json
                  :linenos:
                  :visible: false
