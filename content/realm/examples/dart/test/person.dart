import 'package:realm_dart/realm.dart';

// :snippet-start: ejson-annotation
class Person {
  final String name;
  final DateTime birthDate;

  final int? age;
  final double income;
  final Person? spouse;

  @ejson // annotate constructor to generate decoder and encoder
  Person(this.name, this.birthDate, this.income, {this.spouse, this.age});
}
// :snippet-end: