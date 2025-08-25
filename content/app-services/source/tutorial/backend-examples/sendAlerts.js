exports = async function(changeEvent) {
  
  // Read the summary field from the latest inserted document
  const fullDocument = changeEvent.fullDocument;
  const summary = fullDocument.summary;

  // Connect to your Atlas deployment    
  const mongodb = context.services.get("mongodb-atlas");

  // Read task and alert data from collections in the todo database
  const tasks = mongodb.db("todo").collection("Item");
  const alerts = mongodb.db("todo").collection("alerts");
  const terms = await alerts.distinct("term");
  
  // Check if the task summary matches any of the terms in the alerts collection
  for (let i = 0; i < terms.length ; i++) {
    if (summary.toLowerCase().includes(terms[i])) {
      console.log("The following task has been added to a to-do list: " + summary +
        ". You've been alerted because it contains the term, " + terms[i] + ".");

      // Aggregates any tasks that also contain the term by using an Atlas Search query
      const query = await tasks
      .aggregate([
        {
          $search: {
            compound: {
              must: [{
                phrase: {
                  query: terms[i],
                  path: "summary",
                },
              }], 
              mustNot: [{
                equals: {
                path: "isComplete",
                value: true,
                },
              }],
            },
          },
        },
        {
          $limit: 5,
        },
        {
          $project: {
            _id: 0,
            summary: 1,
          },
        },
      ])
      .toArray();
      
      relatedTerms = JSON.stringify(query);

      if (relatedTerms != '[]') {
        console.log("Related incomplete tasks: " + relatedTerms);
      }
    }
  }
};
