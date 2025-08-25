public void SetupRealm()
{
    var appConfig = new AppConfiguration(myRealmAppId);
    app = App.Create(appConfig);
    user = app.LogInAsync(Credentials.Anonymous()).Result;
    config = new PartitionSyncConfiguration("myPartition", user);
    try
    {
        var realm = Realm.GetInstance(config);
        var session = realm.SyncSession;
        session.PropertyChanged += SyncSessionPropertyChanged!;
        realm.Dispose();
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.Message);
    }
}

private void SyncSessionPropertyChanged(object sender, PropertyChangedEventArgs e)
{
    if (e.PropertyName == nameof(Session.ConnectionState))
    {
        var session = (Session)sender;
        var currentState = session.ConnectionState;

        if (currentState == ConnectionState.Connecting)
        {
            //session is connecting
        }

        if (currentState == ConnectionState.Connected)
        {
            //session is connected
        }

        if (currentState == ConnectionState.Disconnected)
        {
            //session has been disconnected
        }
    }
}
