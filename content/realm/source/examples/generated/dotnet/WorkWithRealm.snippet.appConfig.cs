var appConfig = new AppConfiguration(myRealmAppId)
{
    DefaultRequestTimeout = TimeSpan.FromMilliseconds(1500)
};

app = App.Create(appConfig);
