MAKEFLAGS += -j -r --no-print-directory

############ path and build-meta configuration ##############
# The paths generated in makefile.meta will override the follwoing
# values, but we need to set the values once here to properly
# bootstrap the build system.

output = build
build-tools = bin
tools = $(output)/docs-tools

noop:
bootstrap fabfile build/docs-tools:
	@python bootstrap.py
	@echo "[bootstrap]: configured build environment."
help:
	@echo "Use 'make <target>', where <target> is a Sphinx target (e.g. 'html', 'latex')"
	@echo "See 'http://docs.mongodb.org/manual/meta' for more information."

-include $(output)/makefile.meta
