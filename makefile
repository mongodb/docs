# Makefile for MongoDB Sphinx documentation
MAKEFLAGS += -j -r --no-print-directory

# Build directory tweaking.
output = build
public-output =  $(output)/public

.PHONY: publish help clean push-dc1 push-dc2 setup
help:
	@echo "Please use \`make <target>' where <target> is a default sphinx target, or one of the following:"
	@echo "	 publish	runs publication process and then deploys the build to $(public-output)"
	@echo "	 push		runs publication process and pushes to docs site to production."
	@echo "	 pdfs		generates pdfs more efficently than latexpdf."

# Generated makefiles, and other generic makefile specification
include bin/makefile.compatibility
include bin/makefile.dynamic
include bin/makefile.push

publish:setup $(public-output) $(public-output)/release.txt $(public-output)/tutorials
	@echo "[build]: ecosystem branch is succeessfully deployed to '$(public-output)/'."

# Targets to support migration procedure
setup:
	@mkdir -p $(output)
	@echo "[build]: creating required directories."
	@bin/images-setup

## Build and migrate the HTML components of the build.
$(output)/dirhtml:dirhtml
	@touch $@
	@echo "[build]: touched $@ to ensure clean migration."
$(public-output):$(output)/dirhtml
	@mkdir -p $@
	@rsync -a $</ $@/
	@echo [build]: migrated '$<' to '$@'.

## Deployment related work for the non-Sphinx aspects of the build.
$(public-output)/release.txt:
	@git rev-parse --verify HEAD >|$@
	@echo "[build]: generated'$@' with current release hash."
$(public-output)/tutorial:$(public-output)
tutorials:$(public-output)/tutorial
	@ln -f -s tutorial $@
$(public-output)/tutorials:tutorials
	@mv $< $@

# Archiving $(public-output) and other hygene targets.
clean:
	-rm -rf $(output)/*

ARCHIVE_DATE := $(shell date +%s)2
archive:$(public-output).$(ARCHIVE_DATE).tar.gz
	@echo [archive]: $<
$(public-output).$(ARCHIVE_DATE).tar.gz:$(public-output)
	tar -czvf $@ $<
