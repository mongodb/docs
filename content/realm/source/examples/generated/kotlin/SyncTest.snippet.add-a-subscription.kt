realm.subscriptions.update {
    add(
        realm.query<Task>("progressMinutes >= $0",60)
    )
}
