.. procedure:: 
   :style: normal

   .. step:: Log in and connect to your cluster using {+mongosh+}.

      Open {+mongosh+} in a terminal window and connect to your 
      {+cluster+}. For detailed instructions on connecting, see 
      :ref:`connect-mongo-shell`.

   .. step:: Verify and switch to the ``sample_airbnb`` database. 

      a. Run the following command to verify that the database exists 
         in your {+cluster+}: 

         .. io-code-block::
            :copyable: true 

            .. input:: 
               :language: sh

               show dbs 

            .. output:: 
               :language: sh
               :emphasize-lines: 1
               :visible: false

               sample_airbnb       55.3 MB
               sample_analytics    9.59 MB
               sample_geospatial   1.43 MB
               sample_guides         41 kB
               sample_mflix        51.1 MB
               sample_restaurants  6.95 MB
               sample_supplies     1.21 MB
               sample_training     55.5 MB
               sample_weatherdata  2.89 MB
               admin                348 kB
               local                2.1 GB

      #. Run the following command to switch to the ``sample_airbnb`` 
         database.

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

   .. step:: Create a materialized view named ``airbnb_mat_view``.

      To create a materialized view, run the following query with the
      following aggregation pipeline stages:

      - :pipeline:`$project`:

        - Converts the date objects in the ``last_scraped`` field
          into string objects in the ``YYYY-MM-DD`` format using
          :expression:`$dateToString` and writes the output to a string
          field called ``lastScrapedDate``.
        - Converts the number objects in the ``accommodates`` and
          ``minimum_nights`` fields into string values using
          :expression:`$toString` and writes the output to number fields
          called ``accommodatesNumber`` and ``minimumNumberOfNights``,
          respectively. 
        - Includes the ``name`` and ``property_type`` string fields in
          the output and renames them to ``propertyName`` and
          ``propertyType`` respectively.

      - :pipeline:`$merge`: 
        
        Writes the output fields from the
        :pipeline:`$project` stage to a materialized view named
        ``airbnb_mat_view`` in the ``sample_airbnb`` database.
        
      .. literalinclude:: /includes/fts/string-tutorial/create-view-mongosh.sh
         :language: sh
         :copyable: true

   .. step:: Verify that the materialized view was successfully created. 

      To verify, run the following command to view one document in the 
      ``airbnb_mat_view`` materialized view:

      .. io-code-block::
            :copyable: true 

            .. input:: /includes/fts/string-tutorial/findOne-mongosh.sh
               :language: sh

               db.airbnb_mat_view.findOne() 

            .. output:: 
               :language: json
               :emphasize-lines: 1 
               :visible: false

               {
                 _id: '10006546',
                 lastScrapedDate: '2019-02-16',
                 accommodatesNumber: '8',
                 maximumNumberOfNights: '30',
                 propertyName: 'Ribeira Charming Duplex',
                 propertyType: 'House'
               }