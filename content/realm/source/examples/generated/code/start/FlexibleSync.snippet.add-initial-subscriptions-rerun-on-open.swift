// Set the date a week ago and the date a week from now, as those are the dates we'll use
// in the Flexible Sync query. `rerunOnOpen` lets the app recalculate this query every
// time the app opens.
let secondsInAWeek: TimeInterval = 604800
let dateLastWeek = (Date.now - secondsInAWeek)
let dateNextWeek = (Date.now + secondsInAWeek)
var flexSyncConfig = user.flexibleSyncConfiguration(initialSubscriptions: { subs in
    subs.append(
        QuerySubscription<Task> {
            $0.dueDate > dateLastWeek && $0.dueDate < dateNextWeek
        })
}, rerunOnOpen: true)
