var session = realm.SyncSession;
var token = session.GetProgressObservable(ProgressDirection.Upload,
    ProgressMode.ReportIndefinitely)
        .Subscribe(progress =>
        {
            Console.WriteLine($@"Current upload progress:
                {progress.ProgressEstimate * 100}%");
        });
token.Dispose();
