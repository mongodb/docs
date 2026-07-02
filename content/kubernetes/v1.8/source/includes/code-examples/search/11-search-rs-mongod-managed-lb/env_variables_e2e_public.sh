# E2E Test Environment - Public Configuration
#
# This file is used for public CI/CD testing.
# It sources the private environment without modifications.

source "$(dirname "${BASH_SOURCE[0]}")/env_variables_e2e_private.sh"
