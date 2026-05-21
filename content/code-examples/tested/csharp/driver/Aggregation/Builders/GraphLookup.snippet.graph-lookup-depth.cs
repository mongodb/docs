var pipeline = new EmptyPipelineDefinition<Employee>()
    .GraphLookup<Employee, Employee, Employee, string, string, string, List<Employee>, Employee>(
        from: _collection,
        connectFromField: e => e.ReportsTo!,
        connectToField: e => e.Name,
        startWith: e => e.ReportsTo!,
        @as: e => e.ReportingHierarchy,
        new AggregateGraphLookupOptions<Employee, Employee, Employee>
        {
            MaxDepth = 1
        });
