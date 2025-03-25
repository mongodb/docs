using query_quick_start;

var dataService = new DataService();
var results = dataService.PerformVectorQuery();
if (results != null)
{
	foreach (var document in results)
	{
		Console.WriteLine(document);
	}
}
else
{
	Console.WriteLine("The query returned no results.");
}