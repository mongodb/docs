// Open a thread-safe transaction.
using (var transaction = realm.BeginWrite())
{
    // At this point, the TransactionState is "Running":
    // transaction.State == TransactionState.Running
    try
    {
        // Perform a write op...
        realm.Add(myDog);
        // Do other work that needs to be included in
        // this transaction
        if (transaction.State == TransactionState.Running)
        {
            transaction.Commit();
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.Message);
        // Something went wrong; roll back the transaction
        if (transaction.State != TransactionState.RolledBack &&
            transaction.State != TransactionState.Committed)
        {
            transaction.Rollback();
        }
    }
}
