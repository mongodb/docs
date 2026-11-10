.. code-block:: java

   public static void insertPatient(
       MongoCollection collection,
       String name,
       int ssn,
       String bloodType,
       ArrayList<Document> medicalRecords,
       int policyNumber,
       String provider
   ) {

       Document insurance = new Document()
           .append("policyNumber", policyNumber)
           .append("provider", provider);

       Document patient = new Document()
           .append("name", name)
           .append("ssn", ssn)
           .append("bloodType", bloodType)
           .append("medicalRecords", medicalRecords)
           .append("insurance", insurance);

       collection.insertOne(patient);
   }