use std::sync::Arc;
use mongodb::{
    options::{SelectionCriteria, ServerAddress},
    sdam::public::ServerInfo,
};

//start-selection-criteria-enum
pub enum SelectionCriteria {
    ReadPreference(ReadPreference),
    Predicate(Predicate),
}
//end-selection-criteria-enum

//start-predicate
pub type Predicate = Arc<dyn Send + Sync + Fn(&ServerInfo) -> bool>;
//end-predicate

//start-localhost-predicate
let prefer_localhost = Arc::new(|server_info: &ServerInfo| {
    matches!(
        server_info.address(),
        ServerAddress::Tcp { host, .. } if host == "localhost"
    )
});
//end-localhost-predicate