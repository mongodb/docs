projectStage = BsonDocument.Parse(@"
    {
      _id:0,
      _partition: 1,
      type: 1,
      name: 1,
      storeNumber: {
        $arrayElemAt: [
          { $split:[
            '$_partition', ' '
            ]
          }, 1 ]
      }
    }");
