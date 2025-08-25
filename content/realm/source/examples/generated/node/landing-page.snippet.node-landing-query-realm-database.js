// retrieve the set of Cat objects
const cats = realm.objects("Cat");
console.log(`There are ${cats.length} cats`);
// filter for cats that are older than 7
const catsOlderThan7 = cats.filtered("age > 7");
console.log(
  `There are ${catsOlderThan7.length} cats older than 7 years old`
);
// filter for calico cats
const calicoCats = cats.filtered("type == 'Calico'");
console.log(`There are ${calicoCats.length} Calico cats`);
