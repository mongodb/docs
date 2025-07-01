namespace MyCompany.RAG;

using System;
using System.Net.Http;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Text;

using UglyToad.PdfPig;
using UglyToad.PdfPig.Content;

public class PdfIngester
{
    public async Task<String> DownloadPdf(string url, string path, string fileName)
    {
        using (HttpClient client = new HttpClient())
        {
            try
            {
                byte[] pdfBytes = await client.GetByteArrayAsync(url);
                await File.WriteAllBytesAsync(path + fileName, pdfBytes);
                return "PDF downloaded and saved to " + path + fileName;
            }
            catch (HttpRequestException e)
            {
                throw new ApplicationException("Error downloading the PDF: " + e.Message);
            }
            catch (IOException e)
            {
                throw new ApplicationException("Error writing the file to disk: " + e.Message);
            }
        }
    }
    
    public List<string> ConvertPdfToChunkedText(string filePath)
    {
        List<string> textChunks;
        using (var document = PdfDocument.Open(filePath))
        {
            StringBuilder fullText = new StringBuilder();
            foreach (Page page in document.GetPages())
            {
                fullText.Append(page.Text + "\n");
            }
            textChunks = ChunkText(fullText.ToString(), 400, 20);
        }
        var chunkCount = textChunks.Count;
        if (chunkCount == 0)
        {
            throw new ApplicationException("Unable to chunk PDF contents into text.");
        }
        Console.WriteLine($"Successfully chunked the PDF text into {chunkCount} chunks.");
        return textChunks;
    }
    
    static List<string> ChunkText(string text, int chunkSize, int overlap)
    {
        List<string> chunks = new List<string>();
        int start = 0;
        int textLength = text.Length;
        while (start < textLength)
        {
            int end = start + chunkSize;
            if (end > textLength)
            {
                end = textLength;
            }
            string chunk = text.Substring(start, end - start);
            chunks.Add(chunk);
            // Increment starting point, considering the overlap
            start += chunkSize - overlap;
            if (start >= textLength) break;
        }
        return chunks;
    }
}