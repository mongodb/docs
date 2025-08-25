struct DogsView_Previews: PreviewProvider {
    static var previews: some View {
        let realm = Person.previewRealm
        DogsView()
            .environment(\.realm, realm)
    }
}
