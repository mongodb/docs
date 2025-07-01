If you deployed Search Nodes, consider the following: 

- Avoid sorting the results by ``searchScore`` because it can be
  different across Search Nodes. 
- To calculate ``searchScore``, a host takes into consideration all the
  documents that exist on it, including deleted documents that have not
  yet been removed from the index. Since the deletion occurs
  independently on each host, this might cause changes in
  ``searchScore`` depending on which host the query is routed to. 
  
To support pagination when sorting by ``searchScore`` on Search Nodes,
upvote :ftsuservoice:`this request </suggestions/49673555-support-pagination-when-sorting-by-searchscore-on>` 
in the MongoDB Feedback Engine.