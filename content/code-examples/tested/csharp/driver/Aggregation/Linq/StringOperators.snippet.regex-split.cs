var query = queryableCollection
    .Select(r => new
    {
        r.Cuisine,
        Parts = Regex.Split(r.Cuisine, @",\s*")
    });
