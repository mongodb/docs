SparkSession spark = SparkSession.builder()
  .master("local")
  .appName("MongoSparkConnectorIntro")
  .config("spark.mongodb.input.uri", "mongodb://127.0.0.1/test.myCollection")
  .config("spark.mongodb.output.uri", "mongodb://127.0.0.1/test.myCollection")
  .getOrCreate();
  
// Create a JavaSparkContext using the SparkSession's SparkContext object
JavaSparkContext jsc = new JavaSparkContext(spark.sparkContext());