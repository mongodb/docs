namespace QueryableEncryption
{
    internal static class Run
    {
        private static void Main(string[] args)
        {
            MakeDataKey.MakeKey();
            InsertEncryptedDocument.Insert();
        }
    }
}
