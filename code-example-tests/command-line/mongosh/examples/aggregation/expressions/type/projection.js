db.coll.aggregate([{
    $project: {
       a : { $type: "$a" }
    }
}])