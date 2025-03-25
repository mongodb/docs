using MyCompany.RAG.Local;

var qaTaskCoordinator = new PerformQuestionAnswer();
const string query = "beach house";
var results = await qaTaskCoordinator.SummarizeResults(query);
Console.WriteLine(results);
