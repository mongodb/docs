When you initiate a restore job, {+service+} transfers the source
snapshot over the network using TLS to protect the data in
transit. Your cloud provider encrypts restored data at rest using its
standard encryption method. These protections apply to all restore
jobs, including cross-cloud restores (for example, restoring a
snapshot of an {+aws+} cluster to a {+gcp+} cluster).
