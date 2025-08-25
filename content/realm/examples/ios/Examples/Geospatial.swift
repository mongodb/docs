import XCTest
import RealmSwift

// :snippet-start: geopoint-model
class Geospatial_Company: Object {
    @Persisted var _id: ObjectId
    @Persisted var location: CustomGeoPoint?
    
    convenience init(_ location: CustomGeoPoint?) {
        self.init()
        self.location = location
    }
}
// :snippet-end:

// :snippet-start: custom-geopoint
class CustomGeoPoint: EmbeddedObject {
    @Persisted private var type: String = "Point"
    @Persisted private var coordinates: List<Double>

    public var latitude: Double { return coordinates[1] }
    public var longitude: Double { return coordinates[0] }

    convenience init(_ latitude: Double, _ longitude: Double) {
        self.init()
        // Longitude comes first in the coordinates array of a GeoJson document
        coordinates.append(objectsIn: [longitude, latitude])
    }
}
// :snippet-end:

class GeospatialData: XCTestCase {
    let config = Realm.Configuration(inMemoryIdentifier: "Geospatial-Data")
    override func setUp() {
        let realm = try! Realm(configuration: config)
        // :snippet-start: companies
        let company1 = Geospatial_Company()
        company1.location = CustomGeoPoint(47.68, -122.35)
        
        let company2 = Geospatial_Company(CustomGeoPoint(47.9, -121.85))
        // :snippet-end:
        do {
            try realm.write {
                realm.add(company1)
                realm.add(company2)
            }
        } catch {
            print("There was an error writing to the realm: \(error.localizedDescription)")
        }
    }

    func testQueryGeospatialData() {
        let realm = try! Realm(configuration: config)
        
        // :snippet-start: geocircle
        // You can create a GeoCircle radius measured in radians.
        // This radian distance corresponds with 0.25 degrees.
        let smallCircle = GeoCircle(center: (47.3, -121.9), radiusInRadians: 0.004363323)
        
        // You can also create a GeoCircle radius measured with a Distance.
        // You can specify a Distance in .degrees, .kilometers, .miles, or .radians.
        let largeCircle = GeoCircle(center: GeoPoint(latitude: 47.8, longitude: -122.6)!, radius: Distance.kilometers(44.4)!)
        // :snippet-end:
        
        // :snippet-start: geobox
        let largeBox = GeoBox(bottomLeft: (47.3, -122.7), topRight: (48.1, -122.1))
        
        let smallBoxBottomLeft = GeoPoint(latitude: 47.5, longitude: -122.4)!
        let smallBoxTopRight = GeoPoint(latitude: 47.9, longitude: -121.8)
        let smallBox = GeoBox(bottomLeft: smallBoxBottomLeft, topRight: smallBoxTopRight!)
        // :snippet-end:
        
        // :snippet-start: geopolygon
        // Create a basic polygon
        let basicPolygon = GeoPolygon(outerRing: [
            (48.0, -122.8),
            (48.2, -121.8),
            (47.6, -121.6),
            (47.0, -122.0),
            (47.2, -122.6),
            (48.0, -122.8)
        ])
        
        // Create a polygon with one hole
        let outerRing: [GeoPoint] = [
            GeoPoint(latitude: 48.0, longitude: -122.8)!,
            GeoPoint(latitude: 48.2, longitude: -121.8)!,
            GeoPoint(latitude: 47.6, longitude: -121.6)!,
            GeoPoint(latitude: 47.0, longitude: -122.0)!,
            GeoPoint(latitude: 47.2, longitude: -122.6)!,
            GeoPoint(latitude: 48.0, longitude: -122.8)!
        ]
        
        let hole: [GeoPoint] = [
            GeoPoint(latitude: 47.8, longitude: -122.6)!,
            GeoPoint(latitude: 47.7, longitude: -122.2)!,
            GeoPoint(latitude: 47.4, longitude: -122.6)!,
            GeoPoint(latitude: 47.6, longitude: -122.5)!,
            GeoPoint(latitude: 47.8, longitude: -122.6)!
        ]
        
        let polygonWithOneHole = GeoPolygon(outerRing: outerRing, holes: [hole])
        
        // Add a second hole to the polygon
        let hole2: [GeoPoint] = [
            GeoPoint(latitude: 47.55, longitude: -122.05)!,
            GeoPoint(latitude: 47.55, longitude: -121.9)!,
            GeoPoint(latitude: 47.3, longitude: -122.1)!,
            GeoPoint(latitude: 47.55, longitude: -122.05)!
        ]
        
        let polygonWithTwoHoles = GeoPolygon(outerRing: outerRing, holes: [hole, hole2])
        // :snippet-end:
        
        // :snippet-start: geocircle-query
        // :snippet-start: geowithin
        let companiesInSmallCircle = realm.objects(Geospatial_Company.self).where {
            $0.location.geoWithin(smallCircle!)
        }
        print("Number of companies in small circle: \(companiesInSmallCircle.count)")
        // :snippet-end:
        
        let companiesInLargeCircle = realm.objects(Geospatial_Company.self)
            .filter("location IN %@", largeCircle)
        print("Number of companies in large circle: \(companiesInLargeCircle.count)")
        // :snippet-end:
        // :snippet-start: geobox-query
        let companiesInSmallBox = realm.objects(Geospatial_Company.self).where {
            $0.location.geoWithin(smallBox)
        }
        print("Number of companies in small box: \(companiesInSmallBox.count)")
        
        // :snippet-start: nspredicate-query
        let filterArguments = NSMutableArray()
        filterArguments.add(largeBox)
        let companiesInLargeBox = realm.objects(Geospatial_Company.self)
            .filter(NSPredicate(format: "location IN %@", argumentArray: filterArguments as? [Any]))
        print("Number of companies in large box: \(companiesInLargeBox.count)")
        // :snippet-end:
        // :snippet-end:
        // :snippet-start: geopolygon-query
        let companiesInBasicPolygon = realm.objects(Geospatial_Company.self).where {
            $0.location.geoWithin(basicPolygon!)
        }
        print("Number of companies in basic polygon: \(companiesInBasicPolygon.count)")
        
        let companiesInPolygonWithTwoHoles = realm.objects(Geospatial_Company.self).where {
            $0.location.geoWithin(polygonWithTwoHoles!)
        }
        print("Number of companies in polygon with two holes: \(companiesInPolygonWithTwoHoles.count)")
        // :snippet-end:
        XCTAssertEqual(0, companiesInSmallCircle.count)
        XCTAssertEqual(1, companiesInLargeCircle.count)
        XCTAssertEqual(2, companiesInSmallBox.count)
        XCTAssertEqual(1, companiesInLargeBox.count)
        XCTAssertEqual(2, companiesInBasicPolygon.count)
        XCTAssertEqual(1, companiesInPolygonWithTwoHoles.count)
    }
}
