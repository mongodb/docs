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
