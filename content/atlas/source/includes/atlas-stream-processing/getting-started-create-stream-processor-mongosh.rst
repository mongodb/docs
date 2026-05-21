Run the following commands at the {+mongosh+} prompt to create a
persistent stream processor named ``solarDemo``:

a. Connect to your {+spw+}.

   If you are still connected to your {+spw+} from the previous
   step, skip to substep b.

   Use the connection string associated with your {+spw+}
   to connect using {+mongosh+}.

   i. In the pane for your {+spw+}, click :guilabel:`Connect`.

   #. In the :guilabel:`Connect to your workspace` dialog, 
      select the :guilabel:`Shell` tab.

   #. Copy the connection string displayed in the dialog. It has
      the following format, where
      ``<atlas-stream-processing-url>`` is the URL of your {+spw+}
      and ``<username>`` is the username of a database user with
      the :atlasrole:`atlasAdmin` role:

      .. code-block:: sh

         mongosh "mongodb://<atlas-stream-processing-url>/" 
         --tls --authenticationDatabase admin --username <username>  
         --password <password>   

   #. Paste the connection string into your terminal. The dialog
      fills in the {+spw+} URL and username automatically.
      Replace the ``<password>`` placeholder with your database
      user credentials, then press Enter to connect to your {+spw+}.

#. Configure a :pipeline:`$source` stage.

   Define a variable for a ``$source`` stage to specify
   ``sample_stream_solar`` as the connection in the Connection
   Registry to stream data from.

   .. code-block:: sh
      :copyable: true

      let s = {
        $source: {
          connectionName: "sample_stream_solar"
        }
      }
	   
#. Configure a :pipeline:`$group` stage.

   The ``$group`` stage combines multiple documents that share the
   same group key into a single output document. Define a variable
   for a ``$group`` stage that groups documents by ``group_id`` and
   derives the maximum temperature and the average, maximum, and
   minimum wattages of each group.

   .. code-block:: sh
      :copyable: true

      let g = {
        $group: {
          _id: "$group_id",
          max_temp: {
            $max: "$obs.temp"
          },
          avg_watts: {
             $avg: "$obs.watts"
          },
          max_watts: {
            $max: "$obs.watts"
          },
          min_watts: {
            $min: "$obs.watts"
          }
        }
      }

#. Configure a :pipeline:`$tumblingWindow` stage.

   A ``$tumblingWindow`` stage divides a continuous stream into
   fixed, non-overlapping time intervals. To perform accumulations
   such as ``$group`` on streaming data, {+atlas-sp+} uses
   :ref:`windows <atlas-sp-windows>` to bound the data set. Define
   a variable for a ``$tumblingWindow`` stage that separates the
   stream into consecutive 10-second intervals.

   For example, when the ``$group`` stage computes a value for
   ``max_watts``, it extracts the maximum value from the
   ``obs.watts`` values for all documents with a given
   ``group_id`` ingested in the previous 10 seconds.

   .. code-block:: sh
      :copyable: true

      let t = {
        $tumblingWindow: {
          interval: {
            size: NumberInt(10),
            unit: "second"
          },
          pipeline: [g]
       }
     }

#. Configure a :ref:`$merge <atlas-sp-agg-merge>` stage.

   Use the ``$merge`` stage to write your processed streaming data
   to an {+service+} database. Define a variable for a ``$merge``
   stage that writes to a collection named ``solarColl`` in the
   ``solarDb`` database of your connected {+service+} cluster.

   .. code-block:: sh
      :copyable: true

      let m = {
        $merge: {
          into: {
            connectionName: "mongodb1",
            db: "solarDb",
            coll: "solarColl"
          }
        }
      }

#. Create the stream processor.

   Use the :method:`sp.createStreamProcessor()` method to assign a name
   to your new stream processor and declare its aggregation pipeline.
   The ``$group`` stage belongs to the nested pipeline of the
   ``$tumblingWindow``, and you must not include it in the processor
   pipeline definition.

   .. code-block:: sh
      :copyable: true

      sp.createStreamProcessor("solarDemo", [s, t, m])

   This creates a stream processor named ``solarDemo`` that
   applies the previously defined query and writes the 
   processed data to the ``solarColl`` collection of the 
   ``solarDb`` database on the cluster you connected to.
   It returns various measurements derived from 10-second intervals
   of observations from your solar devices.

   To learn more about how {+atlas-sp+} writes to at-rest
   databases, see :ref:`atlas-sp-agg-merge`.
