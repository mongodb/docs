try
{
    await realm.Subscriptions.WaitForSynchronizationAsync();
}
catch (SubscriptionException ex)
{
    // do something in response to the exception or log it
    Console.WriteLine($@"The subscription set's state is Error and synchronization is paused:  {ex.Message}");
}
