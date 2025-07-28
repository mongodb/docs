function project() {
  //start project
  const pipeline = [
    {
      $project: {
        title: 1, 
        plot: 1
      }
    }
  ];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end project
}

function projectExclude() {
  //start projectExclude
  const pipeline = [
    {
      $project: {
        type: 0
      }
    }
  ];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end projectExclude
}

function projectExcludeID() {
  //start projectExcludeID
  const pipeline = [
    {
      $project: {
        _id: 0, 
        title: 1,
        plot: 1 
      }
    }
  ];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end projectExcludeID
}

function projectExcludeEmbedded() {
  //start projectExcludeEmbedded
  const pipeline = [
    {
      $project: {
        "imdb.id": 0, 
        type: 0
      }
    }
  ];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end projectExcludeEmbedded
}

function projectConditional() {
  //start projectConditional
  const pipeline = [
    {
      $project: {
        title: 1,
        "imdb.id": 1, 
        "imdb.rating": 1,
        "imdb.votes": {
          $cond: {
            if: { $eq: ["$imdb.votes", ""] },
            then: "$REMOVE",
            else: "$imdb.votes"
          }
        }
      }
    }
  ];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end projectConditional
}

function projectComputed() {
  //start projectComputed
  const pipeline = [
    {
      $project: {
        _id: "$_id",
        title: "$title",
        leadActor: { $arrayElemAt: ["$cast", 0] }
      }
    }
  ];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end projectComputed
}

function projectArrayFields(){
  //start projectArrayFields
  const pipeline = [
    {
      $project: {
        _id: "$_id",
        title: "$title",
        leadActor: { $arrayElemAt: ["$cast", 0] },
        crew: { $concatArrays: ["$directors", "$writers"] }
      }
    }
  ];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end projectArrayFields
}

function projectNull(){
  //start projectNull
  const pipeline = [
    {
      $project: {
        crew: ["$directors", "$writers", "$makeupArtists"]
      }
    }
  ];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end projectNull
}