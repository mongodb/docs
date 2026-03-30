var averageOrderFromSun = db.Planets.Average(p => p.orderFromSun);

Console.WriteLine("Average Order From Sun: " + averageOrderFromSun);
