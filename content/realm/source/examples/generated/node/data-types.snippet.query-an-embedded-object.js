const philipShermanAddress = realm
  .objects("Contact")
  .filtered("name = 'Philip Sherman'")[0].address.street;
console.log(`Philip Sherman's address is ${philipShermanAddress}`);
