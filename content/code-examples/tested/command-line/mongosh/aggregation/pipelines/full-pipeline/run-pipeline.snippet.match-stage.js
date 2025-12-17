{
    $match : {
        "directors" : { $exists: true, $ne: null, $not: {$size: 0} }
    }
},
