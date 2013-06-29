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

############## generation steps for exceptional makefiles ##############

# The build targets and generation of images and intersphinx targets
# are irregular and derive from different data sources.

.PHONY:$(output)/makefile.meta
-include $(output)/makefile.meta
-include $(output)/makefile.images
-include $(output)/makefile.intersphinx

build/makefile.meta:$(tools)/makecloth/meta.py
	@mkdir -p $(output)
	@python $< $@
$(output)/makefile.intersphinx:$(tools)/makecloth/intersphinx.py $(tools)/makecloth/__init__.py
	@$(PYTHONBIN) $< $@
$(output)/makefile.images:$(tools)/makecloth/images.py source/images/metadata.yaml
	@$(PYTHONBIN) $< $@ source/images metadata.yaml

############# Meta targets that control the build and publication process. #############
.PHONY: setup source/about.txt source/includes/hash.rst $(public-branch-output)/release.txt
setup:source/includes/hash.rst meta.yaml
	@mkdir -p $(public-branch-output) $(public-output)
	@echo [build]: created $(public-branch-output) and $(public-output)
source/includes/hash.rst:
	@$(PYTHONBIN) $(tools)/rstcloth/hash.py $@
	@echo [build]: \(re\)generated $@.
$(public-branch-output)/release.txt:$(public-branch-output)
	@echo $(last-commit) >|$@
	@echo [build]: generated '$@' with current release hash.

# migrating and processing dirhtml and singlehtml content.
$(public-output)/ $(output):
	@mkdir -p $@
	@echo [build]: created $@
$(public-branch-output)/single/index.html:$(branch-output)/singlehtml/contents.html
	@fab process.input:$< process.output:$@ process.manual_single_html

# website display and configuration
htaccess:$(public-output)/.htaccess
$(public-output)/.htaccess:bin/builddata/htaccess.yaml $(tools)/bin/htaccess.py $(public-output)/
	@$(PYTHONBIN) $(tools)/bin/htaccess.py $@ --data $<
sitemap:$(branch-output)/sitemap.xml.gz
$(branch-output)/sitemap.xml.gz:$(public-branch-output) $(public-branch-output)/release.txt $(public-output)/manual $(error-pages) links
	@echo [sitemap]: building sitemap
	@echo -e "----------\n[sitemap]: build started\: `date`" >> $(branch-output)/sitemap-build.log
	@$(PYTHONBIN) $(tools)/bin/sitemap_gen.py --testing --config=conf-sitemap.xml 2>&1 >> $(branch-output)/sitemap-build.log
	@echo [sitemap]: sitemap build complete at `date`.
	@echo "[sitemap]: build finished: `date`" >> $(branch-output)/sitemap-build.log

############# General purpose targets. Not used (directly) in the production build #############
tags:
	@etags -I --language=none --regex=@bin/etags.regexp `find source -name "*.txt" | grep -v "\.#"`
	@sed $(SED_ARGS_FILE) 's/\.\. (.*):: \$$*(.*)/\1.\2/' TAGS
	@echo "[dev]: etags generation complete."
