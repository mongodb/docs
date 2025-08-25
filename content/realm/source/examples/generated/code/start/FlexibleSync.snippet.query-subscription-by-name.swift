QuerySubscription<Task>(name: "long-running-completed") {
    $0.completed == true && $0.progressMinutes > 120
}
