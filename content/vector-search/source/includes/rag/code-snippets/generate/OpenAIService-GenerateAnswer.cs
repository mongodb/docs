namespace MyCompany.RAG;

using OpenAI.Chat;
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
 private static readonly string? OpenAIApiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
 private static readonly string ChatModelName = "gpt-4o-mini";
 private static readonly ChatClient ChatClient = new(model: ChatModelName, apiKey: OpenAIApiKey);

 public async Task<Dictionary<string, float[]>> GetEmbeddingsAsync(string[] texts)
 {
  // Method details...
 }

 public async Task<string> GenerateAnswer(string question, string context)
 {
  string prompt = $"""
                         Answer the following question based on the given context.
                         Context: {context}
                         Question: {question}
                         """;
  byte[] binaryContent = Encoding.UTF8.GetBytes(prompt);
  IEnumerable<ChatMessage> messages = new List<ChatMessage>([prompt]);
  ChatCompletion responses = await ChatClient.CompleteChatAsync(messages, new ChatCompletionOptions { MaxOutputTokenCount = 400 });
  var summaryResponse = responses.Content[0].Text;
  if (summaryResponse is null)
  {
   throw new ApplicationException("No response from the chat client.");
  }
  return summaryResponse;
 }
 // Rest of code...
}