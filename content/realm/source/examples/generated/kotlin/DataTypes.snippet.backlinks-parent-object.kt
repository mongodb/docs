var children: RealmSet<ChildObjectType> = realmSetOf()
var embeddedChildren: RealmList<EmbeddedChildType> = realmListOf() // RealmSets cannot contain embedded objects
var embeddedChildrenDictionary: RealmDictionary<EmbeddedChildType?> = realmDictionaryOf()
