var pattern = new Regex("cafe", RegexOptions.IgnoreCase);
var query = queryableCollection
    .Select(r => new
    {
        r.Name,
        Updated = pattern.Replace(r.Name, "Coffee Shop")
    });
