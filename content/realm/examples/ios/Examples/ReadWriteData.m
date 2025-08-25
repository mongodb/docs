// :replace-start: {
//   "terms": {
//     "ReadWriteDataObjcExample_": ""
//   }
// }
#import <XCTest/XCTest.h>
#import <Realm/Realm.h>

// :snippet-start: models
// DogToy.h
@interface ReadWriteDataObjcExample_DogToy : RLMObject
@property NSString *name;
@end

// Dog.h
@interface ReadWriteDataObjcExample_Dog : RLMObject
@property NSString *name;
@property int age;
@property NSString *color;

// To-one relationship
@property ReadWriteDataObjcExample_DogToy *favoriteToy;

@end

// Enable ReadWriteDataObjcExample_Dog for use in RLMArray
RLM_COLLECTION_TYPE(ReadWriteDataObjcExample_Dog)


// Person.h
// A person has a primary key ID, a collection of dogs, and can be a member of multiple clubs.
@interface ReadWriteDataObjcExample_Person : RLMObject
@property int _id;
@property NSString *name;

// To-many relationship - a person can have many dogs
@property RLMArray<ReadWriteDataObjcExample_Dog *><ReadWriteDataObjcExample_Dog> *dogs;

// Inverse relationship - a person can be a member of many clubs
@property (readonly) RLMLinkingObjects *clubs;
@end

RLM_COLLECTION_TYPE(ReadWriteDataObjcExample_Person)


// DogClub.h
@interface ReadWriteDataObjcExample_DogClub : RLMObject
@property NSString *name;
@property RLMArray<ReadWriteDataObjcExample_Person *><ReadWriteDataObjcExample_Person> *members;
@end


// Dog.m
@implementation ReadWriteDataObjcExample_Dog
@end


// DogToy.m
@implementation ReadWriteDataObjcExample_DogToy
@end


// Person.m
@implementation ReadWriteDataObjcExample_Person
// Define the primary key for the class
+ (NSString *)primaryKey {
    return @"_id";
}

// Define the inverse relationship to dog clubs
+ (NSDictionary *)linkingObjectsProperties {
    return @{
        @"clubs": [RLMPropertyDescriptor descriptorWithClass:ReadWriteDataObjcExample_DogClub.class propertyName:@"members"],
    };
}
@end


// DogClub.m
@implementation ReadWriteDataObjcExample_DogClub
@end
// :snippet-end:


@interface ReadWriteDataObjc : XCTestCase

@end

@implementation ReadWriteDataObjc

- (void)tearDown {
    RLMRealm *realm = [RLMRealm defaultRealm];
    [realm transactionWithBlock:^() {
        [realm deleteAllObjects];
    }];
}

- (void)testCreateNewObject {
    // :snippet-start: initialize-objects-with-values
    // (1) Create a Dog object from a dictionary
    ReadWriteDataObjcExample_Dog *myDog = [[ReadWriteDataObjcExample_Dog alloc] initWithValue:@{@"name" : @"Pluto", @"age" : @3}];

    // (2) Create a Dog object from an array
    ReadWriteDataObjcExample_Dog *myOtherDog = [[ReadWriteDataObjcExample_Dog alloc] initWithValue:@[@"Pluto", @3]];

    RLMRealm *realm = [RLMRealm defaultRealm];

    // Add to the realm with transaction
    [realm transactionWithBlock:^() {
        [realm addObject:myDog];
        [realm addObject:myOtherDog];
    }];
    // :snippet-end:
}

- (void)testFindObjectByPrimaryKey {
    // :snippet-start: find-a-specific-object-by-primary-key
    // Get a specific person from the default realm
    ReadWriteDataObjcExample_Person *specificPerson = [ReadWriteDataObjcExample_Person objectForPrimaryKey:@12345];
    // :snippet-end:
}

- (void)testQueryRelationship {
    // :snippet-start: query-a-relationship
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    // Establish a relationship
    ReadWriteDataObjcExample_Dog *dog = [[ReadWriteDataObjcExample_Dog alloc] init];
    dog.name = @"Rex";
    dog.age = 10;
    
    ReadWriteDataObjcExample_Person *person = [[ReadWriteDataObjcExample_Person alloc] init];
    person._id = 12345;
    [person.dogs addObject:dog];
    
    [realm transactionWithBlock:^() {
        [realm addObject:person];
    }];
    
    // Later, query the specific person
    ReadWriteDataObjcExample_Person *specificPerson = [ReadWriteDataObjcExample_Person objectForPrimaryKey:@12345];
    
    // Access directly through a relationship
    NSLog(@"# dogs: %lu", [specificPerson.dogs count]);
    NSLog(@"First dog's name: %@", specificPerson.dogs[0].name);
    // :snippet-end:
}

- (void)testQueryInverseRelationship {
    // :snippet-start: query-an-inverse-relationship
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    // Establish a relationship
    ReadWriteDataObjcExample_Person *person = [[ReadWriteDataObjcExample_Person alloc] init];
    person._id = 12345;
    
    ReadWriteDataObjcExample_DogClub *club = [[ReadWriteDataObjcExample_DogClub alloc] init];
    club.name = @"Pooch Pals";
    [club.members addObject:person];
    
    [realm transactionWithBlock:^() {
        [realm addObject:club];
    }];
    
    // Later, query the specific person
    ReadWriteDataObjcExample_Person *specificPerson = [ReadWriteDataObjcExample_Person objectForPrimaryKey:@12345];
        
    // Access directly through an inverse relationship
    NSLog(@"# memberships: %lu", [specificPerson.clubs count]);
    NSLog(@"First club's name: %@", [specificPerson.clubs[0] name]);
    // :snippet-end:
}

- (void)testBatchUpdateAndCascadingDelete {
    // :snippet-start: batch-update
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    [realm transactionWithBlock:^() {
        // Create a person to take care of some dogs.
        ReadWriteDataObjcExample_Person *ali = [[ReadWriteDataObjcExample_Person alloc] initWithValue:@{@"_id": @1, @"name": @"Ali"}];
        [realm addObject:ali];

        // Find dogs younger than 2.
        RLMResults<ReadWriteDataObjcExample_Dog *> *puppies = [ReadWriteDataObjcExample_Dog objectsInRealm:realm where:@"age < 2"];

        // Batch update: give all puppies to Ali.
        [ali setValue:puppies forKey:@"dogs"];
    }];
    // :snippet-end:

    ReadWriteDataObjcExample_Person *ali = [ReadWriteDataObjcExample_Person objectInRealm:realm forPrimaryKey:@1];
    // :snippet-start: cascading-delete
    [realm transactionWithBlock:^() {
        // Delete Ali's dogs.
        [realm deleteObjects:[ali dogs]];
        // Delete Ali.
        [realm deleteObject:ali];
    }];
    // :snippet-end:
}

- (void)testCreateAndDelete {
    // :snippet-start: create
    // Get the default realm.
    // You only need to do this once per thread.
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    // Instantiate the class.
    ReadWriteDataObjcExample_Dog *dog = [[ReadWriteDataObjcExample_Dog alloc] init];
    dog.name = @"Max";
    dog.age = 5;

    // Open a thread-safe transaction.
    [realm transactionWithBlock:^() {
        // Add the instance to the realm.
        [realm addObject:dog];
    }];
    // :snippet-end:

    // :snippet-start: delete
    [realm transactionWithBlock:^() {
        // Delete the instance from the realm.
        [realm deleteObject:dog];
    }];
    // :snippet-end:
}

- (void)testDeleteAll {
    // :snippet-start: delete-all
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    [realm transactionWithBlock:^() {
        // Delete all objects from the realm.
        [realm deleteAllObjects];
    }];
    // :snippet-end:
}

- (void)testDeleteAllOfClass {
    // :snippet-start: delete-all-of-class
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    [realm transactionWithBlock:^() {
        // Delete all instances of ReadWriteDataObjcExample_Dog from the realm.
        RLMResults<ReadWriteDataObjcExample_Dog *> *allReadWriteDataObjcExample_Dogs = [ReadWriteDataObjcExample_Dog allObjectsInRealm:realm];
        [realm deleteObjects:allReadWriteDataObjcExample_Dogs];
    }];
    // :snippet-end:
}

- (void)testDeleteCollection {
    // :snippet-start: delete-collection
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    [realm transactionWithBlock:^() {
        // Find dogs younger than 2 years old.
        RLMResults<ReadWriteDataObjcExample_Dog *> *puppies = [ReadWriteDataObjcExample_Dog objectsInRealm:realm where:@"age < 2"];

        // Delete all objects in the collection from the realm.
        [realm deleteObjects:puppies];
    }];
    // :snippet-end:
}

- (void)testObjects {
    // :snippet-start: objects
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    RLMResults *dogs = [ReadWriteDataObjcExample_Dog allObjectsInRealm:realm];
    RLMResults *people = [ReadWriteDataObjcExample_Person allObjectsInRealm:realm];
    // :snippet-end:
    (void)dogs;
    (void)people;
}

- (void)testSort {
    // :snippet-start: sort
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    RLMResults *dogs = [ReadWriteDataObjcExample_Dog allObjectsInRealm:realm];

    // Sort dogs by name
    RLMResults *dogsSorted = [dogs sortedResultsUsingKeyPath:@"name" ascending:NO];

    // You can also sort on the members of linked objects. In this example,
    // we sort the dogs by their favorite toys' names.
    RLMResults *dogsSortedByFavoriteToyName = [dogs sortedResultsUsingKeyPath:@"favoriteToy.name" ascending:YES];
    // :snippet-end:
    (void)dogsSorted;
    (void)dogsSortedByFavoriteToyName;
}

- (void)testFilter {
    // :snippet-start: filter
    RLMRealm *realm = [RLMRealm defaultRealm];

    // Access all dogs in the realm
    RLMResults *dogs = [ReadWriteDataObjcExample_Dog allObjectsInRealm:realm];

    // Filter by age
    RLMResults *puppies = [dogs objectsWhere:@"age < 2"];
    
    // Filter by favorite toy
    RLMResults *dogsWithoutFavoriteToy = [dogs objectsWhere:@"favoriteToy == nil"];
    
    // Filter by favorite toy's name
    RLMResults *dogsWhoLikeTennisBalls = [dogs objectsWhere:@"favoriteToy.name == %@", @"Tennis ball"];
    // :snippet-end:
    (void)puppies;
    (void)dogsWithoutFavoriteToy;
    (void)dogsWhoLikeTennisBalls;
}

- (void)testTransaction {
    // :snippet-start: transaction
    // Open the default realm.
    RLMRealm *realm = [RLMRealm defaultRealm];

    // Open a thread-safe transaction.
    [realm transactionWithBlock:^() {
        // ... Make changes ...
        // Realm automatically cancels the transaction in case of exception.
        // Otherwise, Realm automatically commits the transaction at the
        // end of the code block.
    }];
    // :snippet-end:
}

- (void)testUpdate {
    // :snippet-start: update
    RLMRealm *realm = [RLMRealm defaultRealm];
    // Open a thread-safe transaction.
    [realm transactionWithBlock:^{
        // Get a dog to update.
        ReadWriteDataObjcExample_Dog *dog = [[ReadWriteDataObjcExample_Dog allObjectsInRealm: realm] firstObject];

        // Update some properties on the instance.
        // These changes are saved to the realm.
        dog.name = @"Wolfie";
        dog.age += 1;
    }];
    // :snippet-end:

}

- (void)testUpsert {
    // :snippet-start: upsert
    RLMRealm *realm = [RLMRealm defaultRealm];
    [realm transactionWithBlock:^{
        ReadWriteDataObjcExample_Person *jones = [[ReadWriteDataObjcExample_Person alloc] initWithValue:@{@"_id": @1234, @"name": @"Jones"}];
        // Add a new person to the realm. Since nobody with ID 1234
        // has been added yet, this adds the instance to the realm.
        [realm addOrUpdateObject:jones];
        
        ReadWriteDataObjcExample_Person *bowie = [[ReadWriteDataObjcExample_Person alloc] initWithValue:@{@"_id": @1234, @"name": @"Bowie"}];
        // Judging by the ID, it's the same person, just with a different name.
        // This overwrites the original entry (i.e. Jones -> Bowie).
        [realm addOrUpdateObject:bowie];
    }];
    // :snippet-end:
}

- (void)testAggregate {
    // :snippet-start: aggregate
    RLMRealm *realm = [RLMRealm defaultRealm];

    RLMResults *people = [ReadWriteDataObjcExample_Person allObjectsInRealm:realm];

    // People whose dogs' average age is 5
    [people objectsWhere:@"dogs.@avg.age == 5"];

    // People with older dogs
    [people objectsWhere:@"dogs.@min.age > 5"];

    // People with younger dogs
    [people objectsWhere:@"dogs.@max.age < 2"];

    // People with many dogs
    [people objectsWhere:@"dogs.@count > 2"];

    // People whose dogs' ages combined > 10 years
    [people objectsWhere:@"dogs.@sum.age > 10"];
    // :snippet-end:
}

- (void)testCopyToAnotherRealm {
    // :snippet-start: copy-to-another-realm
    RLMRealmConfiguration *configuration = [RLMRealmConfiguration defaultConfiguration];
    configuration.inMemoryIdentifier = @"first realm";
    RLMRealm *realm = [RLMRealm realmWithConfiguration:configuration error:nil];

    [realm transactionWithBlock:^{
        ReadWriteDataObjcExample_Dog *dog = [[ReadWriteDataObjcExample_Dog alloc] init];
        dog.name = @"Wolfie";
        dog.age = 1;
        [realm addObject:dog];
    }];

    // Later, fetch the instance we want to copy
    ReadWriteDataObjcExample_Dog *wolfie = [[ReadWriteDataObjcExample_Dog objectsInRealm:realm where:@"name == 'Wolfie'"] firstObject];

    // Open the other realm
    RLMRealmConfiguration *otherConfiguration = [RLMRealmConfiguration defaultConfiguration];
    otherConfiguration.inMemoryIdentifier = @"second realm";
    RLMRealm *otherRealm = [RLMRealm realmWithConfiguration:otherConfiguration error:nil];
    [otherRealm transactionWithBlock:^{
        // Copy to the other realm
        ReadWriteDataObjcExample_Dog *wolfieCopy = [[wolfie class] createInRealm:otherRealm withValue:wolfie];
        wolfieCopy.age = 2;
        
        // Verify that the copy is separate from the original
        XCTAssertNotEqual(wolfie.age, wolfieCopy.age);
    }];
    // :snippet-end:
}

- (void)testChainQuery {
    // :snippet-start: chain-query
    RLMRealm *realm = [RLMRealm defaultRealm];
    RLMResults<ReadWriteDataObjcExample_Dog *> *tanDogs = [ReadWriteDataObjcExample_Dog objectsInRealm:realm where:@"color = 'tan'"];
    RLMResults<ReadWriteDataObjcExample_Dog *> *tanDogsWithBNames = [tanDogs objectsWhere:@"name BEGINSWITH 'B'"];
    // :snippet-end:
    (void)tanDogsWithBNames;
}

- (void)testJson {
    // :snippet-start: json
    // Specify a dog toy in JSON
    NSData *data = [@"{\"name\": \"Tennis ball\"}" dataUsingEncoding: NSUTF8StringEncoding];
    RLMRealm *realm = [RLMRealm defaultRealm];

    // Insert from NSData containing JSON
    [realm transactionWithBlock:^{
        id json = [NSJSONSerialization JSONObjectWithData:data options:0 error:NULL];
        [ReadWriteDataObjcExample_DogToy createInRealm:realm withValue:json];
    }];
    // :snippet-end:
}

- (void)testNestedObjects {

    ReadWriteDataObjcExample_Dog *aDog = [[ReadWriteDataObjcExample_Dog alloc] init];
    ReadWriteDataObjcExample_Dog *anotherDog = [[ReadWriteDataObjcExample_Dog alloc] init];
    // :snippet-start: nested-objects
    // Instead of using pre-existing dogs...
    ReadWriteDataObjcExample_Person *aPerson = [[ReadWriteDataObjcExample_Person alloc]
        initWithValue:@[@123, @"Jane", @[aDog, anotherDog]]];

    // ...we can create them inline
    ReadWriteDataObjcExample_Person *anotherPerson = [[ReadWriteDataObjcExample_Person alloc]
        initWithValue:@[@123, @"Jane", @[@[@"Buster", @5], @[@"Buddy", @6]]]];
    // :snippet-end:
    (void)aPerson;
    (void)anotherPerson;
}

- (void)testPartialUpdate {
    // :snippet-start: partial-update
    RLMRealm *realm = [RLMRealm defaultRealm];
    [realm transactionWithBlock:^{
        // Only update the provided values.
        // Note that the "name" property will remain the same
        // for the person with primary key "_id" 123.
        [ReadWriteDataObjcExample_Person createOrUpdateModifiedInRealm:realm
            withValue:@{@"_id": @123, @"dogs": @[@[@"Buster", @5]]}];
    }];
    // :snippet-end:
}
@end

// :replace-end:
