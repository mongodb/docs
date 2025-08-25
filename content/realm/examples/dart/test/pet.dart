// :snippet-start: serialize-object-model
import 'package:realm_dart/realm.dart';

part 'pet.realm.dart';

@RealmModel()
class _Pet {
  late String type;
  late int numberOfLegs;
  late DateTime birthDate;

  late double? price;
}
// :snippet-end: 
