@RealmModel()
class _Rug {
    @PrimaryKey()
    late ObjectId id;

    @Indexed(RealmIndexType.fullText)
    late String pattern;

    @Indexed(RealmIndexType.fullText)
    late String material;

    late int softness;
}
