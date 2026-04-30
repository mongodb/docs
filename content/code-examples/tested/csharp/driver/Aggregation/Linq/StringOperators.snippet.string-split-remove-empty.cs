var query = queryableCollection
    .Select(r => new
    {
        r.Cuisine,
        Parts = r.Cuisine.Split(',',
            StringSplitOptions.RemoveEmptyEntries)
    });
