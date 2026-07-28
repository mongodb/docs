using MyCompany.RAG;

const string pdfUrl = "https://investors.mongodb.com/node/12236/pdf";
const string savePath = "<path-name>";
const string fileName = "investor-report.pdf";

var pdfIngester = new PdfIngester();
var pdfDownloadResult = await pdfIngester.DownloadPdf(pdfUrl, savePath, fileName);
Console.WriteLine(pdfDownloadResult);

var textChunks = pdfIngester.ConvertPdfToChunkedText(savePath + fileName);

if (textChunks.Any()) {
    var embeddingGenerator = new EmbeddingGenerator();
    var embeddingGenerationResult = await embeddingGenerator.GenerateEmbeddings(textChunks);
    Console.WriteLine(embeddingGenerationResult);
}
