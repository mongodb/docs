// :replace-start: {
//   "terms": {
//     "QueryEngineExamples_": ""
//   }
// }
import XCTest
import RealmSwift

// :snippet-start: models
class QueryEngineExamples_Task: Object {
    @Persisted var name = ""
    @Persisted var isComplete = false
    @Persisted var assignee: String?
    @Persisted var priority = 0
    @Persisted var progressMinutes = 0
    @Persisted var labels: MutableSet<String>
    @Persisted var ratings: MutableSet<Int>
}

class QueryEngineExamples_Project: Object {
    @Persisted var name = ""
    @Persisted var tasks: List<QueryEngineExamples_Task>
}
// :snippet-end:

// This is the NSPredicate version of the QueryEngine tests
class QueryEngineForNSPredicate: XCTestCase {
    override func tearDown() {
        let realm = try! Realm()
        try! realm.write {
            realm.deleteAll()
        }
    }

    func testPredicates() {
        // :snippet-start: predicates
        let predicate = NSPredicate(format: "progressMinutes > 1 AND name == %@", "Ali")
        // :snippet-end:

        // :snippet-start: substitutions
        NSPredicate(format: "%K > %@ AND %K == %@", "progressMinutes", NSNumber(1), "name", "Ali")
        // :snippet-end:
    }

    func testFilters() {
        // :snippet-start: setup
        let realm = try! Realm()
        try! realm.write {
            // Add tasks and projects here.
            let project = QueryEngineExamples_Project()
            project.name = "New Project"
            let task = QueryEngineExamples_Task()
            task.assignee = "Alex"
            task.priority = 5
            project.tasks.append(task)
            realm.add(project)
            // ...
        }
        let tasks = realm.objects(QueryEngineExamples_Task.self)
        let projects = realm.objects(QueryEngineExamples_Project.self)
        // :snippet-end:

        // :snippet-start: comparison-operators
        let highPriorityTasks = tasks.filter("priority > 5")
        print("High priority tasks: \(highPriorityTasks.count)")

        let longRunningTasks = tasks.filter("progressMinutes > 120")
        print("Long running tasks: \(longRunningTasks.count)")

        let unassignedTasks = tasks.filter("assignee == nil")
        print("Unassigned tasks: \(unassignedTasks.count)")

        let aliOrJamiesTasks = tasks.filter("assignee IN {'Ali', 'Jamie'}")
        print("Ali or Jamie's tasks: \(aliOrJamiesTasks.count)")

        let progressBetween30and60 = tasks.filter("progressMinutes BETWEEN {30, 60}")
        print("Tasks with progress between 30 and 60 minutes: \(progressBetween30and60.count)")
        // :snippet-end:

        // :snippet-start: logical-operators
        let aliComplete = tasks.filter("assignee == 'Ali' AND isComplete == true")
        print("Ali's complete tasks: \(aliComplete.count)")
        // :snippet-end:

        // :snippet-start: string-operators
        // Use [c] for case-insensitivity.
        let startWithE = projects.filter("name BEGINSWITH[c] 'e'")
        print("Projects that start with 'e': \(startWithE.count)")

        let containIe = projects.filter("name CONTAINS 'ie'")
        print("Projects that contain 'ie': \(containIe.count)")

        // [d] for diacritic insensitivty: contains 'e', 'E', 'é', etc.
        let containElike = projects.filter("name CONTAINS[cd] 'e'")
        print("Projects that contain 'e', 'E', 'é', etc.: \(containElike.count)")
        // :snippet-end:

        // :snippet-start: aggregate-operators
        let averageTaskPriorityAbove5 = projects.filter("tasks.@avg.priority > 5")
        print("Projects with average task priority above 5: \(averageTaskPriorityAbove5.count)")

        let allTasksLowerPriority = projects.filter("tasks.@max.priority < 5")
        print("Projects where all tasks are lower priority: \(allTasksLowerPriority.count)")

        let allTasksHighPriority = projects.filter("tasks.@min.priority > 5")
        print("Projects where all tasks are high priority: \(allTasksHighPriority.count)")

        let moreThan5Tasks = projects.filter("tasks.@count > 5")
        print("Projects with more than 5 tasks: \(moreThan5Tasks.count)")

        let longRunningProjects = projects.filter("tasks.@sum.progressMinutes > 100")
        print("Long running projects: \(longRunningProjects.count)")
        // :snippet-end:

        // :snippet-start: set-operators
        let noCompleteTasks = projects.filter("NONE tasks.isComplete == true")
        print("Projects with no complete tasks: \(noCompleteTasks.count)")

        let anyTopPriorityTasks = projects.filter("ANY tasks.priority == 10")
        print("Projects with any top priority tasks: \(anyTopPriorityTasks.count)")
        // :snippet-end:

        // :snippet-start: subquery
        let predicate = NSPredicate(
            format: "SUBQUERY(tasks, $task, $task.isComplete == false AND $task.assignee == %@).@count > 0", "Alex")
        print("Projects with incomplete tasks assigned to Alex: \(projects.filter(predicate).count)")
        // :snippet-end:
    }
}

// This is the type-safe query version of the QueryEngine tests
class QueryEngineForTypeSafeQuery: XCTestCase {
    override func tearDown() {
        let realm = try! Realm()
        try! realm.write {
            realm.deleteAll()
        }
    }

    func testTypeSafeQuery() {
        let realm = try! Realm()
        try! realm.write {
            // Add tasks and projects here.
            let project = QueryEngineExamples_Project()
            project.name = "New Project"
            let task = QueryEngineExamples_Task()
            let task2 = QueryEngineExamples_Task()
            task.assignee = "Alex"
            task.priority = 10
            task.labels.insert("quick win")
            task.ratings.insert(1)
            task.ratings.insert(5)
            task2.assignee = "Ali"
            task2.priority = 9
            task2.labels.insert("quick win")
            task2.ratings.insert(1)
            project.tasks.append(task)
            project.tasks.append(task2)
            realm.add(project)
            // ...
        }
        let tasks = realm.objects(QueryEngineExamples_Task.self)
        let projects = realm.objects(QueryEngineExamples_Project.self)
        // :snippet-start: realm-swift-query
        let realmSwiftQuery = projects.where {
            ($0.tasks.progressMinutes > 1) && ($0.tasks.assignee == "Ali")
        }
        // :snippet-end:

        // :snippet-start: tsq-comparison-operators
        let highPriorityTasks = tasks.where {
            $0.priority > 5
        }
        print("High-priority tasks: \(highPriorityTasks.count)")

        let longRunningTasks = tasks.where {
            $0.progressMinutes >= 120
        }
        print("Long running tasks: \(longRunningTasks.count)")

        let unassignedTasks = tasks.where {
            $0.assignee == nil
        }
        print("Unassigned tasks: \(unassignedTasks.count)")
        // :snippet-end:

        // :snippet-start: tsq-collections-in
        let taskAssigneeInAliOrJamie = tasks.where {
            let assigneeNames = ["Ali", "Jamie"]
            return $0.assignee.in(assigneeNames)
        }
        print("Tasks IN Ali or Jamie: \(taskAssigneeInAliOrJamie.count)")
        // :snippet-end:

        // :snippet-start: tsq-collections-contains
        let quickWinTasks = tasks.where {
            $0.labels.contains("quick win")
        }
        print("Tasks labeled 'quick win': \(quickWinTasks.count)")

        let progressBetween30and60 = tasks.where {
            $0.progressMinutes.contains(30...60)
        }
        print("Tasks with progress between 30 and 60 minutes: \(progressBetween30and60.count)")
        // :snippet-end:

        // :snippet-start: tsq-collections-contains-any
        let quickWinOrBugTasks = tasks.where {
            $0.labels.containsAny(in: ["quick win", "bug"])
        }
        print("Tasks labeled 'quick win' or 'bug': \(quickWinOrBugTasks.count)")
        // :snippet-end:

        // :snippet-start: tsq-logical-operators
        let aliComplete = tasks.where {
            ($0.assignee == "Ali") && ($0.isComplete == true)
        }
        print("Ali's complete tasks: \(aliComplete.count)")
        // :snippet-end:

        // :snippet-start: tsq-string-operators
        // Use the .caseInsensitive option for case-insensitivity.
        let startWithE = projects.where {
            $0.name.starts(with: "e", options: .caseInsensitive)
        }
        print("Projects that start with 'e': \(startWithE.count)")

        let containIe = projects.where {
            $0.name.contains("ie")
        }
        print("Projects that contain 'ie': \(containIe.count)")

        let likeWildcard = tasks.where {
            $0.assignee.like("Al?x")
        }
        print("Tasks with assignees like Al?x: \(likeWildcard.count)")

        // Use the .diacreticInsensitive option for diacritic insensitivty: contains 'e', 'E', 'é', etc.
        let containElike = projects.where {
            $0.name.contains("e", options: .diacriticInsensitive)
        }
        print("Projects that contain 'e', 'E', 'é', etc.: \(containElike.count)")
        // :snippet-end:

        // :snippet-start: tsq-aggregate-operators
        let averageTaskPriorityAbove5 = projects.where {
            $0.tasks.priority.avg > 5
        }
        print("Projects with average task priority above 5: \(averageTaskPriorityAbove5.count)")

        let allTasksLowerPriority = projects.where {
            $0.tasks.priority.max < 5
        }
        print("Projects where all tasks are lower priority: \(allTasksLowerPriority.count)")

        let allTasksHighPriority = projects.where {
            $0.tasks.priority.min > 5
        }
        print("Projects where all tasks are high priority: \(allTasksHighPriority.count)")

        let moreThan5Tasks = projects.where {
            $0.tasks.count > 5
        }
        print("Projects with more than 5 tasks: \(moreThan5Tasks.count)")

        let longRunningProjects = projects.where {
            $0.tasks.progressMinutes.sum > 100
        }
        print("Long running projects: \(longRunningProjects.count)")
        // :snippet-end:
        
        // :snippet-start: tsq-set-operators
        let projectsWithGivenLabels = projects.where {
            $0.tasks.labels.containsAny(in: ["quick win", "bug"])
        }
        print("Projects with quick wins: \(projectsWithGivenLabels.count)")
        
        let projectsWithRatingsOver3 = projects.where {
            $0.tasks.ratings > 3
        }
        print("Projects with any ratings over 3: \(projectsWithRatingsOver3.count)")
        // :snippet-end:

        // :snippet-start: tsq-subquery
        let subquery = projects.where {
                    ($0.tasks.isComplete == false && $0.tasks.assignee == "Alex").count > 0
        }
        print("Projects with incomplete tasks assigned to Alex: \(subquery.count)")
        // :snippet-end:
    }
}

// :replace-end:
