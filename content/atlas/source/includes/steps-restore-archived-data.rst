.. procedure::
   :style: normal

   .. step:: Pause the {+Online-Archive+} associated with the collection
      that contains the archived data you want to restore.

      See :ref:`pause-resume-online-archive` for more information.

   .. step:: Connect to {+Online-Archive+} using your connection string.

      You must use the :guilabel:`Archive Only` connection string to connect
      to the {+Online-Archive+}. To learn more, see :ref:`connect-online-archive-atlas-ui`.

   .. step:: Use :pipeline:`$merge` stage to move the data from your archive to your |service| cluster.

      To learn more about the ``$merge`` pipeline stage syntax and usage
      for moving data back into your |service| cluster, see the :ref:`$merge
      <adf-merge-stage>` pipeline stage.

      .. example::

         Consider the following documents in an |s3| archive:

         .. code-block:: json

            {
               "_id" : 1,
               "item": "cucumber",
               "source": "nepal",
               "released": ISODate("2016-05-18T16:00:00Z")
            }
            {
               "_id" : 2,
               "item": "miso",
               "source": "canada",
               "released": ISODate("2016-05-18T16:00:00Z")
            }
            {
               "_id" : 3,
               "item": "oyster",
               "source": "luxembourg",
               "released": ISODate("2016-05-18T16:00:00Z")
            }
            {
               "_id" : 4,
               "item": "mushroom",
               "source": "ghana",
               "released": ISODate("2016-05-18T16:00:00Z")
            }

         Suppose you intend to restore documents based on the ``item`` and ``source``
         fields during the ``$merge`` stage. The following code sample shows an example of
         using the :pipeline:`$merge` stage to restore archived data based on that
         criteria:

         .. code-block:: json

            db.<collection>.aggregate([
               {
                  "$merge": {
                     "into": {
                        "atlas": {
                           "clusterName": "<atlas-cluster-name>",
                           "db": "<db-name>",
                           "coll": "<collection-name>"
                        }
                     },
                     "on": [ "item", "source" ],
                     "whenMatched": "keepExisting",
                     "whenNotMatched": "insert"
                  }
               }
            ])
         
         The code employs the following logic: 
         
         - If an archived document matches a document on the |service|
           cluster on the ``item`` and ``source`` fields, |service| keeps the
           existing document in the cluster because the copy of the document on the
           |service| cluster is more recent than the archived version.
         
         - If an archived document doesn't match any document in the |service| cluster,
           |service| inserts the document into the specified collection on the |service|
           cluster.

         When restoring data to the |service| cluster, the archived data might have
         duplicate ``_id`` fields. For this example, we can include a :pipeline:`$sort`
         stage for sorting on the ``_id`` and ``released`` fields before the
         :pipeline:`$merge` stage to ensure that |service| chooses the documents with the
         most recent date if there are duplicates to resolve.

         The following code sample adds the :pipeline:`$sort` stage:

         .. code-block:: json

            db.runCommand({
               "aggregate": "<collection>", "pipeline": [
                  {
                     $sort: {
                        "_id": 1, "released": 1,
                     }
                  }, {
                     "$merge": {
                        "into": {
                           "atlas": {
                              "clusterName": "<atlas-cluster-name>", "db": "<db-name>",
                              "coll": "<collection-name>"
                           }
                        }, "on": [ "item", "source" ], "whenMatched": "keepExisting",
                        "whenNotMatched": "insert"
                     }
                  }
               ], "cursor": { }
            }, { "background": true }
            )

         To learn more about resolving duplicate fields, see the :ref:`$merge
         considerations <adf-merge-stage>`.

         .. note::

            If there are multiple ``on`` fields, you must create a compound
            :manual:`unique index </core/index-unique>` on the ``on`` identifier fields:

            .. code-block:: shell

               db.<collection>.createIndex( { item: 1, source: 1 }, { unique: true } )

            Alternatively, specify merges sequentially, one for each ``on`` identifier
            field, to a temporary collection. Then, merge the data in the temporary
            collection to the target collection using the {+cluster+}'s connection string.
            You must still create a unique index for each ``on`` identifier field.

         You can run the aggregation stage in the background by setting the ``background``
         flag to ``true``. To run this command in {+mongosh+}, use the ``db.runCommand``.

   .. step:: Verify data in the |service| cluster and delete the
      online archive.

      See :ref:`delete-online-archive` for more information.
