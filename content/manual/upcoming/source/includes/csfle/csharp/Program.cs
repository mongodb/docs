using System;

namespace CsfleTutorial;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine(new string('=', 60));
        Console.WriteLine("Running MakeDataKey...");
        Console.WriteLine(new string('=', 60));
        MakeDataKey.MakeKey();

        Console.WriteLine(new string('=', 60));
        Console.WriteLine("Running InsertEncryptedDocument...");
        Console.WriteLine(new string('=', 60));
        InsertEncryptedDocument.Insert();

        Console.WriteLine(new string('=', 60));
        Console.WriteLine("All scripts completed successfully!");
        Console.WriteLine(new string('=', 60));
    }
}
