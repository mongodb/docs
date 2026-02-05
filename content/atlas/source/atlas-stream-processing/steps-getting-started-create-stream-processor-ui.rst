To create a stream processor in the {+atlas-ui+}, go to the
:guilabel:`Stream Processing` page for your {+service+} project and
click :guilabel:`Manage` in the pane for your {+spw+}. Then choose
between using the visual builder or the JSON editor to configure a
stream processor named ``solarDemo``:

.. tabs:: 

   .. tab:: Visual Builder 
      :tabid: visual-builder

      a. Click :guilabel:`Create with visual builder`.

         The Visual Builder opens with a form where you can configure
         your stream processor.

      #. In the :guilabel:`Stream processor name` field, enter
         ``solarDemo``.

      #. In the :guilabel:`Source` field, select ``sample_stream_solar``
         from the :guilabel:`Connection` drop-down list.

         This adds the following :pipeline:`$source` stage to your
         aggregation pipeline:

         .. code-block:: json
            :copyable: true

            {
              "$source": {
                "connectionName": "sample_stream_solar"
              }
            }

      #. Configure a :pipeline:`$tumblingWindow` stage.
         
         In the :guilabel:`Start building your pipeline` pane, click
         :guilabel:`+ Custom stage` and copy and paste the following
         |json| into the text box that appears. This defines a
         :pipeline:`$tumblingWindow` stage with a nested
         :pipeline:`$group` stage that derives the maximum temperature
         and the maximum, minimum, and average wattages of each solar
         device over 10-second intervals.

         This means, for example, that when the ``$group`` stage
         computes a value for ``max_watts``, it extracts the maximum
         value from the ``obs.watts`` values for all documents with a
         given ``group_id`` ingested in the previous 10 seconds.
         
         .. code-block:: json
            :copyable: true

            {
              "$tumblingWindow": {
                "interval": { 
                   "size": 10, 
                   "unit": "second" 
                },
                "pipeline": [ { 
                  "$group": {
                    "_id": "$group_id",
                    "max_temp": { 
                      "$max": "$obs.temp" 
                    },
                    "max_watts": { 
                      "$max": "$obs.watts" 
                    },
                    "min_watts": { 
                      "$min": "$obs.watts" 
                    },
                    "avg_watts": { 
                      "$avg": "$obs.watts" 
                    }
                  }
                }]
              }
            }
         
      #. In the :guilabel:`Sink` field, select ``mongodb1`` from the
         :guilabel:`Connection` drop-down list.

         In the text box that appears, copy and paste the following
         |json|. This configures a :pipeline:`$merge` stage that writes
         the processed streaming data to a collection named
         ``solarColl`` in the ``solarDb`` database of your connected
         {+service+} cluster:

         .. code-block:: json
            :copyable: true
            
            {
              "$merge": {
                "into": { 
                   "connectionName": "mongodb1", 
                   "db": "solarDb", 
                   "coll": "solarColl" 
                }
              }
            }

      #. Click :guilabel:`Create stream processor`.

         The stream processor is created and listed on the
         :guilabel:`Stream Processors` tab of the :guilabel:`Stream
         Processing` page.

   .. tab:: JSON Editor 
      :tabid: json-editor

      a. Click :guilabel:`Use JSON editor`.

         The JSON editor opens with a text box where you can
         configure your stream processor in |json| format.

      #. Define the stream processor. 
      
         Copy and paste the following |json| definition into the JSON
         editor text box to define a stream processor named
         ``solarDemo``. This stream processor uses a
         :pipeline:`$tumblingWindow` stage with a nested
         :pipeline:`$group` stage to derive the maximum temperature and
         the maximum, minimum, and average wattages of each solar device
         over 10-second intervals, then writes the results to a
         collection named ``solarColl`` in the ``Cluster0`` database of
         your connected {+service+} cluster.
         
         This means, for example, that when the ``$group`` stage
         computes a value for ``max_watts``, it extracts the maximum
         value from the ``obs.watts`` values for all documents with a
         given ``group_id`` ingested in the previous 10 seconds.

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
                          "max_temp": {
                            "$max": "$obs.temp"
                          },
                          "max_watts": {
                            "$max": "$obs.watts"
                          },
                          "min_watts": {
                            "$min": "$obs.watts"
                          },
                          "avg_watts": {
                            "$avg": "$obs.watts"
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "$merge": {
                    "into": {
                      "connectionName": "mongodb1",
                      "db": "Cluster0",
                      "coll": "solarColl"
                    },
                    "parallelism":16,
                  }
                }
              ]
            }