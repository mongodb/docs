func delete(at index: Int) throws {
    try realm.write(withoutNotifying: [notificationToken]) {
        realm.delete(results[index])
    }
    tableView.deleteRows(at: [IndexPath(row: index, section: 0)], with: .automatic)
}
