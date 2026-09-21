- Downgrading requires that FCV was not raised, or was pinned before
  the original upgrade.
- A cluster can downgrade only to the immediately preceding
  release, either the previous major version or that major
  version's Feature Update release, and downgrades cannot be
  chained across multiple versions.
- A cluster on a Feature Update release can downgrade to its own
  major version.
- With very few exceptions, a downgrade lands on the latest patch
  release of the target version.
- After a downgrade, features introduced in the newer version are
  no longer available, and MongoDB does not support a second
  downgrade from the new, lower position.
