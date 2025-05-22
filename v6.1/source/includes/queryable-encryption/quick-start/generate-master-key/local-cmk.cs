using System;
using System.IO;

class Program
{
    public void Main(string []args)
    {
        using (var randomNumberGenerator = System.Security.Cryptography.RandomNumberGenerator.Create())
        {
            var bytes = new byte[96];
            randomNumberGenerator.GetBytes(bytes);
            var localMasterKeyBase64 = Convert.ToBase64String(bytes);
            Console.WriteLine(localMasterKeyBase64);
            File.WriteAllText(__localMasterKeyPath, localMasterKeyBase64);
        }
    }
}
