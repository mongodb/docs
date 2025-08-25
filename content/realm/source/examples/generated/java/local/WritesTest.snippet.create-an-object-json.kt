// Insert from a string
realm.executeTransaction { realm ->
    realm.createObjectFromJson(
        Frog::class.java,
        "{ name: \"Doctor Cucumber\", age: 1, species: \"bullfrog\", owner: \"Wirt\" }"
    )
}

// Insert multiple items using an InputStream
realm.executeTransaction { realm ->
    try {
        val inputStream: InputStream =
            FileInputStream(File("path_to_file"))
        realm.createAllFromJson(Frog::class.java, inputStream)
    } catch (e: IOException) {
        throw RuntimeException(e)
    }
}
