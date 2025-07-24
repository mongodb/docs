using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using WriteData.Models;

namespace CSharpExamples.WriteData;

public class UpdateManyArrays
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private static string _mongoConnectionString = "<Your MongoDB URI>";

    public static void Setup()
    {
        // This allows automapping of the camelCase database fields to our models. 
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

        // Establish the connection to MongoDB and get the restaurants database
        var mongoClient = new MongoClient(_mongoConnectionString);
        var restaurantsDatabase = mongoClient.GetDatabase("sample_restaurants");
        _restaurantsCollection = restaurantsDatabase.GetCollection<Restaurant>("restaurants");
    }

    public static UpdateResult UpdateManyPush()
    {
        // start-update-many-push
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var update = Builders<Restaurant>.Update
            .Push(restaurant => restaurant.Grades, new GradeEntry()
            {
                Date = DateTime.Now,
                Grade = "A",
                Score = 96
            });

        var result = _restaurantsCollection.UpdateMany(filter, update);

        return result;
        // end-update-many-push
    }

    public static async Task<UpdateResult> UpdateManyPushAsync()
    {
        // start-update-many-push-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var update = Builders<Restaurant>.Update
            .Push(restaurant => restaurant.Grades, new GradeEntry()
            {
                Date = DateTime.Now,
                Grade = "A",
                Score = 96
            });

        var result = await _restaurantsCollection.UpdateManyAsync(filter, update);

        return result;
        // end-update-many-push-async
    }

    public static UpdateResult UpdateManyAddToSet()
    {
        // start-update-many-addtoset
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var firstGradeEntry = _restaurantsCollection.Find(filter).FirstOrDefault().Grades[0];

        var update = Builders<Restaurant>.Update
            .AddToSet(restaurant => restaurant.Grades, firstGradeEntry);

        var result = _restaurantsCollection.UpdateMany(filter, update);

        return result;
        // end-update-many-addtoset
    }

    public static async Task<UpdateResult> UpdateManyAddToSetAsync()
    {
        // start-update-many-addtoset-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var firstGradeEntry = _restaurantsCollection.Find(filter).FirstOrDefault().Grades[0];

        var update = Builders<Restaurant>.Update
            .AddToSet(restaurant => restaurant.Grades, firstGradeEntry);

        var result = await _restaurantsCollection.UpdateManyAsync(filter, update);

        return result;
        // end-update-many-addtoset-async
    }

    public static UpdateResult UpdateManyPushEach()
    {
        // start-update-many-pusheach
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var newGrades = new List<GradeEntry>
        {
            new GradeEntry { Date = DateTime.Now, Grade = "A", Score = 95 },
            new GradeEntry { Date = DateTime.Now, Grade = "B+", Score = 89,}
        };

        var scoreSort = Builders<GradeEntry>.Sort.Descending(g => g.Score);

        var update = Builders<Restaurant>.Update.PushEach(
            "Grades",
            newGrades,
            position: 0,
            sort: scoreSort);

        var result = _restaurantsCollection.UpdateMany(filter, update);

        return result;
        // end-update-many-pusheach
    }

    public static async Task<UpdateResult> UpdateManyPushEachAsync()
    {
        // start-update-many-pusheach-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var newGrades = new List<GradeEntry>
        {
            new GradeEntry { Date = DateTime.Now, Grade = "A", Score = 95 },
            new GradeEntry { Date = DateTime.Now, Grade = "B+", Score = 89,}
        };

        var scoreSort = Builders<GradeEntry>.Sort.Descending(g => g.Score);

        var update = Builders<Restaurant>.Update.PushEach(
            "Grades",
            newGrades,
            position: 0,
            sort: scoreSort);

        var result = await _restaurantsCollection.UpdateManyAsync(filter, update);

        return result;
        // end-update-many-pusheach-async
    }

    public static UpdateResult UpdateManyAddToSetEach()
    {
        // start-update-many-addtoseteach
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var doc = _restaurantsCollection.Find(filter).FirstOrDefault();
        var firstGradeEntries = new List<GradeEntry> { doc.Grades[0], doc.Grades[1] };

        var update = Builders<Restaurant>.Update
            .AddToSetEach(restaurant => restaurant.Grades, firstGradeEntries);

        var result = _restaurantsCollection.UpdateMany(filter, update);

        return result;
        // end-update-many-addtoseteach
    }

    public static async Task<UpdateResult> UpdateManyAddToSetEachAsync()
    {
        // start-update-many-addtoseteach-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var doc = _restaurantsCollection.Find(filter).FirstOrDefault();
        var firstGradeEntries = new List<GradeEntry> { doc.Grades[0], doc.Grades[1] };

        var update = Builders<Restaurant>.Update
            .AddToSetEach(restaurant => restaurant.Grades, firstGradeEntries);

        var result = await _restaurantsCollection.UpdateManyAsync(filter, update);

        return result;
        // end-update-many-addtoseteach-async
    }

    public static UpdateResult UpdateManyPopFirst()
    {
        // start-update-many-popfirst
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var update = Builders<Restaurant>.Update
            .PopFirst(restaurant => restaurant.Grades);

        var result = _restaurantsCollection.UpdateMany(filter, update);

        return result;
        // end-update-many-popfirst
    }

    public static async Task<UpdateResult> UpdateManyPopFirstAsync()
    {
        // start-update-many-popfirst-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var update = Builders<Restaurant>.Update
            .PopFirst(restaurant => restaurant.Grades);

        var result = await _restaurantsCollection.UpdateManyAsync(filter, update);

        return result;
        // end-update-many-popfirst-async
    }

    public static UpdateResult UpdateManyPopLast()
    {
        // start-update-many-poplast
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var update = Builders<Restaurant>.Update
            .PopLast(restaurant => restaurant.Grades);

        var result = _restaurantsCollection.UpdateMany(filter, update);

        return result;
        // end-update-many-poplast
    }

    public static async Task<UpdateResult> UpdateManyPopLastAsync()
    {
        // start-update-many-poplast-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var update = Builders<Restaurant>.Update
            .PopLast(restaurant => restaurant.Grades);

        var result = await _restaurantsCollection.UpdateManyAsync(filter, update);

        return result;
        // end-update-many-poplast-async
    }

    public static UpdateResult UpdateManyPull()
    {
        // start-update-many-pull
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        // Add duplicate values to Grades array
        var newGrades = new List<GradeEntry>
        {
            new GradeEntry { Date = DateTime.MinValue, Grade = "A", Score = 95 },
            new GradeEntry { Date = DateTime.MinValue, Grade = "A", Score = 95,}
        };
        var addUpdate = Builders<Restaurant>.Update
            .PushEach("Grades", newGrades);
        _restaurantsCollection.UpdateMany(filter, addUpdate);

        // Remove duplicates from Grades array
        var pullUpdate = Builders<Restaurant>.Update
            .Pull(restaurant => restaurant.Grades, newGrades[0]);

        var result = _restaurantsCollection.UpdateMany(filter, pullUpdate);

        return result;
        // end-update-many-pull
    }

    public static async Task<UpdateResult> UpdateManyPullAsync()
    {
        // start-update-many-pull-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        // Add duplicate values to Grades array
        var newGrades = new List<GradeEntry>
        {
            new GradeEntry { Date = DateTime.MinValue, Grade = "A", Score = 95 },
            new GradeEntry { Date = DateTime.MinValue, Grade = "A", Score = 95,}
        };
        var addUpdate = Builders<Restaurant>.Update
            .PushEach("Grades", newGrades);
        await _restaurantsCollection.UpdateManyAsync(filter, addUpdate);

        // Remove duplicates from Grades array
        var pullUpdate = Builders<Restaurant>.Update
            .Pull(restaurant => restaurant.Grades, newGrades[0]);

        var result = await _restaurantsCollection.UpdateManyAsync(filter, pullUpdate);

        return result;
        // end-update-many-pull-async
    }

    public static UpdateResult UpdateManyPullAll()
    {
        // start-update-many-pullall
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        // Add duplicate values to Grades array
        var newGrades = new List<GradeEntry>
        {
            new GradeEntry { Date = DateTime.MinValue, Grade = "A", Score = 95 },
            new GradeEntry { Date = DateTime.MinValue, Grade = "A", Score = 95,},
            new GradeEntry { Date = DateTime.MinValue, Grade = "B", Score = 85 },
            new GradeEntry { Date = DateTime.MinValue, Grade = "B", Score = 85,}
        };
        var addUpdate = Builders<Restaurant>.Update
            .PushEach("Grades", newGrades);
        _restaurantsCollection.UpdateMany(filter, addUpdate);

        // Remove duplicates from Grades array
        var gradesToRemove = new List<GradeEntry> { newGrades[0], newGrades[2] };
        var pullUpdate = Builders<Restaurant>.Update
            .PullAll(restaurant => restaurant.Grades, gradesToRemove);

        var result = _restaurantsCollection.UpdateMany(filter, pullUpdate);

        return result;
        // end-update-many-pullall
    }

    public static async Task<UpdateResult> UpdateManyPullAllAsync()
    {
        // start-update-many-pullall-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        // Add duplicate values to Grades array
        var newGrades = new List<GradeEntry>
        {
            new GradeEntry { Date = DateTime.MinValue, Grade = "A", Score = 95 },
            new GradeEntry { Date = DateTime.MinValue, Grade = "A", Score = 95,},
            new GradeEntry { Date = DateTime.MinValue, Grade = "B", Score = 85 },
            new GradeEntry { Date = DateTime.MinValue, Grade = "B", Score = 85,}
        };
        var addUpdate = Builders<Restaurant>.Update
            .PushEach("Grades", newGrades);
        await _restaurantsCollection.UpdateManyAsync(filter, addUpdate);

        // Remove duplicates from Grades array
        var gradesToRemove = new List<GradeEntry> { newGrades[0], newGrades[2] };
        var pullUpdate = Builders<Restaurant>.Update
            .PullAll(restaurant => restaurant.Grades, gradesToRemove);

        var result = await _restaurantsCollection.UpdateManyAsync(filter, pullUpdate);

        return result;
        // end-update-many-pullall-async
    }

    public static UpdateResult UpdateManyPullFilter()
    {
        // start-update-many-pullfilter
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        // Add GradeEntry values with "Grade = F" to Grades array
        var newGrades = new List<GradeEntry>
        {
            new GradeEntry { Date = DateTime.Now, Grade = "F", Score = 10 },
            new GradeEntry { Date = DateTime.Now, Grade = "F", Score = 21,},
            new GradeEntry { Date = DateTime.Now, Grade = "F", Score = 47 },
            new GradeEntry { Date = DateTime.Now, Grade = "F", Score = 6,}
        };
        var addUpdate = Builders<Restaurant>.Update
            .PushEach("Grades", newGrades);
        _restaurantsCollection.UpdateMany(filter, addUpdate);

        // Remove all "Grade = F" values from Grades array
        var pullUpdate = Builders<Restaurant>.Update
            .PullFilter(restaurant => restaurant.Grades, gradeEntry => gradeEntry.Grade == "F");

        var result = _restaurantsCollection.UpdateMany(filter, pullUpdate);

        return result;
        // end-update-many-pullfilter
    }

    public static async Task<UpdateResult> UpdateManyPullFilterAsync()
    {
        // start-update-many-pullfilter-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        // Add GradeEntry values with "Grade = F" to Grades array
        var newGrades = new List<GradeEntry>
        {
            new GradeEntry { Date = DateTime.Now, Grade = "F", Score = 10 },
            new GradeEntry { Date = DateTime.Now, Grade = "F", Score = 21,},
            new GradeEntry { Date = DateTime.Now, Grade = "F", Score = 47 },
            new GradeEntry { Date = DateTime.Now, Grade = "F", Score = 6,}
        };
        var addUpdate = Builders<Restaurant>.Update
            .PushEach("Grades", newGrades);
        await _restaurantsCollection.UpdateManyAsync(filter, addUpdate);

        // Remove all "Grade = F" values from Grades array
        var pullUpdate = Builders<Restaurant>.Update
            .PullFilter(restaurant => restaurant.Grades, gradeEntry => gradeEntry.Grade == "F");

        var result = await _restaurantsCollection.UpdateManyAsync(filter, pullUpdate);

        return result;
        // end-update-many-pullfilter-async
    }

    public static UpdateResult UpdateManyPositional()
    {
        // start-update-many-positional
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli") &
                    Builders<Restaurant>.Filter.Eq("grades.grade", "A");

        // Set Score = 100 in first GradeEntry where Grade = "A"
        var update = Builders<Restaurant>.Update
            .Set("grades.$.score", 100);

        var result = _restaurantsCollection.UpdateMany(filter, update);

        return result;
        // end-update-many-positional
    }

    public static UpdateResult UpdateManyPositionalLinq()
    {
        // start-update-many-positional-linq
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli") &
                    Builders<Restaurant>.Filter.Eq("grades.grade", "A");

        // Set Score = 100 in first GradeEntry where Grade = "A"
        var update = Builders<Restaurant>.Update
            .Set(restaurant => restaurant.Grades.FirstMatchingElement().Score, 100);

        var result = _restaurantsCollection.UpdateMany(filter, update);
        return result;
        // end-update-many-positional-linq
    }

    public static async Task<UpdateResult> UpdateManyPositionalAsync()
    {
        // start-update-many-positional-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli") &
                    Builders<Restaurant>.Filter.Eq("grades.grade", "A");

        // Set Score = 100 in first GradeEntry where Grade = "A"
        var update = Builders<Restaurant>.Update
            .Set("grades.$.score", 100);

        var result = await _restaurantsCollection.UpdateManyAsync(filter, update);

        return result;
        // end-update-many-positional-async
    }

    public static async Task<UpdateResult> UpdateManyPositionalLinqAsync()
    {
        // start-update-many-positional-linq-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli") &
                    Builders<Restaurant>.Filter.Eq("grades.grade", "A");

        // Set Score = 100 in first GradeEntry where Grade = "A"
        var update = Builders<Restaurant>.Update
            .Set(restaurant => restaurant.Grades.FirstMatchingElement().Score, 100);

        var result = await _restaurantsCollection.UpdateManyAsync(filter, update);

        return result;
        // end-update-many-positional-linq-async
    }

    public static UpdateResult UpdateManyAllPositional()
    {
        // start-update-many-allpositional
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        // Set Score = 100 in all GradeEntry objects
        var update = Builders<Restaurant>.Update
            .Set("grades.$[].score", 100);

        var result = _restaurantsCollection.UpdateMany(filter, update);

        return result;
        // end-update-many-allpositional
    }

    public static UpdateResult UpdateManyAllPositionalLinq()
    {
        // start-update-many-allpositional-linq
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        // Set Score = 100 in all GradeEntry objects
        var update = Builders<Restaurant>.Update
            .Set(restaurant => restaurant.Grades.AllElements().Score, 100);

        var result = _restaurantsCollection.UpdateMany(filter, update);

        return result;
        // end-update-many-allpositional-linq
    }

    public static async Task<UpdateResult> UpdateManyAllPositionalAsync()
    {
        // start-update-many-allpositional-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        // Set Score = 100 in all GradeEntry objects
        var update = Builders<Restaurant>.Update
            .Set("grades.$[].score", 100);

        var result = await _restaurantsCollection.UpdateManyAsync(filter, update);

        return result;
        // end-update-many-allpositional-async
    }

    public static async Task<UpdateResult> UpdateManyAllPositionalLinqAsync()
    {
        // start-update-many-allpositional-linq-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        // Set Score = 100 in all GradeEntry objects
        var update = Builders<Restaurant>.Update
            .Set(restaurant => restaurant.Grades.AllElements().Score, 100);

        var result = await _restaurantsCollection.UpdateManyAsync(filter, update);

        return result;
        // end-update-many-allpositional-linq-async
    }

    public static UpdateResult UpdateManyFilteredPositional()
    {
        // start-update-many-filteredpositional
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var arrayFilters = new List<ArrayFilterDefinition>
        {
            new BsonDocumentArrayFilterDefinition<Restaurant>(
                new BsonDocument
                {
                    { "gradeEntry.score", new BsonDocument { { "$gte", 94} } }
                })
        };

        // Set Grade = "A" in all GradeEntry objects where Score >= 94
        var update = Builders<Restaurant>.Update
            .Set("grades.$[gradeEntry].grade", "A");

        var updateOptions = new UpdateOptions { ArrayFilters = arrayFilters };
        var result = _restaurantsCollection.UpdateMany(filter, update, updateOptions);

        return result;
        // end-update-many-filteredpositional
    }

    public static UpdateResult UpdateManyFilteredPositionalLinq()
    {
        // start-update-many-filteredpositional-linq
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var arrayFilters = new List<ArrayFilterDefinition>
        {
            new BsonDocumentArrayFilterDefinition<Restaurant>(
                new BsonDocument
                {
                    { "gradeEntry.score", new BsonDocument { { "$gte", 94} } }
                })
        };

        // Set Grade = "A" in all GradeEntry objects where Score >= 94
        var update = Builders<Restaurant>.Update
            .Set(restaurant => restaurant.Grades.AllMatchingElements("gradeEntry").Grade, "A");

        var updateOptions = new UpdateOptions { ArrayFilters = arrayFilters };
        var result = _restaurantsCollection.UpdateMany(filter, update, updateOptions);

        return result;
        // end-update-many-filteredpositional-linq
    }

    public static async Task<UpdateResult> UpdateManyFilteredPositionalAsync()
    {
        // start-update-many-filteredpositional-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var arrayFilters = new List<ArrayFilterDefinition>
        {
            new BsonDocumentArrayFilterDefinition<Restaurant>(
                new BsonDocument
                {
                    { "gradeEntry.score", new BsonDocument { { "$gte", 94} } }
                })
        };

        // Set Grade = "A" in all GradeEntry objects where Score >= 94
        var update = Builders<Restaurant>.Update
            .Set("grades.$[gradeEntry].grade", "A");

        var updateOptions = new UpdateOptions { ArrayFilters = arrayFilters };
        var result = await _restaurantsCollection.UpdateManyAsync(filter, update, updateOptions);

        return result;
        // end-update-many-filteredpositional-async
    }

    public static async Task<UpdateResult> UpdateManyFilteredPositionalLinqAsync()
    {
        // start-update-many-filteredpositional-linq-async
        var filter = Builders<Restaurant>.Filter.Eq("name", "Downtown Deli");

        var arrayFilters = new List<ArrayFilterDefinition>
        {
            new BsonDocumentArrayFilterDefinition<Restaurant>(
                new BsonDocument
                {
                    { "gradeEntry.score", new BsonDocument { { "$gte", 94} } }
                })
        };

        // Set Grade = "A" in all GradeEntry objects where Score >= 94
        var update = Builders<Restaurant>.Update
            .Set(restaurant => restaurant.Grades.AllMatchingElements("gradeEntry").Grade, "A");

        var updateOptions = new UpdateOptions { ArrayFilters = arrayFilters };
        var result = await _restaurantsCollection.UpdateManyAsync(filter, update, updateOptions);

        return result;
        // end-update-many-filteredpositional-linq-async
    }
}