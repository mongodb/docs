namespace MyCompany.Embeddings;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

public class AIService
{
    private static readonly string? VoyageApiKey = Environment.GetEnvironmentVariable("VOYAGE_API_KEY");
    private static readonly string EmbeddingModelName = "voyage-3-large";
    private static readonly string ApiEndpoint = "https://ai.mongodb.com/v1/embeddings";
    
    public async Task<Dictionary<string, float[]>> GetEmbeddingsAsync(string[] texts)
    {
        Dictionary<string, float[]> documentData = new Dictionary<string, float[]>();
        
        try
        {
            using HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = 
                new AuthenticationHeaderValue("Bearer", VoyageApiKey);
            
            var requestBody = new
            {
                input = texts,
                model = EmbeddingModelName,
                truncation = true
            };
            
            var content = new StringContent(
                JsonSerializer.Serialize(requestBody),
                Encoding.UTF8,
                "application/json");
            
            HttpResponseMessage response = await client.PostAsync(ApiEndpoint, content);
            
            if (response.IsSuccessStatusCode)
            {
                string responseBody = await response.Content.ReadAsStringAsync();
                var embeddingResponse = JsonSerializer.Deserialize<EmbeddingResponse>(responseBody);
                
                if (embeddingResponse != null && embeddingResponse.Data != null)
                {
                    foreach (var embeddingResult in embeddingResponse.Data)
                    {
                        if (embeddingResult.Index < texts.Length)
                        {
                            documentData[texts[embeddingResult.Index]] = 
                                embeddingResult.Embedding.Select(e => (float)e).ToArray();
                        }
                    }
                }
            }
            else
            {
                throw new ApplicationException($"Error calling Voyage API: {response.ReasonPhrase}");
            }
        }
        catch (Exception e)
        {
            throw new ApplicationException(e.Message);
        }
        
        return documentData;
    }
    
    private class EmbeddingResponse
    {
        [JsonPropertyName("object")]
        public string Object { get; set; } = string.Empty;
        
        [JsonPropertyName("data")]
        public List<EmbeddingResult>? Data { get; set; }
        
        [JsonPropertyName("model")]
        public string Model { get; set; } = string.Empty;
        
        [JsonPropertyName("usage")]
        public Usage? Usage { get; set; }
    }
    
    private class EmbeddingResult
    {
        [JsonPropertyName("object")]
        public string Object { get; set; } = string.Empty;
        
        [JsonPropertyName("embedding")]
        public List<double> Embedding { get; set; } = new();
        
        [JsonPropertyName("index")]
        public int Index { get; set; }
    }
    
    private class Usage
    {
        [JsonPropertyName("total_tokens")]
        public int TotalTokens { get; set; }
    }
}
