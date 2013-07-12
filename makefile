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
setup:$(build-public) conf.py
	@mkdir -p $(output)
	@echo "[build]: creating required directories."
	@-bin/images-setup
	@echo "[build]: initialzed images if possible. (optional)"
publish:setup content migrations json-file-list
	@echo "[build]: ecosystem branch is succeessfully deployed to '$(public-output)/'."

# targets to generate output included in the build
$(build-public):
	@mkdir -p $@
$(public-output)/sitemap.xml.gz:$(public-output)
	@echo -e "----------\n[sitemap]: build started\: `date`" >> $(output)/sitemap-build.log
	@$(PYTHONBIN) bin/sitemap_gen.py --testing --config=conf-sitemap.xml 2>&1 >> $(output)/sitemap-build.log
	@echo [sitemap]: sitemap build complete at `date`.
	@echo "[sitemap]: build finished: `date`" >> $(output)/sitemap-build.log
$(public-output)/release.txt:$(public-output)
	@git rev-parse --verify HEAD >|$@
	@echo "[build]: generated'$@' with current release hash."
