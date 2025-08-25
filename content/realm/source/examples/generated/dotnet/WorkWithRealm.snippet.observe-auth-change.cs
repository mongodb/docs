app.CurrentUser.Changed += (change, _) =>
{
    Debug.WriteLine($"Auth change: {change}, {_}");
};
