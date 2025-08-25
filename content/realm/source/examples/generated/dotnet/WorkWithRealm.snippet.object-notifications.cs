    var artist = realm.All<Person>()
        .FirstOrDefault(p => p.Name == "Elvis Presley");

    artist.PropertyChanged += (sender, eventArgs) =>
    {
        var changedProperty = eventArgs.PropertyName!;

        Debug.WriteLine(
            $@"New value set for 'artist':
            '{changedProperty}' is now {artist.GetType()
            .GetProperty(changedProperty).GetValue(artist)}");
    };

    realm.Write(() =>
    {
        artist.Name = "Elvis Costello";
    });

    realm.Refresh();
}
