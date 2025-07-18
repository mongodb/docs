// Check progress
curl mongosync01Host:27601/api/v1/progress -XGET

// Commit 
curl mongosync01Host:27601/api/v1/commit -XPOST --data '{}'
