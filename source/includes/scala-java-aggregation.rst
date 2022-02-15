Pass an :manual:`aggregation pipeline </core/aggregation-pipeline/>` to
a MongoRDD instance to filter data and perform aggregations in
MongoDB before passing documents to Spark.

The following example uses an aggregation pipeline to perform the same
filter operation as the example above; filter all documents where the
``test`` field has a value greater than 5:
