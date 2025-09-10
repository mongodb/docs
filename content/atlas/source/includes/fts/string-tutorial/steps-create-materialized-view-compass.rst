.. procedure:: 
   :style: normal 

   .. step:: Connect to your {+cluster+} in |compass|.

      Open |compass| and connect to your {+cluster+}. For detailed
      instructions on connecting, see :ref:`atlas-connect-via-compass`.

   .. step:: Navigate to the ``sample_airbnb`` database.

      On the :guilabel:`Database` screen, click the ``sample_airbnb``
      database to access its collections.

   .. step:: Create a materialized view using the sales collection.

      First, you'll run an aggregation pipeline on the
      ``listingsAndReviews`` collection to create the materialized view:

      a. Click on the ``listingsAndReviews`` collection.
      #. Click the :guilabel:`Aggregations` tab.
      #. Click :guilabel:`Select...`, then configure each of the
         following pipeline stages by selecting the stage from the 
         dropdown and adding the query for that stage. Click
         :guilabel:`Add Stage` to add additional stages.

         - Stage 1: :pipeline:`$project`

           This pipeline stage transforms the data from the
           ``listingsAndReviews`` collection as follows: 

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
         
           .. code-block:: javascript
              :copyable: true
              
              {
                lastScrapedDate: { $dateToString: { format: "%Y-%m-%d", date: "$last_scraped" } },
                accommodatesNumber: { $toString: "$accommodates" },
                maximumNumberOfNights: { $toString: "$maximum_nights" },
                propertyName: "$name",
                propertyType: "$property_type"
              }

         - Stage 2: :pipeline:`$merge`
           
           This pipeline stage writes the output fields from the
           :pipeline:`$project` stage to a materialized view named
           ``airbnb_mat_view`` in the ``sample_airbnb`` database.

           .. code-block:: javascript
              :copyable: true

              { 
                into: "airbnb_mat_view",
                whenMatched: "replace" 
              }

      #. Click :guilabel:`Run` to execute the aggregation pipeline. This
         creates the initial ``airbnb_mat_view`` collection
         from the ``listingsAndReviews`` data.
         
   .. step:: Verify that the materialized view was created correctly.

      a. Navigate back to the database view and click on the newly
         created ``airbnb_mat_view`` collection.
      #. Click the :guilabel:`Documents` tab to view the documents in
         the collection.