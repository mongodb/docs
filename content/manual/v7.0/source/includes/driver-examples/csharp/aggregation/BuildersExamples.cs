using System.IO.Pipelines;
using System.Reflection.Metadata;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Aggregation;

public static class AggregationBuilders
{
    public static void BucketStage()
    {
        // start bucket
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Bucket(
                groupBy: m => m.Runtime,
                boundaries: new List<int>() { 0, 71, 91, 121, 151, 201, 999 });
        // end bucket
    }

    public static void BucketOptionsStage()
    {
        // start bucketOptions
        var bucketOptions = new AggregateBucketOptions<BsonValue>()
        {
            DefaultBucket = (BsonValue)"Other"
        };

        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Bucket(
                groupBy: m => m.Runtime,
                boundaries: new List<BsonValue>() { 0, 71, 91, 121, 151, 201, 999 },
                options: bucketOptions);
        // end bucketOptions
    }

    public static void BucketAutoStage()
    {
        // start bucketAuto
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .BucketAuto(
                groupBy: m => m.Runtime,
                buckets: 5);
        // end bucketAuto
    }

    public static void BucketAutoOptionsStage()
    {
        // start bucketAutoOptions
        var bucketAutoOptions = new AggregateBucketAutoOptions()
        {
            Granularity = new AggregateBucketAutoGranularity("POWERSOF2")
        };

        var pipeline = new EmptyPipelineDefinition<Movie>()
            .BucketAuto(
                groupBy: m => m.Runtime,
                buckets: 5,
                options: bucketAutoOptions);
        // end bucketAutoOptions
    }

    public static void ChangeStreamStage()
    {
        // start changeStream
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .ChangeStream();
        // end changeStream
    }
    
    public static void ChangeStreamOptionsStage()
    {
        // start changeStreamOptions
        var changeStreamOptions = new ChangeStreamStageOptions()
        {
            FullDocument = ChangeStreamFullDocumentOption.Default,
            StartAtOperationTime = new BsonTimestamp(300),
        };
        
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .ChangeStream(changeStreamOptions);
        // end changeStreamOptions
    }

    public static void ChangeStreamSplitLargeEventStage()
    {
        // start changeStreamSplitLargeEvent
        var pipeline = new EmptyPipelineDefinition<ChangeStreamDocument<Movie>>()
            .ChangeStreamSplitLargeEvent();
        // end changeStreamSplitLargeEvent
    }

    public static void CountStage()
    {
        // start count
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Count();
        // end count
    }

    public static void DensifyStage()
    {
        // start densify
        var densifyTimeRange = new DensifyDateTimeRange(
            new DensifyLowerUpperDateTimeBounds(
                lowerBound: new DateTime(1984, 3, 5, 8, 0, 0),
                upperBound: new DateTime(1984, 3, 5, 9, 0, 0)
            ),
            step: 15,
            unit: DensifyDateTimeUnit.Minutes
        );

        var pipeline = new EmptyPipelineDefinition<Weather>()
            .Densify(
                field: w => w.Timestamp,
                range: densifyTimeRange,
                partitionByFields: [w => w.Position.Coordinates]);
        // end densify
    }
    
    public static void DocumentsStage()
    {
        // start documents
        var documentArray = new[]
        {
            new BsonDocument {{ "title", "The Shawshank Redemption" }},
            new BsonDocument {{ "title", "Back to the Future" }},
            new BsonDocument {{ "title", "Jurassic Park" }},
        };
        
        var pipeline = new EmptyPipelineDefinition<NoPipelineInput>()
            .Documents(documentArray);
        // end documents
    }
    
    public static void FacetStage()
    {
        // start facet
        var bucketPipeline = new EmptyPipelineDefinition<Movie>()
            .BucketAuto(
                groupBy: m => m.Runtime,
                buckets: 5);
        var bucketFacet = AggregateFacet.Create(
            name: "Runtimes",
            pipeline: bucketPipeline);

        var countLimitPipeline = new EmptyPipelineDefinition<Movie>()
            .SortByCount(m => m.Rated)
            .Limit(5);
        var countFacet = AggregateFacet.Create(
            "Ratings", countLimitPipeline);
        
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Facet(bucketFacet, countFacet);
        // end facet
    }

    public static void GeoNearStage()
    {
        // start geoNear
        var pipeline = new EmptyPipelineDefinition<Theater>()
            .GeoNear(
                GeoJson.Point(GeoJson.Geographic(-74.1, 40.95)),
                new GeoNearOptions<Theater, Theater>
                {
                  DistanceField = "distance",
                  MaxDistance = 8000,
                  Key = "location.geo",
                  Query = Builders<Theater>.Filter.Eq(t => t.Location.Address.State, "NJ"),
                });
        // end geoNear
    
        // start geoNear min
        var pipeline = new EmptyPipelineDefinition<Theater>()
            .GeoNear(
                GeoJson.Point(GeoJson.Geographic(-74.1, 40.95)),
                new GeoNearOptions<Theater, Theater>
                {
                  DistanceField = "distance",
                  MinDistance = 8000,
                  Key = "location.geo",
                  Query = Builders<Theater>.Filter.Eq(t => t.Location.Address.State, "NJ"),
                })
            .Limit(4);
        // end geoNear min
    }

    public static void GraphLookupStage()
    {
        // start graphLookupBasic
        var pipeline = new EmptyPipelineDefinition<Employee>()
            .GraphLookup<Employee, Employee, Employee, Employee, string, Employee, List<Employee>, Employee>(
                from: employeeCollection,
                connectFromField: e => e.ReportsTo,
                connectToField: e => e.Name,
                startWith: e => e.ReportsTo,
                @as: e => e.ReportingHierarchy);
        // end graphLookupBasic
    }
 
    public static void GraphLookupMatchStage()
    {
        var client = new MongoClient("mongodb://localhost:27017");
        // start graphLookupMatch
        var employeeCollection = client.GetDatabase("aggregation_examples").GetCollection<Employee>("employees");
        var pipeline = new EmptyPipelineDefinition<Employee>()
            .GraphLookup<Employee, Employee, Employee, Employee, string, Employee, List<Employee>, Employee>(
                from: employeeCollection,
                connectFromField: e => e.ReportsTo,
                connectToField: e => e.Name,
                startWith: e => e.ReportsTo,
                @as: e => e.ReportingHierarchy,
                new AggregateGraphLookupOptions<Employee, Employee, Employee>
                {
                    MaxDepth = 1,
                    RestrictSearchWithMatch = Builders<Employee>.Filter.AnyEq(e => e.Hobbies, "golf") 
                });
        // end graphLookupMatch
    }

    public static void GraphLookupDepthStage()
    {
        var client = new MongoClient("mongodb://localhost:27017");
        // start graphLookupDepth
        var employeeCollection = client.GetDatabase("aggregation_examples").GetCollection<Employee>("employees");
        
        var pipeline = new EmptyPipelineDefinition<Employee>()
            .GraphLookup<Employee, Employee, Employee, Employee, string, Employee, List<Employee>, Employee>(
                from: employeeCollection,
                connectFromField: e => e.ReportsTo,
                connectToField: e => e.Name,
                startWith: e => e.ReportsTo,
                @as: e => e.ReportingHierarchy,
                new AggregateGraphLookupOptions<Employee, Employee, Employee>
                {
                    MaxDepth = 1
                });
        // end graphLookupDepth
    }
    
    public static void GroupStage()
    {
        // start group
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Group(
                id: m => m.Rated,
                group: g => new
                {
                    Rating = g.Key,
                    TotalRuntime = g.Sum(m => m.Runtime),
                    MedianRuntime = g.Select(m => m.Runtime).Median(),
                    NinetiethPercentileRuntime = g.Select(m => m.Runtime).Percentile(new[] { 0.9 })
                }
            );
        // end group
    }
    
    public static void LimitStage()
    {
        // start limit
        var pipeline = new EmptyPipelineDefinition<BsonDocument>()
            .Limit(10);
        // end limit
    }
    
    public static void LookupStage()
    {
        var client = new MongoClient("mongodb://localhost:27017");
        // start lookup
        var commentCollection = client
            .GetDatabase("aggregation_examples")
            .GetCollection<Comment>("comments");
        
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Lookup<Movie, Movie, Comment, Movie>(
                foreignCollection: commentCollection,
                localField: m => m.Id,
                foreignField: c => c.MovieId,
                @as: m => m.Comments);
        // end lookup
    }
    
    public static void MatchStage()
    {
        // start match
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Match(m => m.Title == "The Shawshank Redemption");
        // end match
    }
    
    public static void MergeStage()
    {
        var client = new MongoClient("mongodb://localhost:27017");
        // start merge
        var movieCollection = client
            .GetDatabase("sample_mflix")
            .GetCollection<Movie>("movies");
        
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Merge(movieCollection,
                new MergeStageOptions<Movie>(
                {
                    OnFieldNames = new List<string>() {"id", "title"},
                    WhenMatched = MergeStageWhenMatched.Replace,
                    WhenNotMatched = MergeStageWhenNotMatched.Insert,
                });
        // end merge
    }
    
    public static void OutStage()
    {
        var client = new MongoClient("mongodb://localhost:27017");
        // start out
        var movieCollection = client
            .GetDatabase("sample_mflix")
            .GetCollection<Movie>("movies");
        
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Out(movieCollection);
        // end out
    }
    
    public static void ProjectStage()
    {
        // start project
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Project(m => new { m.Title, m.Plot });
        // end project
    }

    public static void ProjectComputedStage()
    {
        // start projectComputed
        var pipeline = new EmptyPipelineDefinition<Movie> ()
            .Project(
                Builders<Movie>
                    .Projection
                    .Expression(m => new { Rating = m.Rated, })
            );
        // end projectComputed
    }
    
    public static void ReplaceRootStage()
    {
        // start replaceRoot
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .ReplaceRoot(m => m.ImdbData);
        // end replaceRoot
    }
    
    public static void ReplaceWithStage()
    {
        // start replaceWith
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .ReplaceWith(m => m.ImdbData);
        // end replaceWith
    }

    public static void SampleStage()
    {
        // start sample
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Sample(5);
        // end sample
    }

    public static void SearchStage()
    {
        // start search
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Search(
                Builders<Movie>.Search.Text(
                    Builders<Movie>.SearchPath.Single(m => m.Title), "Future"));  
        // end search
    }

    public static void SearchMetaStage()
    {
        // start searchMeta
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .SearchMeta(Builders<Movie>.Search.Near(
                path: m => m.Year,
                origin: 2010,
                pivot: 1));
        // end searchMeta
    }

    public static void SetStage()
    {
        // start set
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Set(Builders<Movie>.SetFields.Set(m => m.LastUpdated, DateTime.Now));
        // end set
    }
    
    public static void SetWindowFieldsStage()
    {
        // start setWindowFields
        var pipeline = new EmptyPipelineDefinition<WeatherMeasurement>()
            .SetWindowFields(
                partitionBy: w => w.LocalityId,
                sortBy: Builders<WeatherMeasurement>.Sort.Ascending(
                    w => w.MeasurementDateTime),
                output: o => new
                {
                    MonthlyRainfall = o.Sum(
                        w => w.Rainfall, RangeWindow.Create(
                            RangeWindow.Months(-1),
                            RangeWindow.Current)
                    ),
                    TemperatureAvg = o.Average(
                        w => w.Temperature, RangeWindow.Create(
                            RangeWindow.Months(-1),
                            RangeWindow.Current)
                    ),
                    MedianTemperature = o.Median(
                        w => w.Temperature,
                        RangeWindow.Create(
                            RangeWindow.Months(-1),
                            RangeWindow.Current)
                    ),
                    NinetiethPercentileRainfall = o.Percentile(
                        w => w.Rainfall,
                        new[] { 0.9 },
                        RangeWindow.Create(
                            RangeWindow.Months(-1),
                            RangeWindow.Current)
                    )
                }
            );
        // end setWindowFields
    }
   
    public static void SkipStage()
    {
         // start skip
         var pipeline = new EmptyPipelineDefinition<Movie>()
             .Skip(5);
         // end skip
     }

    public static void SortStage()
    {
        // start sort
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Sort(Builders<Movie>.Sort.Combine(
                Builders<Movie>.Sort.Descending(m => m.Year),
                Builders<Movie>.Sort.Ascending(m => m.Title)));
        // end sort
    }

    public static void SortByCountStage()
    {
        // start sortByCount
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .SortByCount(m => m.Rated);
        // end sortByCount
    }

    public static void UnionWithStage()
    {
        var client = new MongoClient("localhost://27017");
        // start unionWith
        var firstMovieCollection = client.GetDatabase("sample_mflix").GetCollection<Movie>("movies");
        var secondMovieCollection = client.GetDatabase("sample_mflix").GetCollection<Movie>("Movies");

        var pipeline = new EmptyPipelineDefinition<Movie>()
            .UnionWith(
                withCollection: secondMovieCollection,
                withPipeline: new EmptyPipelineDefinition<Movie>());
        
        var allMovieDocuments = firstMovieCollection.Aggregate(pipeline); 
        // end unionWith
    }
    
    public static void UnwindStage()
    {
        // start unwind
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Unwind(m => m.Genres);
        // end unwind
    }
    
    public static void UnwindPreserveStage()
    {
        // start unwindPreserve
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Unwind(m => m.Genres,
                new AggregateUnwindOptions<Movie>()
                {
                   PreserveNullAndEmptyArrays = true,
                   IncludeArrayIndex = new ExpressionFieldDefinition<Movie, int>(
                       m => m.Index) 
                });
        // end unwindPreserve
    }
}