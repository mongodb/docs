mongosh --eval
'console.log(db.aggregate([{$querySettings:{}}]).toArray())'
