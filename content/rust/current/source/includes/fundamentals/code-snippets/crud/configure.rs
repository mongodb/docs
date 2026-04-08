use mongodb::{
    bson::doc,
    options::{
        ClientOptions, CollectionOptions, DatabaseOptions, ReadConcern, ReadPreference,
        SelectionCriteria, TagSet, WriteConcern, Acknowledgment,
    },
    Client, Collection,
};
use std::time::Duration;

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    // start-client-settings
    let read_preference = ReadPreference::Secondary {
        options: Default::default(),
    };
    let selection_criteria = SelectionCriteria::ReadPreference(read_preference);

    let read_concern = ReadConcern::local();

    let write_concern = WriteConcern::builder().w(Acknowledgment::Majority).build();

    let client_options = ClientOptions::builder()
        .selection_criteria(selection_criteria)
        .read_concern(read_concern)
        .write_concern(write_concern)
        .build();

    let client = Client::with_options(client_options)?;
    // end-client-settings

    // start-client-settings-uri
    let uri = "<connection string>/?readPreference=secondary&readConcernLevel=local&w=majority";
    let client = Client::with_uri_str(uri).await?;
    // end-client-settings-uri

    // start-database-settings
    let read_preference = ReadPreference::PrimaryPreferred {
        options: Default::default(),
    };
    let selection_criteria = SelectionCriteria::ReadPreference(read_preference);

    let read_concern = ReadConcern::available();

    let write_concern = WriteConcern::majority();

    let database_options = DatabaseOptions::builder()
        .selection_criteria(selection_criteria)
        .read_concern(read_concern)
        .write_concern(write_concern)
        .build();

    let database = client.database_with_options("test_database", database_options);
    // end-database-settings

    // start-collection-settings
    let read_preference = ReadPreference::SecondaryPreferred {
        options: Default::default(),
    };
    let selection_criteria = SelectionCriteria::ReadPreference(read_preference);

    let read_concern = ReadConcern::available();

    let write_concern = WriteConcern::builder().w(0.into()).build();

    let collection_options = CollectionOptions::builder()
        .selection_criteria(selection_criteria)
        .read_concern(read_concern)
        .write_concern(write_concern)
        .build();

    let collection = database.collection_with_options("test_collection", collection_options);
    // end-collection-settings

    // start-retry-reads-writes
    let client_options = ClientOptions::builder()
        .retry_reads(false)
        .retry_writes(false)
        .build();

    let client = Client::with_options(client_options)?;
    // end-retry-reads-writes

    Ok(())
}
