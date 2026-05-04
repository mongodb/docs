using Aggregation;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Projection;

public static class ProjectExamples
{
    static string _uri = Environment.GetEnvironmentVariable("MONGODB_URI"); 
    
    static IMongoCollection<Movie> movieCollection = new MongoClient(_uri)
        .GetDatabase("sample_mflix")
        .GetCollection<Movie>("movies");
    
    public static BsonDocument Include()
    {
        // start include
        var pipeline = new EmptyPipelineDefinition<Movie> ()
            .Project(
                Builders<Movie>.Projection
                    .Include(m => m.Title)
                    .Include(m => m.Plot)
            );

        var result = movieCollection.Aggregate(pipeline).FirstOrDefault();
        // end include

        return result;
    }

    public static BsonDocument ExcludeFields()
    {
        // start excludeFields
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Project(
                Builders<Movie>.Projection
                    .Exclude(m => m.Type)
            );

        var result = movieCollection.Aggregate(pipeline).FirstOrDefault();
        // end excludeFields
        
        return result;
    }

    public static BsonDocument ExcludeId()
    {
        // start excludeId
        var pipeline = new EmptyPipelineDefinition<Movie> ()
            .Project(
                Builders<Movie>.Projection
                    .Exclude(m => m.Id)
                    .Include(m => m.Title)
                    .Include(m => m.Plot)
            );

        var result = movieCollection.Aggregate(pipeline).FirstOrDefault();
        // end excludeId
        
        return result;
    }

    public static BsonDocument ExcludeFieldsEmbedded()
    {
        // start excludeFieldsEmbedded
        var pipeline = new EmptyPipelineDefinition<Movie> ()
            .Project(
                Builders<Movie>.Projection
                    .Exclude("Imdb.id")
                    .Exclude(m => m.Type)
            );

        var result = movieCollection.Aggregate(pipeline).FirstOrDefault();
        // end excludeFieldsEmbedded
        
        return result;
    }

    public static BsonDocument ExcludeFieldsConditional()
    {
        // start excludeFieldsConditional
        var stage = new BsonDocument
        {
            { "title", 1 },
            { "imdb.id", 1 },
            { "imdb.rating", 1 },
            {
                "imdb.votes", new BsonDocument("$cond", new BsonDocument
                {
                    { "if", new BsonDocument("$eq", new BsonArray { "", "$imdb.votes" }) },
                    { "then", "$$REMOVE" },
                    { "else", "$imdb.votes" }
                })
            }
        };

        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Project(stage)
            .Sample(1);

        var result = movieCollection.Aggregate(pipeline).FirstOrDefault();
        // end excludeFieldsConditional
        
        return result;
    }

    public static ProjectedMovie IncludeFieldsComputed()
    {
        // start includeFieldsComputed
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Project(
                Builders<Movie>
                    .Projection
                    .Expression(m => new ProjectedMovie
                    {
                        Id = m.Id,
                        Title = m.Title,
                        LeadActor = m.Cast[0],
                    })
            );

        var result = movieCollection.Aggregate(pipeline).FirstOrDefault();
        // end includeFieldsComputed
        
        return result; 
    }
    
    public static ProjectedMovie NewArrayFields()
    {
        // start newArrayFields
        var pipeline = new EmptyPipelineDefinition<Movie> ()
            .Project(
                Builders<Movie>
                    .Projection
                    .Expression(m => new ProjectedMovie
                        {
                            Id = m.Id,
                            Title = m.Title,
                            LeadActor = m.Cast[0],
                            Crew = m.Directors.Concat(m.Writers).ToList()
                        }
                    )
            )
            .Sample(1);

        var result = movieCollection.Aggregate(pipeline).FirstOrDefault();
        // end newArrayFields
        
        return result;
    }

    public static BsonDocument NonExistentNewArrayFields()
    {
        // start nonExistentNewArrayFields
        var stage = new BsonDocument
        {
            { "crew", new BsonArray { "$directors", "$writers", "$makeupArtists" } }
        };

        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Project(stage)
            .Sample(1);
        var result = movieCollection.Aggregate(pipeline).FirstOrDefault();
        // end nonExistentNewArrayFields
        
        return result;
    } 
}