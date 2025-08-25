struct ProfileView_Previews: PreviewProvider {
    static var previews: some View {
        let realm = Person.previewRealm
        let profile = realm.objects(Profile.self)
        ProfileView(profile: profile.first!)
    }
}
