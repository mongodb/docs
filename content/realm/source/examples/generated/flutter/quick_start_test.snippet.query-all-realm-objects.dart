final cars = realm.all<Car>();
final myCar = cars[0];
print('My car is ${myCar.make} ${myCar.model}');
