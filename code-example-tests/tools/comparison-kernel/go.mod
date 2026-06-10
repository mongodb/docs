module github.com/mongodb/docs-examples/comparison-kernel

// Pinned to a specific patch so the cross-compiled binaries are
// byte-reproducible: the CI verify-comparison-kernel action installs
// exactly this Go version and fails the PR if any committed binary in
// bin/ differs from a fresh build.
go 1.24.4
