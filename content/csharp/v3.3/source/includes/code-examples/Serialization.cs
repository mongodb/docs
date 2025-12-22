// start-ibson-id-provider
class CustomPersonSerializer : IBsonSerializer, IBsonIdProvider
{
   public Type ValueType => typeof(Person);
   
   public bool GetDocumentId(object document, out object id, out Type idNominalType, out IIdGenerator idGenerator)
   {
      var person = (Person)document;
      id = person.Id;
      idNominalType = typeof(string);
      idGenerator = new StringObjectIdGenerator();
      return true;
   }
   
   public void SetDocumentId(object document, object id)
   {
      var person = (Person)document;
      person.Id = (string)id;
   }
   
   public object Deserialize(BsonDeserializationContext context, BsonDeserializationArgs args)
   {
      // Deserialization logic
   }
   
   public void Serialize(BsonSerializationContext context, BsonSerializationArgs args, object value)
   {
      // Serialization logic
   }
}
// end-ibson-id-provider

// start-ibson-document-serializer
class CustomPersonSerializer : IBsonSerializer, IBsonDocumentSerializer
{
   public Type ValueType => typeof(Person);
   
   public bool GetMemberSerializationInfo(string memberName, out BsonSerializationInfo serializationInfo)
   {
      switch (memberName)
      {
         case "Name":
            serializationInfo = new BsonSerializationInfo("name", new StringSerializer(), typeof(string));
            return true;
         case "Age":
            serializationInfo = new BsonSerializationInfo("age", new Int32Serializer(), typeof(int));
            return true;
         default:
            serializationInfo = null;
            return false;
      }
   }
   
   public object Deserialize(BsonDeserializationContext context, BsonDeserializationArgs args)
   {
      // Deserialization logic
   }
   
   public void Serialize(BsonSerializationContext context, BsonSerializationArgs args, object value)
   {
      // Serialization logic
   }
}
// end-ibson-document-serializer

// start-ibson-array-serializer
class CustomListSerializer : IBsonSerializer, IBsonArraySerializer
{
   public Type ValueType => typeof(List<string>);
   
   public bool TryGetItemSerializationInfo(out BsonSerializationInfo serializationInfo)
   {
      serializationInfo = new BsonSerializationInfo("item", new StringSerializer(), typeof(string));
      return true;
   }
   
   public object Deserialize(BsonDeserializationContext context, BsonDeserializationArgs args)
   {
      // Deserialization logic
   }
   
   public void Serialize(BsonSerializationContext context, BsonSerializationArgs args, object value)
   {
      // Serialization logic
   }
}
// end-ibson-array-serializer
