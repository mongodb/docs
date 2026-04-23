using MyCompany.RAG.Local;

var embeddingGenerator = new EmbeddingGenerator();
var result = await embeddingGenerator.GenerateEmbeddings();
Console.WriteLine(result);
