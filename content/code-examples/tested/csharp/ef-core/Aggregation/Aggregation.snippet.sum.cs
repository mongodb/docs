var totalOrderFromSun = db.Planets.Sum(p => p.orderFromSun);
Console.WriteLine("Total Order From Sun: " + totalOrderFromSun);
