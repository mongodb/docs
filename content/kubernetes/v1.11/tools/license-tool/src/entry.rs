use std::fmt;

use serde::Deserialize;

// Each row in the csv will become an Entry.
#[derive(Clone, Debug, Deserialize)]
pub struct Entry {
    pub path: String,
    pub version: String,
    _license_url: String,
    pub license: String,
}

impl fmt::Display for Entry {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            f,
            "   * - :gopkg:`{} </{}>`\n     - {}\n",
            self.path, self.path, self.version
        )
    }
}
