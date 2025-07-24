using MongoDB.Bson;
using MongoDB.Driver;

public class SearchIndexes
{

  public static void Main(string[] args)
  {
    // Replace with your connection string
    const string uri = "<connection string>";

    var mongoClient = new MongoClient(uri);
    var database = mongoClient.GetDatabase("sample_mflix");
    var movieCollection = database.GetCollection<BsonDocument>("embedded_movies");

    // begin-as-model
    var def = new BsonDocument {
      { "mappings", new BsonDocument {
          { "dynamic", false },
          { "fields", new BsonDocument {
            { "title", new BsonDocument { {"type", "string" } } },
            { "released", new BsonDocument { { "type", "date" } } } } }
      } }
    };

    var indexModel = new CreateSearchIndexModel(
      "search_idx",
      SearchIndexType.Search,
      def
    );
    // end-as-model

    // begin-avs-model
    var def = new BsonDocument
    {
        { "fields", new BsonArray
            {
                new BsonDocument
                {
                    { "type", "vector" },
                    { "path", "plot_embedding" },
                    { "numDimensions", 1536 },
                    { "similarity", "euclidean" }
                }
            }
        }
    };


    var indexModel = new CreateSearchIndexModel(
      "vs_idx",
      SearchIndexType.VectorSearch,
      def
    );
    // end-avs-model

    // begin-atlas-create-one
    var indexModel = new CreateSearchIndexModel(
      "example_index",
      SearchIndexType.Search,
      new BsonDocument {
        { "mappings", new BsonDocument {
          { "dynamic", true },
        } }
      }
    );

    var result = movieCollection.SearchIndexes.CreateOne(indexModel);
    Console.WriteLine("Created Atlas Search index:\n{0}", result);
    // end-atlas-create-one

    // begin-atlas-create-many
    var searchModel = new CreateSearchIndexModel(
      "as_idx",
      SearchIndexType.Search,
      new BsonDocument {
        { "mappings", new BsonDocument {
          { "dynamic", true },
        } }
      }
    );

    var vectorModel = new CreateSearchIndexModel(
      "vs_idx",
      SearchIndexType.VectorSearch,
      new BsonDocument
      {
          { "fields", new BsonArray
              {
                  new BsonDocument
                  {
                      { "type", "vector" },
                      { "path", "plot_embedding" },
                      { "numDimensions", 1536 },
                      { "similarity", "euclidean" }
                  }
              }
          }
      }
    );

    var models = new List<CreateSearchIndexModel> { searchModel, vectorModel };
    var indexes = movieCollection.SearchIndexes.CreateMany(models);
    Console.WriteLine("Created Search indexes:\n{0} {1}", indexes.ToArray());
    // end-atlas-create-many

    // begin-atlas-list
    var indexesList = movieCollection.SearchIndexes.List().ToList();
    foreach (var i in indexesList)
    {
      Console.WriteLine(i);
    }
    // end-atlas-list

    // begin-atlas-update
    var updatedDef = new BsonDocument
    {
        { "fields", new BsonArray
            {
                new BsonDocument
                {
                    { "type", "vector" },
                    { "path", "plot_embedding" },
                    { "numDimensions", 1536 },
                    { "similarity", "dotProduct" }
                }
            }
        }
    };

    movieCollection.SearchIndexes.Update("vs_index", updatedDef);
    // end-atlas-update

    // begin-atlas-drop
    movieCollection.SearchIndexes.DropOne("example_index");
    // end-atlas-drop
  }
}
