using MyCompany.RAG.Local;

var query = "beach house";
var queryCoordinator = new PerformTestQuery();
var result = await queryCoordinator.GetQueryResults(query);
Console.WriteLine(result);
