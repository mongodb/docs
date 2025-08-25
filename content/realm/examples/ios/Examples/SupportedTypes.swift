import XCTest
import RealmSwift

class MyCustomObjectType: Object {
    @Persisted var uuid: UUID
}

class MyEmbeddedObjectType: EmbeddedObject {
    @Persisted var uuid: UUID
}

enum MyPersistableEnum: String, PersistableEnum {
    case toBe
    case orNotToBe
}

class AllSupportedTypesTestObject: Object {
    // :snippet-start: bool-required
    @Persisted var boolName: Bool
    // :snippet-end:
    // :snippet-start: bool-opt
    @Persisted var optBoolName: Bool?
    // :snippet-end:
    // :snippet-start: int-required
    @Persisted var intName: Int
    // :snippet-end:
    // :snippet-start: int-opt
    @Persisted var optIntName: Int?
    // :snippet-end:
    // :snippet-start: float-required
    @Persisted var floatName: Float
    // :snippet-end:
    // :snippet-start: float-opt
    @Persisted var optFloatName: Float?
    // :snippet-end:
    // :snippet-start: double-required
    @Persisted var doubleName: Double
    // :snippet-end:
    // :snippet-start: double-opt
    @Persisted var optDoubleName: Double?
    // :snippet-end:
    // :snippet-start: string-required
    @Persisted var stringName: String
    // :snippet-end:
    // :snippet-start: string-opt
    @Persisted var optStringName: String?
    // :snippet-end:
    // :snippet-start: data-required
    @Persisted var dataName: Data
    // :snippet-end:
    // :snippet-start: data-opt
    @Persisted var optDataName: Data?
    // :snippet-end:
    // :snippet-start: date-required
    @Persisted var dateName: Date
    // :snippet-end:
    // :snippet-start: date-opt
    @Persisted var optDateName: Date?
    // :snippet-end:
    // :snippet-start: decimal128-required
    @Persisted var decimalName: Decimal128
    // :snippet-end:
    // :snippet-start: decimal128-opt
    @Persisted var optDecimalName: Decimal128?
    // :snippet-end:
    // :snippet-start: uuid-required
    @Persisted var uuidName: UUID
    // :snippet-end:
    // :snippet-start: uuid-opt
    @Persisted var optUuidName: UUID?
    // :snippet-end:
    // :snippet-start: objectId-required
    @Persisted var objectIdName: ObjectId
    // :snippet-end:
    // :snippet-start: objectId-opt
    @Persisted var optObjectIdName: ObjectId?
    // :snippet-end:
    // :snippet-start: list-required
    @Persisted var listName: List<MyCustomObjectType>
    // :snippet-end:
    // :snippet-start: mutableSet-required
    @Persisted var mutableSetName: MutableSet<String>
    // :snippet-end:
    // :snippet-start: map-required
    @Persisted var mapName: Map<String, String>
    // :snippet-end:
    // :snippet-start: anyRealmValue-required
    @Persisted var anyRealmValueName: AnyRealmValue
    // :snippet-end:
    // :snippet-start: custom-object-opt
    @Persisted var optObjectPropertyName: MyCustomObjectType?
    // :snippet-end:
    // :snippet-start: embedded-object-opt
    @Persisted var optEmbeddedObjectPropertyName: MyEmbeddedObjectType?
    // :snippet-end:
    // :snippet-start: enum-required
    @Persisted var enumName: MyPersistableEnum
    // :snippet-end:
    // :snippet-start: enum-opt
    @Persisted var optEnumName: MyPersistableEnum?
    // :snippet-end:
}

class SupportedPropertyTypes: XCTestCase {
    func testPopulateAllProperties() {
        let identifier = "SupportedTypesRealm"
        let stConfig = Realm.Configuration(
            inMemoryIdentifier: identifier,
            objectTypes: [AllSupportedTypesTestObject.self, MyCustomObjectType.self, MyEmbeddedObjectType.self])
        let realm = try! Realm(configuration: stConfig)
        
        let date = Date.now
        let dateFromTimeInterval = Date(timeIntervalSinceNow: 240)
        let uuid = UUID()
        let uuidFromString = UUID(uuidString: "My awesome UUID string")
        let objectId = ObjectId()
        let objectIdFromTimestampMachineIdProcessId = ObjectId(timestamp: Date.now, machineId: 1, processId: 1)
        
        let myCustomObject = MyCustomObjectType()
        let myCustomEmbeddedObject = MyEmbeddedObjectType()
        var allSupportedTypesObject = AllSupportedTypesTestObject()
        allSupportedTypesObject.boolName = true
        allSupportedTypesObject.optBoolName = false
        allSupportedTypesObject.intName = 42
        allSupportedTypesObject.optIntName = 12345
        allSupportedTypesObject.floatName = 2.5
        allSupportedTypesObject.optFloatName = 3.1
        allSupportedTypesObject.doubleName = 3.14159
        allSupportedTypesObject.optDoubleName = 9.51413
        allSupportedTypesObject.stringName = "No frogs here"
        allSupportedTypesObject.optStringName = "Only Zuul"
        allSupportedTypesObject.dataName = Data(repeating: 1, count: 3)
        allSupportedTypesObject.optDataName = Data(repeating: 2, count: 2)
        allSupportedTypesObject.dateName = date
        allSupportedTypesObject.optDateName = dateFromTimeInterval
        allSupportedTypesObject.decimalName = 7.1776
        allSupportedTypesObject.optDecimalName = 12.1865
        allSupportedTypesObject.uuidName = uuid
        allSupportedTypesObject.optUuidName = uuidFromString
        allSupportedTypesObject.objectIdName = objectId
        allSupportedTypesObject.optObjectIdName = objectIdFromTimestampMachineIdProcessId
        allSupportedTypesObject.mapName["Favorite espresso"] = "Barismo"
        allSupportedTypesObject.anyRealmValueName = .string("Today we'll be a string")
        allSupportedTypesObject.optObjectPropertyName = myCustomObject
        allSupportedTypesObject.optEmbeddedObjectPropertyName = myCustomEmbeddedObject
        allSupportedTypesObject.enumName = MyPersistableEnum.toBe
        allSupportedTypesObject.optEnumName = MyPersistableEnum.orNotToBe
        
        try! realm.write {
            realm.add(allSupportedTypesObject)
            allSupportedTypesObject.listName.append(myCustomObject)
            allSupportedTypesObject.mutableSetName.insert("Eleventy")
        }
        
        let queriedObject = realm.objects(AllSupportedTypesTestObject.self).first!
        XCTAssertTrue(queriedObject.boolName)
        XCTAssertEqual(queriedObject.optBoolName, false)
        XCTAssertEqual(queriedObject.intName, 42)
        XCTAssertEqual(queriedObject.optIntName, 12345)
        XCTAssertEqual(queriedObject.floatName, 2.5)
        XCTAssertEqual(queriedObject.optFloatName, 3.1)
        XCTAssertEqual(queriedObject.doubleName, 3.14159)
        XCTAssertEqual(queriedObject.optDoubleName, 9.51413)
        XCTAssertEqual(queriedObject.stringName, "No frogs here")
        XCTAssertEqual(queriedObject.optStringName, "Only Zuul")
        XCTAssertEqual(queriedObject.dataName, Data(repeating: 1, count: 3))
        XCTAssertEqual(queriedObject.optDataName, Data(repeating: 2, count: 2))
        XCTAssertEqual(queriedObject.dateName, date)
        XCTAssertEqual(queriedObject.optDateName, dateFromTimeInterval)
        XCTAssertEqual(queriedObject.decimalName, 7.1776)
        XCTAssertEqual(queriedObject.optDecimalName, 12.1865)
        XCTAssertEqual(queriedObject.uuidName, uuid)
        XCTAssertEqual(queriedObject.optUuidName, uuidFromString)
        XCTAssertEqual(queriedObject.objectIdName, objectId)
        XCTAssertEqual(queriedObject.optObjectIdName, objectIdFromTimestampMachineIdProcessId)
        XCTAssertEqual(queriedObject.mapName["Favorite espresso"], "Barismo")
        if case let .string(stringValue) = queriedObject.anyRealmValueName {
            XCTAssertEqual(stringValue, "Today we'll be a string")
        } else {
            XCTFail("The AnyRealmValue queried string value did not match the input value")
        }
        XCTAssertNotNil(queriedObject.optObjectPropertyName)
        XCTAssertNotNil(queriedObject.optEmbeddedObjectPropertyName)
        XCTAssertEqual(queriedObject.listName.count, 1)
        XCTAssert(queriedObject.mutableSetName.contains("Eleventy"))
        XCTAssertEqual(queriedObject.enumName, MyPersistableEnum.toBe)
        XCTAssertEqual(queriedObject.optEnumName, MyPersistableEnum.orNotToBe)
    }
    
    func testPopulateOnlyRequiredProperties() {
        let identifier = "RequiredSupportedTypesRealm"
        let optStConfig = Realm.Configuration(
            inMemoryIdentifier: identifier,
            objectTypes: [AllSupportedTypesTestObject.self, MyCustomObjectType.self, MyEmbeddedObjectType.self])
        let realm = try! Realm(configuration: optStConfig)
        
        let date = Date.now
        let uuid = UUID()
        let objectId = ObjectId()
        
        var allRequiredSupportedTypesObject = AllSupportedTypesTestObject()
        allRequiredSupportedTypesObject.boolName = true
        allRequiredSupportedTypesObject.intName = 42
        allRequiredSupportedTypesObject.floatName = 2.5
        allRequiredSupportedTypesObject.doubleName = 3.14159
        allRequiredSupportedTypesObject.stringName = "No frogs here"
        allRequiredSupportedTypesObject.dataName = Data(repeating: 1, count: 3)
        allRequiredSupportedTypesObject.dateName = date
        allRequiredSupportedTypesObject.decimalName = 7.1776
        allRequiredSupportedTypesObject.uuidName = uuid
        allRequiredSupportedTypesObject.objectIdName = objectId
        allRequiredSupportedTypesObject.mapName["Favorite espresso"] = "Barismo"
        allRequiredSupportedTypesObject.anyRealmValueName = .string("Today we'll be a string")
        allRequiredSupportedTypesObject.enumName = MyPersistableEnum.toBe
        
        try! realm.write {
            realm.add(allRequiredSupportedTypesObject)
            allRequiredSupportedTypesObject.mutableSetName.insert("Eleventy")
        }
        
        let queriedObject = realm.objects(AllSupportedTypesTestObject.self).first!
        XCTAssertTrue(queriedObject.boolName)
        XCTAssertNil(queriedObject.optBoolName)
        XCTAssertEqual(queriedObject.intName, 42)
        XCTAssertNil(queriedObject.optIntName)
        XCTAssertEqual(queriedObject.floatName, 2.5)
        XCTAssertNil(queriedObject.optFloatName)
        XCTAssertEqual(queriedObject.doubleName, 3.14159)
        XCTAssertNil(queriedObject.optDoubleName)
        XCTAssertEqual(queriedObject.stringName, "No frogs here")
        XCTAssertNil(queriedObject.optStringName)
        XCTAssertEqual(queriedObject.dataName, Data(repeating: 1, count: 3))
        XCTAssertNil(queriedObject.optDataName)
        XCTAssertEqual(queriedObject.dateName, date)
        XCTAssertNil(queriedObject.optDateName)
        XCTAssertEqual(queriedObject.decimalName, 7.1776)
        XCTAssertNil(queriedObject.optDecimalName)
        XCTAssertEqual(queriedObject.uuidName, uuid)
        XCTAssertNil(queriedObject.optUuidName)
        XCTAssertEqual(queriedObject.objectIdName, objectId)
        XCTAssertNil(queriedObject.optObjectIdName)
        XCTAssertEqual(queriedObject.mapName["Favorite espresso"], "Barismo")
        if case let .string(stringValue) = queriedObject.anyRealmValueName {
            XCTAssertEqual(stringValue, "Today we'll be a string")
        } else {
            XCTFail("The AnyRealmValue queried string value did not match the input value")
        }
        XCTAssertNil(queriedObject.optObjectPropertyName)
        XCTAssertNil(queriedObject.optEmbeddedObjectPropertyName)
        XCTAssert(queriedObject.listName.isEmpty)
        XCTAssert(queriedObject.mutableSetName.contains("Eleventy"))
        XCTAssertEqual(queriedObject.enumName, MyPersistableEnum.toBe)
        XCTAssertNil(queriedObject.optEnumName)
    }
}
