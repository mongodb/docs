// To query for Blaise's birthDate, filter for his name to retrieve the realm object.
// Use dot notation to access the birthDate property.
let blaiseBirthDate = realm.objects("Dog").filtered(`name = 'Blaise'`)[0]
  .birthDate;
console.log(`Blaise's birth date is ${blaiseBirthDate}`);
