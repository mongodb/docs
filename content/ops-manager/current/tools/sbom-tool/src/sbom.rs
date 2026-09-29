use std::collections::BTreeMap;

use serde::Deserialize;

#[derive(Clone, Debug, Deserialize)]
pub struct Sbom {
    pub components: Vec<Component>,
}

#[derive(Clone, Debug, Deserialize, PartialEq, Eq, PartialOrd, Ord)]
pub struct Component {
    pub name: Option<String>,
    pub copyright: Option<String>,
    #[serde(rename = "externalReferences")]
    pub external_references: Option<Vec<ExternalReference>>,
    pub licenses: Option<Vec<License>>,
}

#[derive(Clone, Debug, Deserialize, PartialEq, Eq, PartialOrd, Ord, Hash)]
#[serde(transparent)]
pub struct License {
    pub license_inner: BTreeMap<String, BTreeMap<String, String>>,
}

impl std::fmt::Display for License {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let out = self.license_inner.first_key_value().unwrap();
        let (_, out) = out;
        let out = out.first_key_value().unwrap();

        write!(f, "{}", out.1)
    }
}

#[derive(Clone, Debug, Deserialize, PartialEq, Eq, PartialOrd, Ord)]
pub struct ExternalReference {
    #[serde(rename = "type")]
    pub _type: ExternalReferenceType,
    pub url: String,
}

#[derive(Clone, Debug, Deserialize, PartialEq, Eq, PartialOrd, Ord)]
#[serde(rename = "type")]
pub enum ExternalReferenceType {
    #[serde(rename = "distribution")]
    Distribution,
    #[serde(rename = "distribution-intake")]
    DistributionIntake,
    #[serde(rename = "evidence")]
    Evidence,
    #[serde(rename = "other")]
    Other,
    #[serde(rename = "vcs")]
    Vcs,
    #[serde(rename = "website")]
    Website,
}
