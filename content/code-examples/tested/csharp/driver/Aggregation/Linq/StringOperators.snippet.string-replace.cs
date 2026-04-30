var query = queryableCollection
    .Select(r => new
    {
        r.Name,
        Updated = r.Name.Replace("Cafe", "Coffee Shop")
    });
