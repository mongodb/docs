You can use :ref:`Data Ingest <optimize-data-ingest>` to stream 
data from the client application to a Flexible Sync-enabled Atlas App Services
App.

You might want to sync data unidirectionally in IoT applications, such as
a weather sensor sending data to the cloud. Data Ingest is also useful 
for writing other types of immutable data where you do not require conflict 
resolution, such as creating invoices from a retail app or logging application 
events.

Data Ingest is optimized to provide performance improvements for heavy
client-side *insert-only* workloads.