#!/bin/sh

set -ex

if test -n "$1"; then
  exec "$@"
else
  make publish
fi
