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
