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

         .. step:: Open the Visual Builder.

            Click :guilabel:`Stream Processors` in the left-hand
            navigation menu, then click :guilabel:`Create stream
            processor`.

            The :guilabel:`Create Stream Processor` screen opens with a
            form where you can configure your stream processor.

         .. step:: Add a source connection.

            In the :guilabel:`Build Pipeline` section, select the
            connection that your stream processor reads data from in
            the :guilabel:`Source` drop-down list.

            This opens a |json| text box that contains the ``$source``
            stage for your stream processor. In the text box, set
            ``db`` to the name of your database and ``coll`` to the
            name of the collection in that database. To learn more
            about ``$source`` stage syntax, see :pipeline:`$source`.

         .. step:: Optional: Add aggregation stages to the pipeline.

            In the :guilabel:`Pipeline` field, select the aggregation
            stages that you want your stream processor to apply. To add
            these stages later, leave this field empty.

            To learn more about stream processing aggregation stages
            and their syntax, see :ref:`atlas-sp-aggregation`.

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

         .. step:: Add a sink connection.

            In the :guilabel:`Sink` field, select the connection that
            your stream processor writes processed data to.

            This opens a |json| text box that contains the ``$merge``
            stage for your stream processor. In the text box, set
            ``db`` to the name of your database and ``coll`` to the
            name of the collection in that database. To learn more
            about ``$merge`` stage syntax, see :pipeline:`$merge`.

            .. example::

               The following ``$merge`` stage writes processed data to
               the ``demoDb.demoColl`` collection in a connection named
               ``demoConnection``:

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

         .. step:: Enter your stream processor details.

            In the :guilabel:`Enter processor details` section, do the
            following:

            a. In the :guilabel:`Stream processor name` field, enter a
               name for your stream processor.

            #. Select the data processing tier for your stream
               processor. The default tier is ``SP10``. To learn more,
               see :ref:`Tiers <atlas-sp-architecture-tiers>`.

            #. Specify whether to start your stream processor when
               {+atlas-sp+} creates it.

         .. step:: (Optional) Add a dead letter queue.

            Specify a destination for your :ref:`dead letter queue
            <atlas-sp-dlq>`.

         .. step:: (Optional) Create failover processors.

            In the :guilabel:`Advanced settings` pane, toggle
            :guilabel:`Create failover processor(s)` to create one or
            more :ref:`failover processors
            <atlas-sp-architecture-failover>`.

            :gold:`IMPORTANT`: This feature is only available in
            {+spw+}s configured with failover regions. To learn more,
            see :ref:`Limitations <atlas-sp-limitations>`.

         .. step:: Click :guilabel:`Create stream processor`.

            {+atlas-sp+} creates the stream processor and lists it on
            the :guilabel:`Stream Processors` tab of the
            :guilabel:`Stream Processing` page.

   .. tab:: JSON Editor 
      :tabid: json-editor

      .. procedure:: 
         :style: normal

         .. step:: Click :guilabel:`Use JSON editor`.

            If there are existing stream processors in your {+spw+},
            click the :guilabel:`+ Create stream processor` button, then
            select :guilabel:`JSON editor` from the drop-down
            options.

            The JSON editor opens with a text box where you can
            configure your stream processor in |json| format.

         .. step:: (Optional) Upload a file to populate the editor.

            Click :guilabel:`Upload File` and select a JSON file
            that contains your stream processor definition. The file
            must use the same |json| format that the
            :oas-bump-atlas-op:`Create One Stream Processor
            <creategroupstreamprocessor>` endpoint requires.
            Your uploaded file replaces the default editor content.

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

         .. step:: (Optional) Create failover processors.

            In the :guilabel:`Advanced settings` pane, toggle
            :guilabel:`Create failover processor(s)` to create one or
	    more :ref:`failover processors
	    <atlas-sp-architecture-failover>`.

	    :gold:`IMPORTANT`: This feature is only available in
            {+spw+}s configured with failover regions. To learn more,
	    see :ref:`Limitations <atlas-sp-limitations>`.
		  
         .. step:: Click :guilabel:`Create stream processor`.

            {+atlas-sp+} creates the stream processor and lists it on
            the :guilabel:`Stream Processors` tab of the
            :guilabel:`Stream Processing` page.
