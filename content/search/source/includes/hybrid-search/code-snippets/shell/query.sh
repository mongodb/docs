vectorWeight = 1;  
vectorCutoff = 0.7; 
numResults = 20;
numCandidates = numResults * 10;  

// Execute the vector search  
vectorResults = db.embedded_movies.aggregate([  
    {  
        $vectorSearch: {  
            index: "hybrid-vector-search", 
            path: "plot_embedding_voyage_3_large",
            queryVector: STAR_WARS_EMBEDDING,
            numCandidates: numCandidates,   
            limit: numResults  
        }  
    },  
    {  
        $project: {  
            _id: 1,  
            title: 1,  
            plot: 1,
            vectorScore: { $meta: "vectorSearchScore" }  
        }  
    },  
    {  
        $match: {  
            vectorScore: { $gte: vectorCutoff }  
        }  
    }  
]).toArray();  

// Create a map for fast lookup  
vectorScoresMap = {};  
vectorResults.forEach(result => {  
    vectorScoresMap[result._id] = result.vectorScore * vectorWeight;  
});  

// Execute the text search with boosting based just on ID  
textResults = db.embedded_movies.aggregate([  
    {  
        $search: {  
            index: "hybrid-full-text-search",  
            compound: {  
                should: [  
                    {  
                        text: {  
                            query: "star wars",  
                            path: "plot"  
                        }  
                    },  
                    ...Object.keys(vectorScoresMap).map(id => ({  
                        equals: {  
                            path: "_id",  
                            value: id,  
                            score: { boost: { value: vectorScoresMap[id] } }  
                        }  
                    }))  
                ]  
            }  
        }  
    },  
    {
        $limit: 20
    },
    {  
        $project: {  
            _id: 1,  
            title: 1,  
            plot: 1,
            score: { $meta: "searchScore" }  
        }  
    }  
]).toArray();  
