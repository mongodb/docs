MAKEFLAGS += -j -r --no-print-directory

# The following content bootstraps the build system from the
# docs-tools repository: 
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

.PHONY:$(output)/makefile.meta
-include $(output)/makefile.meta

build/makefile.meta:$(tools)/makecloth/meta.py
	@mkdir -p $(output)
	@python $< $@

########### docs-ecosystem specific buildsystem#####################
include bin/makefile.push

.PHONY: publish content setup migrations
setup:
	@-bin/images-setup
	@echo "[build]: initialzed images if possible. (optional)"
