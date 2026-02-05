To create a stream processor in the {+atlas-ui+}, go to the
:guilabel:`Stream Processing` page for your {+service+} project and
click :guilabel:`Manage` in the pane for your {+spw+}.

You can choose between using the Visual Builder or the |json| editor to
configure your stream processor:

.. tabs::

   .. tab:: Visual Builder 
      :tabid: visual-builder

      .. procedure:: 
         :style: normal 
         
         .. step:: Click :guilabel:`Create with visual builder`.

            If there are existing stream processors in your {+spw+},
            click the :guilabel:`+ Create stream processor` button, then
            select :guilabel:`Visual Builder` from the drop-down
            options.
            
            The Visual Builder opens with a form where you can
            configure your stream processor.
          
         .. step:: In the :guilabel:`Stream processor name` field, enter a name for your stream processor.
         
         .. step:: Add a source connection.
            
            In the :guilabel:`Source` field, select a connection from 
            the :guilabel:`Connection` drop-down list to use as the 
            source for your stream processor.

            This opens a |json| text box where you can configure the
            ``source`` stage for your stream processor. To learn
            more about ``source`` stage syntax, see :pipeline:`$source`.

            .. example:: 

               The following ``source`` stage operates on
               real-time data from the pre-configured
               ``sample_stream_solar`` connection:

               .. code-block:: json
                  :copyable: true

                  {
                    "$source": {
                      "connectionName": "sample_stream_solar"
                    }
                  }

         .. step:: Add aggregation stages to the stream processor pipeline.
            
            In the :guilabel:`Start building your pipeline` pane, click 
            the button for the aggregation stage that you want to add to your
            pipeline. This opens a text box where you can configure the
            selected aggregation stage in |json| format. 
            
            If your aggregation stage isn't listed, click 
            :guilabel:`+ Custom stage` to define a 
            :ref:`supported aggregation stage <atlas-sp-aggregation>`
            in |json| format. To learn more about stream processing 
            aggregation stages and their syntax, see 
            :ref:`atlas-sp-aggregation`. 

            .. example:: 

               The following :pipeline:`$match` stage matches all
               documents in the pre-configured ``sample_stream_solar``
               stream where the ``obs.watts`` field is greater than
               ``300``:

               .. code-block:: json
                  :copyable: true

                  {
                    "$match": {
                      "obs.watts": { "$gt": 300 }
                    }
                  }

         .. step:: (Optional) Configure additional aggregation stages.

            To add additional aggregation stages to your pipeline, click
            the :guilabel:`+ Add stage below` button below the last
            stage in your pipeline, and select the aggregation stage
            that you want to add or click :guilabel:`Custom stage` to
            define a different :ref:`supported aggregation stage
            <atlas-sp-aggregation>`. This opens a text box where you can
            configure the new stage in |json| format.

         .. step:: Add a sink connection.

            In the :guilabel:`Sink` field, select a destination
            connection from the :guilabel:`Connection` drop-down list.

            In the :guilabel:`Sink` field, select a connection from the
            :guilabel:`Connection` drop-down list to write your
            processed data to.

            This opens a |json| text box where you can configure the
            ``merge`` stage for your stream processor. To learn
            more about ``merge`` stage syntax, see :pipeline:`$merge`.

            .. example:: 

               The following ``sink`` stage write processed data to the
               ``demoDb.demoColl`` collection in a connection named
               ``demoConnection`` connection:

               .. code-block:: json
                  :copyable: true

                  {
                    "$merge": {
                      "into": {
                        "connectionName": "demoConnection",
                        "db": "demoDb",
                        "coll": "demoColl"
                      }
                    }
                  }

         .. step:: Click :guilabel:`Create stream processor`.

            The stream processor is created and listed on the
            :guilabel:`Stream Processors` tab of the :guilabel:`Stream
            Processing` page.

   .. tab:: JSON Editor 
      :tabid: json-editor

      .. procedure:: 
         :style: normal

         .. step:: Click :guilabel:`Use JSON editor`.

            If there are existing stream processors in your {+spw+},
            click the :guilabel:`+ Create stream processor` button, then
            select :guilabel:`Visual Builder` from the drop-down
            options.

            The JSON editor opens with a text box where you can
            configure your stream processor in |json| format.
          
         .. step:: Define the stream processor. 

            Specify the |json| definition for your stream processor in
            the JSON editor text box. This definition must include a
            name for your stream processor and an aggregation pipeline
            that starts with a :pipeline:`$source` stage and ends with
            the :pipeline:`$merge` stage. You can include any number of
            additional aggregation stages between the ``$source`` and
            ``$merge`` stages.

            To learn more about stream processing aggregation stages and
            their syntax, see :ref:`atlas-sp-aggregation`. 

            .. example:: 

               The following |json| definition creates a stream
               processor named ``solarDemo`` that uses a
               :pipeline:`$tumblingWindow` stage with a nested
               :pipeline:`$group` stage to aggregate real-time data from
               the pre-configured ``sample_stream_solar`` connection
               over 10-second intervals, and writes the processed data
               to a collection in a connection named ``mongodb1``.

               .. code-block:: json 
                  :copyable: true 

                  {
                    "name": "solarDemo",
                    "pipeline": [
                      {
                        "$source": {
                          "connectionName": "sample_stream_solar"
                        }
                      },
                      {
                        "$tumblingWindow": {
                          "interval": {
                            "size": 10,
                            "unit": "second"
                          },
                          "pipeline": [
                            {
                              "$group": {
                                "_id": "$group_id",
                                "max_watts": { "$max": "$obs.watts" },
                                "min_watts": { "$min": "$obs.watts" }
                              }
                            }
                          ]
                        }
                      },
                      {
                        "$merge": {
                          "into": {
                            "connectionName": "mongodb1",
                            "db": "solarDb",
                            "coll": "solarColl"
                          }
                        }
                      }
                    ]
                  }