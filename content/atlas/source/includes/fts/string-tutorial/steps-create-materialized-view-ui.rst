.. procedure:: 
   :style: normal
   
   .. include:: /includes/nav/steps-db-deployments-page.rst
 
   .. step:: Navigate to the collection.

      a. For the cluster that contains the sample data,
         click :guilabel:`Browse Collections`.
      #. In the left navigation pane, select the
         :guilabel:`sample_airbnb` database.
      #. Select the :guilabel:`listingsAndReviews` collection.

   .. step:: Click the :guilabel:`Aggregation` tab.

   .. step:: Add the :pipeline:`$project` stage.

      The :pipeline:`$project` stage modifies data in the
      ``listingsAndReviews`` collection to convert existing fields into
      ``string`` type fields.

      a. Click :guilabel:`Add Stage`.
      #. Select :pipeline:`$project` from the :guilabel:`Select`
         drop-down menu.
      #. Add the following syntax to the aggregation pipeline editor. This does the following:

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

         .. code-block:: json
            :copyable: true 
            
            {
              lastScrapedDate: { $dateToString: { format: "%Y-%m-%d", date: "$last_scraped" } },
              accommodatesNumber: { $toString: "$accommodates" },
              maximumNumberOfNights: { $toString: "$maximum_nights" },
              propertyName: "$name",
              propertyType: "$property_type"
            }

   .. step:: Add the ``$merge`` stage.
    
      The :pipeline:`$merge` writes the output fields from the
      :pipeline:`$project` stage to a materialized view named
      ``airbnb_mat_view`` in the ``sample_airbnb`` database.

      a. Click :guilabel:`Add Stage`.
      #. Select the :pipeline:`$merge` stage from the :guilabel:`Select`
         drop-down menu.
      #. Add the following syntax to the aggregation pipeline editor:

         .. code-block:: json
            :copyable: true 

            { 
              into: "airbnb_mat_view",
              whenMatched: "replace"
            }
            
   .. step:: Click :guilabel:`Merge Documents`.

      Refresh the list of collections to see the ``airbnb_mat_view`` collection.

      To learn how to query the ``airbnb_mat_view`` collection in the
      {+atlas-ui+}, see :atlas:`View, Filter, and Sort Documents
      </atlas-ui/documents/#view--filter--and-sort-documents>`.