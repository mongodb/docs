ItemsView(itemGroup: {
    if realm.objects(ItemGroup.self).count == 0 {
        try! realm.write {
            // Because we're using `ownerId` as the queryable field, we must
            // set the `ownerId` to equal the `user.id` when creating the object
            realm.add(ItemGroup(value: ["ownerId":user!.id]))
        }
    }
    return realm.objects(ItemGroup.self).first!
}(), leadingBarButton: AnyView(LogoutButton())).environment(\.realm, realm)
