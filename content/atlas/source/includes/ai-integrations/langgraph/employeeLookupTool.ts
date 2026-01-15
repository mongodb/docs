  const executeQuery = async (embedding:[], n: number) => {
    try {
        const client = new MongoClient(process.env.MONGODB_URI as string);
        const database = client.db("hr_database");
        const coll = database.collection("employees");
        const agg = [
            {
              '$vectorSearch': {
                'index': 'vector_index',
                'path': 'embedding',
                'queryVector': embedding,
                'numCandidates': 150,
                'limit': n
              }
            }, {
              '$project': {
                '_id': 0,
                'pageContent': 1,
                'score': {
                  '$meta': 'vectorSearchScore'
                }
              }
            }
          ];
        const result = await coll.aggregate(agg).toArray();
        return result

    } catch(error) {
        console.log("Error while querying:", error)
    }
  }

  const fetchEmbeddings = async (query: string) => {
    const apiUrl = "https://ai.mongodb.com/v1/embeddings";  
    const apiKey = process.env.VOYAGEAI_API_KEY;
    const requestBody = {  
      input: query,
      model: "voyage-3.5",  
    };  
    
    try {  
      const response = await fetch(apiUrl, {  
        method: "POST",  
        headers: {  
          Authorization: `Bearer ${apiKey}`,  
          "Content-Type": "application/json",  
        },  
        body: JSON.stringify(requestBody),  
      });  
    
      if (!response.ok) {  
        throw new Error(`Error: ${response.status} ${response.statusText}`);  
      }  
    
      const data = await response.json(); 
      return data.data[0].embedding;
    } catch (error) {  
      console.error("Error while fetching embedding:", error);  
    }  
  };

  const employeeLookupTool = tool(
   async ({ query, n = 10 }) => {
     console.log("Employee lookup tool called");
     const embedding = await fetchEmbeddings(query)
     const response = await executeQuery(embedding, n)
     const result = JSON.stringify(response)
     return result;
   },
   {
     name: "employee_lookup",
     description: "Gathers employee details from the HR database",
     schema: z.object({
       query: z.string().describe("The search query"),
       n: z.number().optional().default(10).describe("Number of results to return"),
     }),
   }
  );

  const tools = [employeeLookupTool];
  const toolNode = new ToolNode<typeof GraphState.State>(tools);
