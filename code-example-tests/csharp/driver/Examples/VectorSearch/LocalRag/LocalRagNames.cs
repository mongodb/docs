namespace Examples.VectorSearch.LocalRag;

/// <summary>
///     Field and index names used by the local RAG example.
///     <para>
///         The tutorial documents an <c>embeddings</c> field and a
///         <c>vector_index</c> index on <c>sample_airbnb.listingsAndReviews</c>.
///         The tested code uses distinct names so this suite cannot collide with
///         the PyMongo local RAG suite, which writes 1024-dimension vectors to
///         <c>embeddings</c> and builds a <c>vector_index</c> of the same name on
///         the same collection. The Ollama model used here produces
///         768-dimension vectors, so sharing either name would break both
///         suites whenever they run against the same deployment.
///     </para>
///     <para>
///         Bluehawk replace terms substitute the documented names back into the
///         published snippets, so readers still see <c>embeddings</c> and
///         <c>vector_index</c>.
///     </para>
/// </summary>
public static class LocalRagNames
{
    public const string EmbeddingsFieldName = "embeddings_csharp";
    public const string VectorIndexName = "local_rag_csharp_index";
}
