db.t.insertMany([
    // Empty array
    { a: [ ] },

    // Bool array
    { a: [
            false, true,  true,  true,
            true,  true,  true,  true,
            false, false, false, false,
            false, true,  true,  true
         ]
    },

    // Int array 
    { a: [NumberInt(0), NumberInt(1), NumberInt(0), NumberInt(10)] },
    
    // Double array 
    { a: [ Double(0.0), Double(1.0), Double(0.0), Double(1.0), Double(3.14) ] },
])
