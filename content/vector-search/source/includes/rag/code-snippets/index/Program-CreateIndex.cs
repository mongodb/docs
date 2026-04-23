using MyCompany.RAG;

var dataService = new MongoDBDataService();
var result = dataService.CreateVectorIndex();
Console.WriteLine(result);
