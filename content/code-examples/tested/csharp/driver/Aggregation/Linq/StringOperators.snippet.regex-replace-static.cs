var query = queryableCollection
    .Select(r => new
    {
        r.Name,
        Updated = Regex.Replace(r.Name, "cafe",
            "Coffee Shop", RegexOptions.IgnoreCase)
    });
