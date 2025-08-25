var allPerennials = await plantsCollection.FindAsync(
    new { type = PlantType.Perennial.ToString() },
    new { name = 1 });
