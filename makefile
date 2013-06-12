# Makefile for MongoDB Sphinx documentation
MAKEFLAGS += -j -r --no-print-directory
include bin/makefile.bootstrap

############# Meta targets that control the build and publication process. #############
.PHONY: setup source/about.txt source/includes/hash.rst $(public-branch-output)/release.txt

############# Targets that define the production build process #############
# Generating files with build specific info.
setup:source/includes/hash.rst composite-pages.yaml meta.yaml
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
	@cp $< $@
	@sed $(SED_ARGS_FILE) -e 's/href="contents.html/href="index.html/g' \
			      -e 's/name="robots" content="index"/name="robots" content="noindex"/g' \
			      -e 's/(href=")genindex.html"/\1..\/genindex\/"/g' $@
	@echo [single]: generating and processing '$@' page

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
	@echo "[dev]: etags generation complete."
