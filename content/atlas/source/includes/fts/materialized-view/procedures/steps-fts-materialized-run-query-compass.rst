.. procedure:: 
   :style: normal 

   .. step:: Connect to your {+cluster+} in |compass|.

      Open |compass| and connect to your {+cluster+}. For detailed
      instructions on connecting, see :ref:`atlas-connect-via-compass`.

   .. step:: Use the ``sample_supplies`` database.

      On the :guilabel:`Database` screen, click the ``sample_supplies``
      database and then click the ``monthlyPhoneTransactions`` collection.

   .. step:: Run a simple |fts| query against the collection.

      The following query counts the number of months in monthlyPhoneTransactions
      with total sales greater than or equal to ``10000`` dollars.

      To run this query in |compass|: 

      a. Click the :guilabel:`Aggregations` tab.
      #. Click :guilabel:`Select...`, then configure each of the
         following pipeline stages by selecting the stage from the 
         dropdown and adding the query for that stage. Click
         :guilabel:`Add Stage` to add additional stages. 

         .. include:: /includes/fts/materialized-view/list-table-compass-query.rst 
                 
         If you :compass:`enabled </aggregation-pipeline-builder/#set-the-documents-limit-or-auto-preview-documents>` 
         :guilabel:`Auto Preview`, |compass| displays the following
         result: 

         .. code-block:: json
            :copyable: false 

            {
              "months_w_over_10000": 4
            }

   .. step:: Interpret the query results.

      The above query returns ``4``, indicating that only 4 months out of all the months in the
      ``monthlyPhoneTransactions`` materialized view had total sales 
      greater than or equal to 10000 dollars. This result reflects data 
      from both the ``sample_supplies.sales`` and 
      ``sample_supplies.purchaseOrders`` collections.  
