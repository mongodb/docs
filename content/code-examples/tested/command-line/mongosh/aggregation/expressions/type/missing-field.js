db.coll.aggregate([  
  {  
    $addFields: {  
      a: {  
        $cond: {  
          if: { $eq: [{ $type: "$a" }, "missing"] },
          then: [], 
          else: "$a"
        }  
      }  
    }  
  }  
])  
