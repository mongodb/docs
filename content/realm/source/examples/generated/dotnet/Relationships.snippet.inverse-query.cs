var oscillatorAssignees = realm.All<User>()
    .Filter("Items.Text CONTAINS 'oscillator'").ToList();

foreach (User u in oscillatorAssignees)
{
    Console.WriteLine(u.Name);
}
