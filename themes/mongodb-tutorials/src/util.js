import elementClass from 'element-class'
import React from 'react'
import ReactDOM from 'react-dom'
import Velocity from 'velocity-animate'

const CodeWidget = require('@mongodb-js/mongodb-ui-components/build/code-widget')

const utils = {
  setupCopyButtons () {
    const copyableBlocks = document.getElementsByClassName('highlight')
    for (const highlightElement of copyableBlocks) {
      const text = highlightElement.innerText.trim()
      const copyButtonContainer = document.createElement('div')
      const copyButton = document.createElement('button')
      copyButtonContainer.className = 'copy-button-container'
      copyButton.className = 'copy-button'
      copyButton.appendChild(document.createTextNode('Copy'))
      copyButtonContainer.appendChild(copyButton)
      highlightElement.insertBefore(copyButtonContainer, highlightElement.children[0])
      copyButton.addEventListener('click', () => {
        const tempElement = document.createElement('textarea')
        document.body.appendChild(tempElement)
        tempElement.value = text
        tempElement.select()

        try {
          const successful = document.execCommand('copy')
          if (!successful) {
            throw new Error('Failed to copy')
          }
        } catch (err) {
          console.error('Failed to copy')
          console.error(err)
        }

        document.body.removeChild(tempElement)
      })
    }
  },

  setupSidebar () {
    const tocLinks = document.querySelectorAll('.toc__link')

    tocLinks.forEach((link) => {
      // handle opening & closing of the toc
      const nestedList = link.nextElementSibling

      if (nestedList) {
        link.addEventListener('click', (e) => {
          const $link = elementClass(link)

          if ($link.has('toc__link--open')) {
            $link.remove('toc__link--open')
            Velocity(nestedList, 'slideUp', { duration: 400 })
          } else {
            $link.add('toc__link--open')
            Velocity(nestedList, 'slideDown', { duration: 400 })
          }
        })
      }

      link.addEventListener('click', (e) => {
        tocLinks.forEach(l => elementClass(l).remove('toc__link--active'))
        elementClass(link).add('toc__link--active')
      })
    })
  },

  // this is currently only used on the landing pages
  setupList () {
    const links = document.querySelectorAll('.list__item__title')

    links.forEach((link) => {
      const nestedList = link.nextElementSibling

      link.parentElement.addEventListener('click', (e) => {
        const $link = elementClass(link)

        if ($link.has('list__item--open')) {
          $link.remove('list__item--open')
          Velocity(nestedList, 'slideUp', { duration: 400 })
        } else {
          $link.add('list__item--open')
          Velocity(nestedList, 'slideDown', { duration: 400 })
        }
      })
    })
  },

  // this is currently only used on the home landing page
  setupCodeWidget () {
    const widgetData = {
      "descriptions": [
        {
          "title": "Connect",
          "content": "Here we are connecting to a locally hosted MongoDB database called <span class=\"monospace\">test</span> with a collection named <span class=\"monospace\">restaurants</span>."
        },
        {
          "title": "Insert a document",
          "content": "5 example documents are being inserted into the <span class=\"monospace\">restaurants</span> collection. Each document represents a restuarant with a name, star rating, and categories (stored as an array)."
        },
        {
          "title": "Create a query",
          "content": "In this example, we run a simple query to get all of the documents in the <span class=\"monospace\">restaurants</span> collection and store them as an array."
        },
        {
          "title": "Build an index",
          "content": "Indexes in MongoDB are similar to indexes in other database systems. MongoDB supports indexes on any field or sub-field of a document in a collection. Here, we are building an index on the name field with sort order ascending."
        },
        {
          "title": "Aggregate",
          "content": "Using MongoDB’s aggregation pipeline, you can filter and analyze data based on a given set of criteria. In this example, we pull all the documents in the restaurants collection that have a category of Bakery using the <span class=\"monospace\">$match</span> operator and then group them by their star rating using the <span class=\"monospace\">$group</span> operator. Using the accumulator operator, <span class=\"monospace\">$sum</span>, we can see how many bakeries in our collection have each star rating."
        }
      ],
      "snippets": [
        {
          "language": "Python",
          "stages": [
            "\n# 1. Connect to MongoDB instance running on localhost\nclient = pymongo.MongoClient()\n\n# Access the 'restaurants' collection in the 'test' database\ncollection = client.test.restaurants\n",
            "\n# 2. Insert \nnew_documents = [\n  {\n    \"name\": \"Sun Bakery Trattoria\",\n    \"stars\": 4,\n    \"categories\": [\"Pizza\",\"Pasta\",\"Italian\",\"Coffee\",\"Sandwiches\"]\n  }, {\n    \"name\": \"Blue Bagels Grill\",\n    \"stars\": 3,\n    \"categories\": [\"Bagels\",\"Cookies\",\"Sandwiches\"]\n  }, {\n    \"name\": \"Hot Bakery Cafe\",\n    \"stars\": 4,\n    \"categories\": [\"Bakery\",\"Cafe\",\"Coffee\",\"Dessert\"]\n  }, {\n    \"name\": \"XYZ Coffee Bar\",\n    \"stars\": 5,\n    \"categories\": [\"Coffee\",\"Cafe\",\"Bakery\",\"Chocolates\"]\n  }, {\n    \"name\": \"456 Cookies Shop\",\n    \"stars\": 4,\n    \"categories\": [\"Bakery\",\"Cookies\",\"Cake\",\"Coffee\"]\n  }\n]\n\ncollection.insert_many(new_documents)\n",
            "\n# 3. Query \nfor restaurant in collection.find():\n  pprint.pprint(restaurant)\n",
            "\n# 4. Create Index \ncollection.create_index([('name', pymongo.ASCENDING)])\n",
            "\n# 5. Perform aggregation\npipeline = [\n  {\"$match\": {\"categories\": \"Bakery\"}},\n  {\"$group\": {\"_id\": \"$stars\", \"count\": {\"$sum\": 1}}}\n]\n\npprint.pprint(list(collection.aggregate(pipeline)))\n"
          ],
          "documentation": [
            "http://api.mongodb.com/python/current/index.html",
            "http://api.mongodb.com/python/current/index.html",
            "http://api.mongodb.com/python/current/index.html",
            "http://api.mongodb.com/python/current/index.html",
            "http://api.mongodb.com/python/current/index.html"
          ],
          "sourceCode": "import pprint\nimport pymongo\n\ndef main():\n  # 1. Connect to MongoDB instance running on localhost\n  client = pymongo.MongoClient()\n\n  # Access the 'restaurants' collection in the 'test' database\n  collection = client.test.restaurants\n\n  # 2. Insert \n  new_documents = [\n    {\"name\":\"Sun Bakery Trattoria\", \"stars\":4, \"categories\":[\"Pizza\",\"Pasta\",\"Italian\",\"Coffee\",\"Sandwiches\"]},\n    {\"name\":\"Blue Bagels Grill\", \"stars\":3, \"categories\":[\"Bagels\",\"Cookies\",\"Sandwiches\"]},\n    {\"name\":\"Hot Bakery Cafe\",\"stars\":4,\"categories\":[\"Bakery\",\"Cafe\",\"Coffee\",\"Dessert\"]},\n    {\"name\":\"XYZ Coffee Bar\",\"stars\":5,\"categories\":[\"Coffee\",\"Cafe\",\"Bakery\",\"Chocolates\"]},\n    {\"name\":\"456 Cookies Shop\",\"stars\":4,\"categories\":[\"Bakery\",\"Cookies\",\"Cake\",\"Coffee\"]}]\n\n  collection.insert_many(new_documents)\n\n  # 3. Query \n  for restaurant in collection.find():\n      pprint.pprint(restaurant)\n\n  # 4. Create Index \n  collection.create_index([('name', pymongo.ASCENDING)])\n\n  # 5. Perform aggregation\n  pipeline = [\n    {\"$match\": {\"categories\": \"Bakery\"}},\n    {\"$group\": {\"_id\": \"$stars\", \"count\": {\"$sum\": 1}}}]\n  pprint.pprint(list(collection.aggregate(pipeline)))\n\nif __name__ == '__main__':\n  main()"
        },
        {
          "language": "Java",
          "stages": [
            "\n// 1. Connect to MongoDB instance running on localhost\nMongoClient mongoClient = new MongoClient();\n\n// Access database named 'test'\nMongoDatabase database = mongoClient.getDatabase(\"test\");\n\n// Access collection named 'restaurants'\nMongoCollection<Document> collection = database.getCollection(\"restaurants\");\n",
            "\n// 2. Insert \nList<Document> documents = asList(\n  new Document(\"name\", \"Sun Bakery Trattoria\")\n    .append(\"stars\", 4)\n    .append(\"categories\",\n      asList(\"Pizza\", \"Pasta\", \"Italian\", \"Coffee\", \"Sandwiches\")),\n  new Document(\"name\", \"Blue Bagels Grill\")\n    .append(\"stars\", 3)\n    .append(\"categories\",\n      asList(\"Bagels\", \"Cookies\", \"Sandwiches\")),\n  new Document(\"name\", \"Hot Bakery Cafe\")\n    .append(\"stars\", 4)\n    .append(\"categories\",\n      asList(\"Bakery\", \"Cafe\", \"Coffee\", \"Dessert\")),\n  new Document(\"name\", \"XYZ Coffee Bar\")\n    .append(\"stars\", 5)\n    .append(\"categories\",\n      asList(\"Coffee\", \"Cafe\", \"Bakery\", \"Chocolates\")),\n  new Document(\"name\", \"456 Cookies Shop\")\n    .append(\"stars\", 4)\n    .append(\"categories\",\n      asList(\"Bakery\", \"Cookies\", \"Cake\", \"Coffee\")));\n\ncollection.insertMany(documents);\n",
            "\n// 3. Query \nList<Document> results = collection.find().into(new ArrayList<>());\n",
            "\n// 4. Create Index \ncollection.createIndex(Indexes.ascending(\"name\"));\n",
            "\n// 5. Perform Aggregation\ncollection.aggregate(asList(match(eq(\"categories\", \"Bakery\")),\n  group(\"$stars\", sum(\"count\", 1))));\n\nmongoClient.close();\n"
          ],
          "documentation": [
            "http://mongodb.github.io/mongo-java-driver/",
            "http://mongodb.github.io/mongo-java-driver/",
            "http://mongodb.github.io/mongo-java-driver/",
            "http://mongodb.github.io/mongo-java-driver/",
            "http://mongodb.github.io/mongo-java-driver/"
          ],
          "sourceCode": "import com.mongodb.MongoClient;\nimport com.mongodb.client.MongoCollection;\nimport com.mongodb.client.MongoDatabase;\nimport org.bson.Document;\n\nimport java.util.ArrayList;\nimport java.util.List;\n\nimport com.mongodb.client.model.Indexes;\n\nimport static com.mongodb.client.model.Accumulators.sum;\nimport static com.mongodb.client.model.Aggregates.group;\nimport static com.mongodb.client.model.Aggregates.match;\nimport static com.mongodb.client.model.Filters.eq;\nimport static java.util.Arrays.asList;\n\npublic class MongoDBExamples {\n\n public static void main(final String[] args) {\n\n   // 1. Connect to MongoDB instance running on localhost\n   MongoClient mongoClient = new MongoClient();\n\n   // Access database named 'test'\n   MongoDatabase database = mongoClient.getDatabase(\"test\");\n\n   // Access collection named 'restaurants'\n   MongoCollection<Document> collection = database.getCollection(\"restaurants\");\n\n   // 2. Insert \n   List<Document> documents = asList(\n     new Document(\"name\", \"Sun Bakery Trattoria\")\n       .append(\"stars\", 4)\n       .append(\"categories\", asList(\"Pizza\", \"Pasta\", \"Italian\", \"Coffee\", \"Sandwiches\")),\n     new Document(\"name\", \"Blue Bagels Grill\")\n       .append(\"stars\", 3)\n       .append(\"categories\", asList(\"Bagels\", \"Cookies\", \"Sandwiches\")),\n     new Document(\"name\", \"Hot Bakery Cafe\")\n       .append(\"stars\", 4)\n       .append(\"categories\", asList(\"Bakery\", \"Cafe\", \"Coffee\", \"Dessert\")),\n     new Document(\"name\", \"XYZ Coffee Bar\")\n       .append(\"stars\", 5)\n       .append(\"categories\", asList(\"Coffee\", \"Cafe\", \"Bakery\", \"Chocolates\")),\n     new Document(\"name\", \"456 Cookies Shop\")\n       .append(\"stars\", 4)\n       .append(\"categories\", asList(\"Bakery\", \"Cookies\", \"Cake\", \"Coffee\")));\n\n   collection.insertMany(documents);\n\n\n   // 3. Query \n   List<Document> results = collection.find().into(new ArrayList<>());\n\n\n   // 4. Create Index \n   collection.createIndex(Indexes.ascending(\"name\"));\n   // 5. Perform Aggregation\n   collection.aggregate(asList(match(eq(\"categories\", \"Bakery\")),\n     group(\"$stars\", sum(\"count\", 1))));\n\n\n    mongoClient.close();\n\n }\n\n}"
        },
        {
          "language": "C++",
          "stages": [
            "\n// 1. Connect to MongoDB instance running on localhost\nmongocxx::instance instance{};\nmongocxx::client client{mongocxx::uri{}};\n\nmongocxx::database db = client[\"test\"];\nmongocxx::collection coll = db[\"restaurants\"];\n",
            "\n// 2. Insert\nusing bsoncxx::builder::basic::kvp;\nbsoncxx::builder::basic::document doc1;\ndoc1.append(\n  kvp(\"name\", \"Sun Bakery Trattoria\"),\n  kvp(\"stars\", 4),\n  kvp(\"categories\", [](bsoncxx::builder::basic::sub_array arr) {\n    arr.append(\"Pizza\", \"Pasta\", \"Italian\", \"Coffee\", \"Sandwiches\");\n  }));\n\nbsoncxx::builder::basic::document doc2;\ndoc2.append(\n  kvp(\"name\", \"Blue Bagels Grill\"),\n  kvp(\"stars\", 3),\n  kvp(\"categories\", [](bsoncxx::builder::basic::sub_array arr) {\n    arr.append(\"Bagels\", \"Cookies\", \"Sandwiches\");\n  }));\n\nbsoncxx::builder::basic::document doc3;\ndoc3.append(\n  kvp(\"name\", \"Hot Bakery Cafe\"),\n  kvp(\"stars\", 4),\n  kvp(\"categories\", [](bsoncxx::builder::basic::sub_array arr) {\n    arr.append(\"Bakery\", \"Cafe\", \"Coffee\", \"Dessert\");\n  }));\n\nbsoncxx::builder::basic::document doc4;\ndoc4.append(\n  kvp(\"name\", \"XYZ Coffee Bar\"),\n  kvp(\"stars\", 5),\n  kvp(\"categories\", [](bsoncxx::builder::basic::sub_array arr) {\n    arr.append(\"Bakery\", \"Coffee\", \"Cafe\", \"Bakery\", \"Chocolates\");\n  }));\n\nbsoncxx::builder::basic::document doc5;\ndoc5.append(\n  kvp(\"name\", \"456 Cookies Shop\"),\n  kvp(\"stars\", 4),\n  kvp(\"categories\", [](bsoncxx::builder::basic::sub_array arr) {\n    arr.append(\"Bakery\", \"Cookies\", \"Cake\", \"Coffee\");\n  }));\n\nstd::vector<bsoncxx::document::value> documents = {\n  doc1.extract(),\n  doc2.extract(),\n  doc3.extract(),\n  doc4.extract(),\n  doc5.extract()\n};\n\nauto result = coll.insert_many(documents);\n",
            "\n// 3. Query\nfor (auto&& doc : coll.find({})) {\n  std::cout << bsoncxx::to_json(doc) << std::endl;\n}\n",
            "\n// 4. Create Index\nbsoncxx::builder::basic::document index_specification;\nindex_specification.append(kvp(\"name\", 1));\n\ncoll.create_index(index_specification.extract());\n",
            "\n// 5. Perform aggregation\nmongocxx::pipeline stages;\n\nbsoncxx::builder::basic::document match_stage;\nbsoncxx::builder::basic::document group_stage;\n\nusing bsoncxx::builder::basic::sub_document;\n\nmatch_stage.append(kvp(\"categories\", \"Bakery\"));\ngroup_stage.append(\n  kvp(\"_id\", \"$stars\"),\n  kvp(\"count\", [](sub_document sub) { sub.append(kvp(\"$sum\", 1)); }));\n\nstages.match(match_stage.view()).group(group_stage.view());\n\nfor (auto&& doc : coll.aggregate(stages)) {\n  std::cout << bsoncxx::to_json(doc) << std::endl;\n}\n"
          ],
          "documentation": [
            "https://mongodb.github.io/mongo-cxx-driver/",
            "https://mongodb.github.io/mongo-cxx-driver/",
            "https://mongodb.github.io/mongo-cxx-driver/",
            "https://mongodb.github.io/mongo-cxx-driver/",
            "https://mongodb.github.io/mongo-cxx-driver/"
          ],
          "sourceCode": "#include <iostream>\n\n#include <bsoncxx/builder/basic/document.hpp>\n#include <bsoncxx/builder/basic/kvp.hpp>\n#include <bsoncxx/builder/basic/sub_array.hpp>\n#include <bsoncxx/json.hpp>\n#include <mongocxx/client.hpp>\n#include <mongocxx/collection.hpp>\n#include <mongocxx/database.hpp>\n#include <mongocxx/instance.hpp>\n#include <mongocxx/uri.hpp>\n\nint main() {\n  // 1. Connect to MongoDB instance running on localhost\n  mongocxx::instance instance{};\n  mongocxx::client client{mongocxx::uri{}};\n\n  mongocxx::database db = client[\"test\"];\n  mongocxx::collection coll = db[\"restaurants\"];\n\n  // 2. Insert\n  using bsoncxx::builder::basic::kvp;\n  bsoncxx::builder::basic::document doc1;\n  doc1.append(kvp(\"name\", \"Sun Bakery Trattoria\"),\n              kvp(\"stars\", 4),\n              kvp(\"categories\", [](bsoncxx::builder::basic::sub_array arr) {\n                arr.append(\"Pizza\", \"Pasta\", \"Italian\", \"Coffee\", \"Sandwiches\");\n              }));\n\n  bsoncxx::builder::basic::document doc2;\n  doc2.append(kvp(\"name\", \"Blue Bagels Grill\"),\n              kvp(\"stars\", 3),\n              kvp(\"categories\", [](bsoncxx::builder::basic::sub_array arr) {\n                arr.append(\"Bagels\", \"Cookies\", \"Sandwiches\");\n              }));\n              bsoncxx::builder::basic::document doc3;\n  doc3.append(kvp(\"name\", \"Hot Bakery Cafe\"),\n              kvp(\"stars\", 4),\n              kvp(\"categories\", [](bsoncxx::builder::basic::sub_array arr) {\n                arr.append(\"Bakery\", \"Cafe\", \"Coffee\", \"Dessert\");\n              }));\n\n  bsoncxx::builder::basic::document doc4;\n  doc4.append(kvp(\"name\", \"XYZ Coffee Bar\"),\n              kvp(\"stars\", 5),\n              kvp(\"categories\", [](bsoncxx::builder::basic::sub_array arr) {\n                arr.append(\"Bakery\", \"Coffee\", \"Cafe\", \"Bakery\", \"Chocolates\");\n              }));\n\n  bsoncxx::builder::basic::document doc5;\n  doc5.append(kvp(\"name\", \"456 Cookies Shop\"),\n              kvp(\"stars\", 4),\n              kvp(\"categories\", [](bsoncxx::builder::basic::sub_array arr) {\n                arr.append(\"Bakery\", \"Cookies\", \"Cake\", \"Coffee\");\n              }));\n\n  std::vector<bsoncxx::document::value> documents = {\n      doc1.extract(), doc2.extract(), doc3.extract(), doc4.extract(), doc5.extract()};\n\n  auto result = coll.insert_many(documents);\n\n  // 3. Query\n  for (auto&& doc : coll.find({})) {\n    std::cout << bsoncxx::to_json(doc) << std::endl;\n  }\n\n  // 4. Create Index\n  bsoncxx::builder::basic::document index_specification;\n  index_specification.append(kvp(\"name\", 1));\n\n  coll.create_index(index_specification.extract());\n\n  // 5. Perform aggregation\n  mongocxx::pipeline stages;\n\n  bsoncxx::builder::basic::document match_stage;\n  bsoncxx::builder::basic::document group_stage;\n\n  using bsoncxx::builder::basic::sub_document;\n\n  match_stage.append(kvp(\"categories\", \"Bakery\"));\n  group_stage.append(kvp(\"_id\", \"$stars\"),\n                     kvp(\"count\", [](sub_document sub) { sub.append(kvp(\"$sum\", 1)); }));\n\n  stages.match(match_stage.view()).group(group_stage.view());\n\n  for (auto&& doc : coll.aggregate(stages)) {\n    std::cout << bsoncxx::to_json(doc) << std::endl;\n  }\n}"
        },
        {
          "language": "C#",
          "stages": [
            "\n//1. Connect to MongoDB instance running on localhost\nvar client = new MongoClient();\n\n//Access database named 'test'\nvar database = client.GetDatabase(\"test\");\n\n//Access collection named 'restaurants'\nvar collection = database.GetCollection<BsonDocument>(\"restaurants\");\n",
            "\n//2. Insert\nvar documents = new List<BsonDocument>() {\n  new BsonDocument() {\n    { \"name\", \"Sun Bakery Trattoria\" },\n    { \"stars\", 4 },\n    { \"categories\", new BsonArray {\n        \"Pizza\", \"Pasta\", \"Italian\", \"Coffee\", \"Sandwiches\"\n      }\n    }\n  },\n  new BsonDocument() {\n    { \"name\", \"Blue Bagels Grill\" },\n    { \"stars\", 3 },\n    { \"categories\", new BsonArray {\n        \"Bagels\", \"Cookies\", \"Sandwiches\"\n      }\n    }\n  },\n  new BsonDocument() {\n    { \"name\", \"Hot Bakery Cafe\" },\n    { \"stars\", 4 },\n    { \"categories\", new BsonArray {\n        \"Bakery\", \"Cafe\", \"Coffee\", \"Dessert\"\n      }\n    }\n  },\n  new BsonDocument() {\n    { \"name\", \"XYZ Coffee Bar\" },\n    { \"stars\", 5 },\n    { \"categories\", new BsonArray {\n        \"Coffee\", \"Cafe\", \"Bakery\", \"Chocolates\"\n      }\n    }\n  },\n  new BsonDocument() {\n    { \"name\", \"456 Cookies Shop\" },\n    { \"stars\", 4 },\n    { \"categories\", new BsonArray {\n        \"Bakery\", \"Cookies\", \"Cake\", \"Coffee\"\n      }\n    }\n  }\n};\n\ncollection.InsertMany(documents);\n",
            "\n//3. Query\nvar documents = collection.Find(new BsonDocument()).ToList();\n",
            "\n//4. Create Index\nvar keys = Builders<BsonDocument>.IndexKeys.Ascending(\"name\");\n\ncollection.Indexes.CreateOne(keys);\n",
            "\n//5. Perform Aggregation\nvar aggregate = collection.Aggregate()\n  .Match(new BsonDocument {\n    { \"categories\", \"Bakery\" }\n  })\n  .Group(new BsonDocument {\n    { \"_id\", \"$stars\" },\n    { \"count\", new BsonDocument(\"$sum\", 1) }\n  });\nvar results = aggregate.ToList();\n"
          ],
          "documentation": [
            "https://mongodb.github.io/mongo-csharp-driver/",
            "https://mongodb.github.io/mongo-csharp-driver/",
            "https://mongodb.github.io/mongo-csharp-driver/",
            "https://mongodb.github.io/mongo-csharp-driver/",
            "https://mongodb.github.io/mongo-csharp-driver/"
          ],
          "sourceCode": "using System;\nusing MongoDB.Bson;\nusing MongoDB.Driver;\n\nnamespace MongoDBExamples\n{\n  public class Examples\n  {\n    public static void Main()\n    {\n      // 1. Connect to MongoDB instance running on localhost\n      var client = new MongoClient();\n\n      // Access database named 'test'\n      var database = client.GetDatabase(\"test\");\n      \n      // Access collection named 'restaurants'\n      var collection = database.GetCollection<BsonDocument>(\"restaurants\");\n\n      // 2. Insert\n      var documents = new List<BsonDocument>() {\n        new BsonDocument() { { \"name\", \"Sun Bakery Trattoria\" }, {\"stars\", 4}, {\"categories\", new BsonArray {\"Pizza\",\"Pasta\",\"Italian\",\"Coffee\",\"Sandwiches\"}}},\n        new BsonDocument() { { \"name\", \"Blue Bagels Grill\" }, {\"stars\", 3}, {\"categories\", new BsonArray {\"Bagels\",\"Cookies\",\"Sandwiches\"}}},\n        new BsonDocument() { { \"name\", \"Hot Bakery Cafe\" }, {\"stars\", 4}, {\"categories\", new BsonArray {\"Bakery\",\"Cafe\",\"Coffee\",\"Dessert\"}}},\n        new BsonDocument() { { \"name\", \"XYZ Coffee Bar\" }, {\"stars\", 5}, {\"categories\", new BsonArray {\"Coffee\",\"Cafe\",\"Bakery\",\"Chocolates\"}}},\n        new BsonDocument() { { \"name\", \"456 Cookies Shop\" }, {\"stars\", 4}, {\"categories\", new BsonArray {\"Bakery\",\"Cookies\",\"Cake\",\"Coffee\"}}}\n      };\n      collection.InsertMany(documents);\n      \n      // 3. Query\n      var documents = collection.Find(new BsonDocument()).ToList();\n      \n      // 4. Create Index\n      var keys = Builders<BsonDocument>.IndexKeys.Ascending(\"name\");\n      collection.Indexes.CreateOne(keys);\n      \n      // 5. Perform Aggregation\n      var aggregate = collection.Aggregate()\n        .Match(new BsonDocument { { \"categories\", \"Bakery\" } })\n        .Group(new BsonDocument { { \"_id\", \"$stars\" }, { \"count\", new BsonDocument(\"$sum\", 1) } });\n      var results = aggregate.ToList();\n    }\n  }\n}"
        },
        {
          "language": "Node.JS",
          "stages": [
            "\n// 1. Connect to MongoDB instance running on localhost\n// Connection URL\nvar url = 'mongodb://localhost:27017/test';\n\nco(function*() {\n  const db = yield MongoClient.connect(url);\n  console.log(\"Connected successfully to server\");\n  \n  yield insertDocuments(db, null);\n  yield findDocuments(db, null);\n  yield indexCollection(db, null);\n  yield aggregateDocuments(db, null);\n\n  db.close();\n}).catch(err => console.log(err));\n",
            "\n// 2. Insert\nvar insertDocuments = function(db, callback) {\n  return co(function*() {\n    const results = yield db.collection('restaurants').insertMany([ \n      {\n        \"name\": \"Sun Bakery Trattoria\",\n        \"stars\": 4,\n        \"categories\": [\n          \"Pizza\", \"Pasta\", \"Italian\", \"Coffee\", \"Sandwiches\"\n        ]\n      }, {\n        \"name\": \"Blue Bagels Grill\",\n        \"stars\": 3,\n        \"categories\":[\n          \"Bagels\", \"Cookies\", \"Sandwiches\"\n        ]\n      }, {\n        \"name\": \"Hot Bakery Cafe\",\n        \"stars\": 4,\n        \"categories\": [\n          \"Bakery\", \"Cafe\", \"Coffee\", \"Dessert\"\n        ]\n      }, {\n        \"name\": \"XYZ Coffee Bar\",\n        \"stars\": 5,\n        \"categories\": [\n          \"Coffee\", \"Cafe\", \"Bakery\", \"Chocolates\"\n        ]\n      }, {\n        \"name\": \"456 Cookies Shop\",\n        \"stars\": 4,\n        \"categories\": [\n          \"Bakery\", \"Cookies\", \"Cake\", \"Coffee\"\n        ]\n      }\n    ]);\n    \n    console.log(results)\n    return results;\n  });\n};\n",
            "\n// 3. Query Collection\nvar findDocuments = function(db) {\n  return co(function*() {\n    // Get the documents collection\n    const collection = db.collection('restaurants');\n    const docs = yield collection.find({}).toArray();\n    console.log(\"Found the following records\");\n    console.log(docs)\n    return docs;\n  });\n};\n",
            "\n// 4. Create Index\nvar indexCollection = function(db) {\n  return co(function*() {\n    const results = yield db.collection('restaurants').createIndex(\n      { \"name\": 1 },\n      null\n    );\n\n    console.log(results);\n    return results;\n  });\n};\n",
            "\n// 5. Perform Aggregation\nvar aggregateDocuments = function(db, callback) {\n  return co(function*() {\n    const results = yield db.collection('restaurants')\n      .aggregate([\n        { '$match': { \"categories\": \"Bakery\" } },\n        { '$group': { '_id': \"$stars\", 'count': { '$sum': 1 } } }\n      ])\n      .toArray();\n\n    console.log(results)\n    return results;\n  });\n};\n"
          ],
          "documentation": [
            "https://mongodb.github.io/node-mongodb-native/",
            "https://mongodb.github.io/node-mongodb-native/",
            "https://mongodb.github.io/node-mongodb-native/",
            "https://mongodb.github.io/node-mongodb-native/",
            "https://mongodb.github.io/node-mongodb-native/"
          ],
          "sourceCode": "var MongoClient = require('mongodb').MongoClient\n  , co = require('co')\n  , assert = require('assert');\n\n// 1. Connect to MongoDB instance running on localhost\n\n// Connection URL\nvar url = 'mongodb://localhost:27017/test';\n\nco(function*() {\n  const db = yield MongoClient.connect(url);\n  console.log(\"Connected successfully to server\");\n  \n  yield insertDocuments(db, null);\n  yield findDocuments(db, null);\n  yield indexCollection(db, null);\n  yield aggregateDocuments(db, null);\n\n  db.close();\n}).catch(err => console.log(err));\n\n// 2. Insert\nvar insertDocuments = function(db, callback) {\n  return co(function*() {\n    const results = yield db.collection('restaurants')\n      .insertMany([ \n        {\"name\":\"Sun Bakery Trattoria\", \"stars\":4, \"categories\":[\"Pizza\",\"Pasta\",\"Italian\",\"Coffee\",\"Sandwiches\"]},\n        {\"name\":\"Blue Bagels Grill\", \"stars\":3, \"categories\":[\"Bagels\",\"Cookies\",\"Sandwiches\"]},\n        {\"name\":\"Hot Bakery Cafe\",\"stars\":4,\"categories\":[\"Bakery\",\"Cafe\",\"Coffee\",\"Dessert\"]},\n        {\"name\":\"XYZ Coffee Bar\",\"stars\":5,\"categories\":[\"Coffee\",\"Cafe\",\"Bakery\",\"Chocolates\"]},\n        {\"name\":\"456 Cookies Shop\",\"stars\":4,\"categories\":[\"Bakery\",\"Cookies\",\"Cake\",\"Coffee\"]}\n    ]);\n    console.log(results)\n    return results;\n  });\n}\n\n// 3. Query Collection\nvar findDocuments = function(db) {\n  return co(function*() {\n    // Get the documents collection\n    const collection = db.collection('restaurants');\n    const docs = yield collection.find({}).toArray();\n    console.log(\"Found the following records\");\n    console.log(docs)\n    return docs;\n  });\n}\n\n// 4. Create Index\nvar indexCollection = function(db) {\n  return co(function*() {\n    const results = yield db.collection('restaurants').createIndex(\n      { \"name\": 1 },\n      null\n    );\n\n    console.log(results);\n    return results;\n  });\n};\n\n// 5. Perform Aggregation\n\nvar aggregateDocuments = function(db, callback) {\n  return co(function*() {\n    const results = yield db.collection('restaurants')\n      .aggregate( \n        [ { '$match': { \"categories\": \"Bakery\" } },\n          { '$group': { '_id': \"$stars\", 'count': { '$sum': 1 } } } ])\n      .toArray();\n\n    console.log(results)\n    return results;\n  });\n}"
        }
      ]
    }

    ReactDOM.render(
      <CodeWidget
        descriptions={widgetData.descriptions}
        snippets={widgetData.snippets}
      />, document.getElementById('code-widget')
    )
  }
}

export default utils
