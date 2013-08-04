:term:`Write concern` is a quality of every write operation issued to
a MongoDB deployment, and describes the amount of *concern* the
application has for the outcome of the write operation. With weak or
disabled write concern, the application can send a write operation to
MongoDB and then continue without waiting for a response from the
database. With stronger write concerns, write operations wait until
MongoDB acknowledges or confirms a successful write operation. MongoDB
provides different levels of write concern to better address the
specific needs of applications.
