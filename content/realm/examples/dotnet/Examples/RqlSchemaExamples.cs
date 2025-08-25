using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using Realms;

namespace Examples.RqlSchemaExamples
{
    // :snippet-start: rql-schema-examples
    // :replace-start: {
    //  "terms": {
    //   "RqlTask": "Item",
    //   "RqlProject": "Project",
    //   "RqlTasks": "Items",
    //   "RqlItems": "Items"}
    // }
    public class RqlTask : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

        [MapTo("name")]
        [Indexed(IndexType.FullText)]
        public string Name { get; set; }

        [MapTo("isComplete")]
        public bool IsComplete { get; set; } = false;

        [MapTo("assignee")]
        public string Assignee { get; set; }

        [MapTo("priority")]
        public int Priority { get; set; } = 0;

        [MapTo("progressMinutes")]
        public int ProgressMinutes { get; set; } = 0;

        [MapTo("projects")]
        [Backlink(nameof(RqlProject.RqlItems))]
        public IQueryable<RqlProject> Projects { get; }
    }

    public class RqlProject : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

        [MapTo("name")]
        public string Name { get; set; }

        [MapTo("items")]
        public IList<RqlTask> RqlItems { get; }

        [MapTo("quota")]
        public int Quota { get; set; }
    }
    // :replace-end:
    // :snippet-end:
}
