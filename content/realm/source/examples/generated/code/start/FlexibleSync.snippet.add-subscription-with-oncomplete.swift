let subscriptions = realm.subscriptions
subscriptions.update({
   subscriptions.append(
      QuerySubscription<Task> {
         $0.assignee == "John Doe"
      })
}, onComplete: { error in // error is optional
    if error == nil {
       // Flexible Sync has updated data to match the subscription
    } else {
       // Handle the error
    }
 })
