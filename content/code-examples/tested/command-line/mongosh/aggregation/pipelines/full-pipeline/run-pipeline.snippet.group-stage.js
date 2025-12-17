{
    $group : {
    _id : "$directors",
    movieCount : {
        $sum: 1
        }
    }
},
