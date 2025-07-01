using MyCompany.RAG;

var query = "AI Technology";
var queryCoordinator = new PerformTestQuery();
var result = await queryCoordinator.GetQueryResults(query);
Console.WriteLine(result);
