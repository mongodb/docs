realm.WriteAsync(() =>
{
    realm.Add(new Company
    {
        Location = new CustomGeoPoint(47.68, -122.35)
    });
    realm.Add(new Company
    {
        Location = new CustomGeoPoint(47.9, -121.85)
    });
});
