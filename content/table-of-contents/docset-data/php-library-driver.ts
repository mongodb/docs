import type { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "PHP Library Manual",
    contentSite: "php-library",
    group: true,
    versionDropdown: true,
    items: [
      {
        label: "Overview",
        contentSite: "php-library",
        url: "/docs/php-library/:version",
      },
      {
        label: "Getting Started",
        contentSite: "php-library",
        url: "/docs/php-library/:version/get-started",
      },
      {
        label: "Connect",
        contentSite: "php-library",
        url: "/docs/php-library/:version/connect",
        collapsible: true,
        items: [
          {
            label: "Create a Client",
            contentSite: "php-library",
            url: "/docs/php-library/:version/connect/client",
          },
          {
            label: "Choose a Connection Target",
            contentSite: "php-library",
            url: "/docs/php-library/:version/connect/connection-targets",
          },
          {
            label: "Connection Options",
            contentSite: "php-library",
            url: "/docs/php-library/:version/connect/connection-options",
            collapsible: true,
            items: [
              {
                label: "Stable API",
                contentSite: "php-library",
                url: "/docs/php-library/:version/connect/connection-options/stable-api",
              },
              {
                label: "Compress Network Traffic",
                contentSite: "php-library",
                url: "/docs/php-library/:version/connect/connection-options/network-compression",
              },
            ]
          },
          {
            label: "AWS Lambda",
            contentSite: "php-library",
            url: "/docs/php-library/:version/connect/aws-lambda",
          },
          {
            label: "Connection Troubleshooting",
            contentSite: "php-library",
            url: "/docs/php-library/:version/connect/connection-troubleshooting",
          },
        ]
      },
      {
        label: "Databases & Collections",
        contentSite: "php-library",
        url: "/docs/php-library/:version/databases-collections",
      },
      {
        label: "CRUD Operations",
        contentSite: "php-library",
        collapsible: true,
        items: [
          {
            label: "Insert Documents",
            contentSite: "php-library",
            url: "/docs/php-library/:version/crud/insert",
          },
          {
            label: "Query Documents",
            contentSite: "php-library",
            collapsible: true,
            items: [
              {
                label: "Find Documents",
                contentSite: "php-library",
                url: "/docs/php-library/:version/crud/query/retrieve",
              },
              {
                label: "Specify Documents to Return",
                contentSite: "php-library",
                url: "/docs/php-library/:version/crud/query/specify-documents-to-return",
              },
              {
                label: "Specify Fields to Return",
                contentSite: "php-library",
                url: "/docs/php-library/:version/crud/query/project",
              },
              {
                label: "Specify a Query",
                contentSite: "php-library",
                url: "/docs/php-library/:version/crud/query/specify-a-query",
              },
              {
                label: "Count Documents",
                contentSite: "php-library",
                url: "/docs/php-library/:version/crud/query/count",
              },
              {
                label: "Distinct Field Values",
                contentSite: "php-library",
                url: "/docs/php-library/:version/crud/query/distinct",
              },
              {
                label: "Access Data from a Cursor",
                contentSite: "php-library",
                url: "/docs/php-library/:version/crud/query/cursor",
              },
            ]
          },
          {
            label: "Update Documents",
            contentSite: "php-library",
            url: "/docs/php-library/:version/crud/update",
          },
          {
            label: "Replace Documents",
            contentSite: "php-library",
            url: "/docs/php-library/:version/crud/replace",
          },
          {
            label: "Delete Documents",
            contentSite: "php-library",
            url: "/docs/php-library/:version/crud/delete",
          },
          {
            label: "Bulk Write Operations",
            contentSite: "php-library",
            url: "/docs/php-library/:version/crud/bulk-write",
          },
          {
            label: "Transactions",
            contentSite: "php-library",
            url: "/docs/php-library/:version/crud/transaction",
          },
          {
            label: "Configure CRUD Operations",
            contentSite: "php-library",
            url: "/docs/php-library/:version/crud/read-write-pref",
          },
          {
            label: "Store Large Files",
            contentSite: "php-library",
            url: "/docs/php-library/:version/crud/gridfs",
          },
          {
            label: "Operations with Builders",
            contentSite: "php-library",
            url: "/docs/php-library/:version/crud/builders",
          },
        ]
      },
      {
        label: "Aggregation",
        contentSite: "php-library",
        url: "/docs/php-library/:version/aggregation",
      },
      {
        label: "Data Formats",
        contentSite: "php-library",
        collapsible: true,
        items: [
          {
            label: "Custom Types",
            contentSite: "php-library",
            url: "/docs/php-library/:version/data-formats/custom-types",
            collapsible: true,
            items: [
              {
                label: "Codecs",
                contentSite: "php-library",
                url: "/docs/php-library/:version/data-formats/custom-types/codecs",
              },
            ]
          },
          {
            label: "Decimal128",
            contentSite: "php-library",
            url: "/docs/php-library/:version/data-formats/decimal128",
          },
          {
            label: "BSON",
            contentSite: "php-library",
            url: "/docs/php-library/:version/data-formats/modeling-bson-data",
          },
          {
            label: "Time Series",
            contentSite: "php-library",
            url: "/docs/php-library/:version/data-formats/time-series",
          },
          {
            label: "Extended JSON",
            contentSite: "php-library",
            url: "/docs/php-library/:version/data-formats/extended-json",
          },
        ]
      },
      {
        label: "Indexes",
        contentSite: "php-library",
        url: "/docs/php-library/:version/indexes",
        collapsible: true,
        items: [
          {
            label: "Index Management",
            contentSite: "php-library",
            url: "/docs/php-library/:version/indexes/index-mgmt",
          },
          {
            label: "Single Field Indexes",
            contentSite: "php-library",
            url: "/docs/php-library/:version/indexes/single-field-index",
          },
          {
            label: "Compound Indexes",
            contentSite: "php-library",
            url: "/docs/php-library/:version/indexes/compound-index",
          },
          {
            label: "Multikey Indexes",
            contentSite: "php-library",
            url: "/docs/php-library/:version/indexes/multikey-index",
          },
          {
            label: "MongoDB Search",
            contentSite: "php-library",
            url: "/docs/php-library/:version/indexes/atlas-search-index",
          },
        ]
      },
      {
        label: "Run a Database Command",
        contentSite: "php-library",
        url: "/docs/php-library/:version/run-command",
      },
      {
        label: "MongoDB Search",
        contentSite: "php-library",
        url: "/docs/php-library/:version/atlas-search",
      },
      {
        label: "MongoDB Vector Search",
        contentSite: "php-library",
        url: "/docs/php-library/:version/vector-search",
      },
      {
        label: "Logging and Monitoring",
        contentSite: "php-library",
        collapsible: true,
        items: [
          {
            label: "Monitoring",
            contentSite: "php-library",
            url: "/docs/php-library/:version/monitoring-logging/monitoring",
          },
          {
            label: "Change Streams",
            contentSite: "php-library",
            url: "/docs/php-library/:version/monitoring-logging/change-streams",
          },
          {
            label: "Logging",
            contentSite: "php-library",
            url: "/docs/php-library/:version/monitoring-logging/logging",
          },
        ]
      },
      {
        label: "Security",
        contentSite: "php-library",
        url: "/docs/php-library/:version/security",
        collapsible: true,
        items: [
          {
            label: "Authentication",
            contentSite: "php-library",
            url: "/docs/php-library/:version/security/authentication",
            collapsible: true,
            items: [
              {
                label: "SCRAM",
                contentSite: "php-library",
                url: "/docs/php-library/:version/security/authentication/scram",
              },
              {
                label: "X.509",
                contentSite: "php-library",
                url: "/docs/php-library/:version/security/authentication/x509",
              },
              {
                label: "AWS IAM",
                contentSite: "php-library",
                url: "/docs/php-library/:version/security/authentication/aws-iam",
              },
            ]
          },
          {
            label: "In-Use Encryption",
            contentSite: "php-library",
            url: "/docs/php-library/:version/security/in-use-encryption",
          },
          {
            label: "TLS",
            contentSite: "php-library",
            url: "/docs/php-library/:version/security/tls",
          },
        ]
      },
      {
        label: "Reference",
        contentSite: "php-library",
        collapsible: true,
        items: [
          {
            label: "Release Notes",
            contentSite: "php-library",
            url: "/docs/php-library/:version/references/release-notes",
          },

          {
            label: "Upgrade",
            contentSite: "php-library",
            url: "/docs/php-library/:version/references/upgrade",
          },
        ]
      },
      {
        label: "Compatibility",
        contentSite: "drivers",
        url: "https://www.mongodb.com/docs/drivers/compatibility/?interface=driver&language=php-library",
      },
      {
        label: "API Documentation",
        contentSite: "php-library",
        collapsible: true,
        items: [
          {
            label: "BSON",
            contentSite: "php-library",
            url: "/docs/php-library/:version/reference/bson",
          },
          {
            label: "MongoDB\\Client",
            contentSite: "php-library",
            url: "/docs/php-library/:version/reference/class/MongoDBClient",
            collapsible: true,
            items: [
              {
                label: "__construct()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBClient__construct",
              },
              {
                label: "__get()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBClient__get",
              },
              {
                label: "addSubscriber()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBClient-addSubscriber",
              },
              {
                label: "bulkWrite()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBClient-bulkWrite",
                versions: {"excludes":["v1.x"]}
              },
              {
                label: "createClientEncryption()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBClient-createClientEncryption",
              },
              {
                label: "dropDatabase()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBClient-dropDatabase",
              },
              {
                label: "getCollection()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBClient-getCollection",
              },
              {
                label: "getDatabase()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBClient-getDatabase",
              },
              {
                label: "getManager()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBClient-getManager",
              },
              {
                label: "getReadConcern()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBClient-getReadConcern",
              },
              {
                label: "getReadPreference()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBClient-getReadPreference",
              },
              {
                label: "getTypeMap()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBClient-getTypeMap",
              },
              {
                label: "getWriteConcern()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBClient-getWriteConcern",
              },
              {
                label: "listDatabaseNames()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBClient-listDatabaseNames",
              },
              {
                label: "listDatabases()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBClient-listDatabases",
              },
              {
                label: "removeSubscriber()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBClient-removeSubscriber",
              },
              {
                label: "selectCollection()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBClient-selectCollection",
              },
              {
                label: "selectDatabase()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBClient-selectDatabase",
              },
              {
                label: "startSession()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBClient-startSession",
              },
              {
                label: "watch()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBClient-watch",
              },
            ]
          },
          {
            label: "MongoDB\\ClientBulkWrite",
            contentSite: "php-library",
            url: "/docs/php-library/:version/reference/class/MongoDBClientBulkWrite",
            collapsible: true,
            versions: {"excludes":["v1.x"]},
            items: [
              {
                label: "createWithCollection()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBClientBulkWrite-createWithCollection",
              },
              {
                label: "deleteMany()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBClientBulkWrite-deleteMany",
              },
              {
                label: "deleteOne()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBClientBulkWrite-deleteOne",
              },
              {
                label: "insertOne()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBClientBulkWrite-insertOne",
              },
              {
                label: "replaceOne()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBClientBulkWrite-replaceOne",
              },
              {
                label: "updateMany()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBClientBulkWrite-updateMany",
              },
              {
                label: "updateOne()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBClientBulkWrite-updateOne",
              },
              {
                label: "withCollection()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBClientBulkWrite-withCollection",
              },
            ]
          },
          {
            label: "MongoDB\\Database",
            contentSite: "php-library",
            url: "/docs/php-library/:version/reference/class/MongoDBDatabase",
            collapsible: true,
            items: [
              {
                label: "__construct()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBDatabase__construct",
              },
              {
                label: "__get()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBDatabase__get",
              },
              {
                label: "aggregate()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBDatabase-aggregate",
              },
              {
                label: "command()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBDatabase-command",
              },
              {
                label: "createCollection()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBDatabase-createCollection",
              },
              {
                label: "createEncryptedCollection()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBDatabase-createEncryptedCollection",
              },
              {
                label: "drop()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBDatabase-drop",
              },
              {
                label: "dropCollection()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBDatabase-dropCollection",
              },
              {
                label: "getCollection()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBDatabase-getCollection",
              },
              {
                label: "getDatabaseName()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBDatabase-getDatabaseName",
              },
              {
                label: "getManager()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBDatabase-getManager",
              },
              {
                label: "getReadConcern()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBDatabase-getReadConcern",
              },
              {
                label: "getReadPreference()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBDatabase-getReadPreference",
              },
              {
                label: "getTypeMap()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBDatabase-getTypeMap",
              },
              {
                label: "getWriteConcern()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBDatabase-getWriteConcern",
              },
              {
                label: "listCollectionNames()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBDatabase-listCollectionNames",
              },
              {
                label: "listCollections()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBDatabase-listCollections",
              },
              {
                label: "modifyCollection()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBDatabase-modifyCollection",
              },
              {
                label: "renameCollection()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBDatabase-renameCollection",
              },
              {
                label: "selectCollection()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBDatabase-selectCollection",
              },
              {
                label: "selectGridFSBucket()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBDatabase-selectGridFSBucket",
              },
              {
                label: "watch()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBDatabase-watch",
              },
              {
                label: "withOptions()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBDatabase-withOptions",
              },
            ]
          },
          {
            label: "MongoDB\\Collection",
            contentSite: "php-library",
            url: "/docs/php-library/:version/reference/class/MongoDBCollection",
            collapsible: true,
            items: [
              {
                label: "__construct()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection__construct",
              },
              {
                label: "aggregate()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-aggregate",
              },
              {
                label: "bulkWrite()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-bulkWrite",
              },
              {
                label: "count()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-count",
              },
              {
                label: "countDocuments()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-countDocuments",
              },
              {
                label: "createIndex()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-createIndex",
              },
              {
                label: "createIndexes()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-createIndexes",
              },
              {
                label: "createSearchIndex()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-createSearchIndex",
              },
              {
                label: "createSearchIndexes()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-createSearchIndexes",
              },
              {
                label: "deleteMany()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-deleteMany",
              },
              {
                label: "deleteOne()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-deleteOne",
              },
              {
                label: "distinct()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-distinct",
              },
              {
                label: "drop()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-drop",
              },
              {
                label: "dropIndex()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-dropIndex",
              },
              {
                label: "dropIndexes()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-dropIndexes",
              },
              {
                label: "dropSearchIndex()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-dropSearchIndex",
              },
              {
                label: "estimatedDocumentCount()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-estimatedDocumentCount",
              },
              {
                label: "explain()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-explain",
              },
              {
                label: "find()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-find",
              },
              {
                label: "findOne()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-findOne",
              },
              {
                label: "findOneAndDelete()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-findOneAndDelete",
              },
              {
                label: "findOneAndReplace()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-findOneAndReplace",
              },
              {
                label: "findOneAndUpdate()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-findOneAndUpdate",
              },
              {
                label: "getCollectionName()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-getCollectionName",
              },
              {
                label: "getDatabaseName()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-getDatabaseName",
              },
              {
                label: "getManager()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-getManager",
              },
              {
                label: "getNamespace()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-getNamespace",
              },
              {
                label: "getReadConcern()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-getReadConcern",
              },
              {
                label: "getReadPreference()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-getReadPreference",
              },
              {
                label: "getTypeMap()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-getTypeMap",
              },
              {
                label: "getWriteConcern()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-getWriteConcern",
              },
              {
                label: "insertMany()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-insertMany",
              },
              {
                label: "insertOne()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-insertOne",
              },
              {
                label: "listIndexes()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-listIndexes",
              },
              {
                label: "listSearchIndexes()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-listSearchIndexes",
              },
              {
                label: "rename()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-rename",
              },
              {
                label: "replaceOne()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-replaceOne",
              },
              {
                label: "updateMany()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-updateMany",
              },
              {
                label: "updateOne()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-updateOne",
              },
              {
                label: "updateSearchIndex()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-updateSearchIndex",
              },
              {
                label: "watch()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-watch",
              },
              {
                label: "withOptions()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBCollection-withOptions",
              },
            ]
          },
          {
            label: "MongoDB\\GridFS\\Bucket",
            contentSite: "php-library",
            url: "/docs/php-library/:version/reference/class/MongoDBGridFSBucket",
            collapsible: true,
            items: [
              {
                label: "__construct()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBGridFSBucket__construct",
              },
              {
                label: "delete()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBGridFSBucket-delete",
              },
              {
                label: "deleteByName()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBGridFSBucket-deleteByName",
              },
              {
                label: "downloadToStream()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBGridFSBucket-downloadToStream",
              },
              {
                label: "downloadToStreamByName()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBGridFSBucket-downloadToStreamByName",
              },
              {
                label: "drop()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBGridFSBucket-drop",
              },
              {
                label: "find()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBGridFSBucket-find",
              },
              {
                label: "findOne()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBGridFSBucket-findOne",
              },
              {
                label: "getBucketName()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBGridFSBucket-getBucketName",
              },
              {
                label: "getChunksCollection()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBGridFSBucket-getChunksCollection",
              },
              {
                label: "getChunkSizeBytes()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBGridFSBucket-getChunkSizeBytes",
              },
              {
                label: "getDatabaseName()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBGridFSBucket-getDatabaseName",
              },
              {
                label: "getFileDocumentForStream()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBGridFSBucket-getFileDocumentForStream",
              },
              {
                label: "getFileIdForStream()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBGridFSBucket-getFileIdForStream",
              },
              {
                label: "getFilesCollection()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBGridFSBucket-getFilesCollection",
              },
              {
                label: "getReadConcern()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBGridFSBucket-getReadConcern",
              },
              {
                label: "getReadPreference()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBGridFSBucket-getReadPreference",
              },
              {
                label: "getTypeMap()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBGridFSBucket-getTypeMap",
              },
              {
                label: "getWriteConcern()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBGridFSBucket-getWriteConcern",
              },
              {
                label: "openDownloadStream()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBGridFSBucket-openDownloadStream",
              },
              {
                label: "openDownloadStreamByName()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBGridFSBucket-openDownloadStreamByName",
              },
              {
                label: "openUploadStream()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBGridFSBucket-openUploadStream",
              },
              {
                label: "registerGlobalStreamWrapperAlias()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBGridFSBucket-registerGlobalStreamWrapperAlias",
              },
              {
                label: "rename()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBGridFSBucket-rename",
              },
              {
                label: "renameByName()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBGridFSBucket-renameByName",
              },
              {
                label: "uploadFromStream()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/method/MongoDBGridFSBucket-uploadFromStream",
              },
            ]
          },
          {
            label: "Result Classes",
            contentSite: "php-library",
            collapsible: true,
            items: [
              {
                label: "BulkWriteCommandResult",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/class/MongoDBBulkWriteCommandResult",
                versions: {"excludes":["v1.x"]}
              },
              {
                label: "BulkWriteResult",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/class/MongoDBBulkWriteResult",
                collapsible: true,
                items: [
                  {
                    label: "getDeletedCount()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBBulkWriteResult-getDeletedCount",
                  },
                  {
                    label: "getInsertedCount()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBBulkWriteResult-getInsertedCount",
                  },
                  {
                    label: "getInsertedIds()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBBulkWriteResult-getInsertedIds",
                  },
                  {
                    label: "getMatchedCount()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBBulkWriteResult-getMatchedCount",
                  },
                  {
                    label: "getModifiedCount()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBBulkWriteResult-getModifiedCount",
                  },
                  {
                    label: "getUpsertedCount()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBBulkWriteResult-getUpsertedCount",
                  },
                  {
                    label: "getUpsertedIds()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBBulkWriteResult-getUpsertedIds",
                  },
                  {
                    label: "isAcknowledged()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBBulkWriteResult-isAcknowledged",
                  },
                ]
              },
              {
                label: "DeleteResult",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/class/MongoDBDeleteResult",
                collapsible: true,
                items: [
                  {
                    label: "getDeletedCount()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBDeleteResult-getDeletedCount",
                  },
                  {
                    label: "isAcknowledged()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBDeleteResult-isAcknowledged",
                  },
                ]
              },
              {
                label: "InsertManyResult",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/class/MongoDBInsertManyResult",
                collapsible: true,
                items: [
                  {
                    label: "getInsertedCount()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBInsertManyResult-getInsertedCount",
                  },
                  {
                    label: "getInsertedIds()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBInsertManyResult-getInsertedIds",
                  },
                  {
                    label: "isAcknowledged()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBInsertManyResult-isAcknowledged",
                  },
                ]
              },
              {
                label: "InsertOneResult",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/class/MongoDBInsertOneResult",
                collapsible: true,
                items: [
                  {
                    label: "getInsertedCount()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBInsertOneResult-getInsertedCount",
                  },
                  {
                    label: "getInsertedId()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBInsertOneResult-getInsertedId",
                  },
                  {
                    label: "isAcknowledged()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBInsertOneResult-isAcknowledged",
                  },
                ]
              },
              {
                label: "UpdateResult",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/class/MongoDBUpdateResult",
                collapsible: true,
                items: [
                  {
                    label: "getMatchedCount()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBUpdateResult-getMatchedCount",
                  },
                  {
                    label: "getModifiedCount()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBUpdateResult-getModifiedCount",
                  },
                  {
                    label: "getUpsertedCount()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBUpdateResult-getUpsertedCount",
                  },
                  {
                    label: "getUpsertedId()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBUpdateResult-getUpsertedId",
                  },
                  {
                    label: "isAcknowledged()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBUpdateResult-isAcknowledged",
                  },
                ]
              },
              {
                label: "ChangeStream",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/class/MongoDBChangeStream",
                collapsible: true,
                items: [
                  {
                    label: "current()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBChangeStream-current",
                  },
                  {
                    label: "getCursorId()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBChangeStream-getCursorId",
                  },
                  {
                    label: "getResumeToken()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBChangeStream-getResumeToken",
                  },
                  {
                    label: "key()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBChangeStream-key",
                  },
                  {
                    label: "next()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBChangeStream-next",
                  },
                  {
                    label: "rewind()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBChangeStream-rewind",
                  },
                  {
                    label: "valid()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBChangeStream-valid",
                  },
                ]
              },
              {
                label: "CollectionInfo",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/class/MongoDBModelCollectionInfo",
                collapsible: true,
                items: [
                  {
                    label: "getCappedMax()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBModelCollectionInfo-getCappedMax",
                  },
                  {
                    label: "getCappedSize()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBModelCollectionInfo-getCappedSize",
                  },
                  {
                    label: "getIdIndex()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBModelCollectionInfo-getIdIndex",
                  },
                  {
                    label: "getInfo()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBModelCollectionInfo-getInfo",
                  },
                  {
                    label: "getName()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBModelCollectionInfo-getName",
                  },
                  {
                    label: "getOptions()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBModelCollectionInfo-getOptions",
                  },
                  {
                    label: "getType()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBModelCollectionInfo-getType",
                  },
                  {
                    label: "isCapped()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBModelCollectionInfo-isCapped",
                  },
                  {
                    label: "isView()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBModelCollectionInfo-isView",
                    versions: {"excludes":["v1.x"]}
                  },
                ]
              },
              {
                label: "DatabaseInfo",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/class/MongoDBModelDatabaseInfo",
                collapsible: true,
                items: [
                  {
                    label: "getName()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBModelDatabaseInfo-getName",
                  },
                  {
                    label: "getSizeOnDisk()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBModelDatabaseInfo-getSizeOnDisk",
                  },
                  {
                    label: "isEmpty()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBModelDatabaseInfo-isEmpty",
                  },
                ]
              },
              {
                label: "IndexInfo",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/class/MongoDBModelIndexInfo",
                collapsible: true,
                items: [
                  {
                    label: "getKey()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBModelIndexInfo-getKey",
                  },
                  {
                    label: "getName()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBModelIndexInfo-getName",
                  },
                  {
                    label: "getNamespace()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBModelIndexInfo-getNamespace",
                  },
                  {
                    label: "getVersion()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBModelIndexInfo-getVersion",
                  },
                  {
                    label: "is2dSphere()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBModelIndexInfo-is2dSphere",
                  },
                  {
                    label: "isSparse()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBModelIndexInfo-isSparse",
                  },
                  {
                    label: "isText()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBModelIndexInfo-isText",
                  },
                  {
                    label: "isTtl()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBModelIndexInfo-isTtl",
                  },
                  {
                    label: "isUnique()",
                    contentSite: "php-library",
                    url: "/docs/php-library/:version/reference/method/MongoDBModelIndexInfo-isUnique",
                  },
                ]
              },
            ]
          },
          {
            label: "Functions",
            contentSite: "php-library",
            collapsible: true,
            items: [
              {
                label: "add_logger()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/function/add_logger",
              },
              {
                label: "remove_logger()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/function/remove_logger",
              },
              {
                label: "with_transaction()",
                contentSite: "php-library",
                url: "/docs/php-library/:version/reference/function/with_transaction",
              },
            ]
          },
          {
            label: "Exception Classes",
            contentSite: "php-library",
            url: "/docs/php-library/:version/reference/exception-classes",
          },
        ]
      },
      {
        label: "Issues & Help",
        contentSite: "php-library",
        url: "/docs/php-library/:version/issues-and-help",
      },
    ],
  },
];

export default tocData;
