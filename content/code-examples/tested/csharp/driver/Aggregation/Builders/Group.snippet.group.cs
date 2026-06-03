var pipeline = new EmptyPipelineDefinition<Movie>()
    .Group(
        id: m => m.Rated,
        group: g => new
        {
            Rating = g.Key,
            TotalRuntime = g.Sum(m => m.Runtime),
            MedianRuntime = g.Select(m => m.Runtime).Median(),
            NinetiethPercentileRuntime =
                g.Select(m => m.Runtime).Percentile(new[] { 0.9 })
        }
    );
