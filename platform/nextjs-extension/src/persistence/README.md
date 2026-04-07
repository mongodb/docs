# Snooty Persistence Module

As part of integrating Snooty Parser with the unified Snooty toolchain, this module holds exclusive responsibility over transporting and persisting AST and metadata output artifacts from the parser into datastores.

Currently, this module supports persistence to Mongodb Atlas instances, and is also responsible for mutation of entries at persist time.
