using MyCompany.RAG;

var question = "In a few sentences, what are MongoDB's latest AI announcements?";
var ragPipeline = new RAGPipeline();
var result = await ragPipeline.GenerateResults(question);
Console.WriteLine(result);
