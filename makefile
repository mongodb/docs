######### makefile set up, includes, and generation ###########
MAKEFLAGS += -r -j --no-print-directory
.DEFAULT_GOAL = all
output = build
build-tools = bin
tools = $(output)/docs-tools

include $(tools)/makefiles/makefile.compatibility
-include $(output)/makefile.meta
build/makefile.meta:$(output)/docs-tools/makecloth/meta.py
	@mkdir -p $(output)
	@$(PYTHONBIN) $< $@

noop:
$(output)/makefile.%:bin/makecloth/%.py bin/makecloth/%.yaml bin/makecloth/__init__.py $(output)
	@$(PYTHONBIN) $< $@

########## build system configuration and variables ##########

primary-branch = master
current-branch := $(shell git symbolic-ref HEAD 2>/dev/null | cut -d "/" -f "3" )
last-commit := $(shell git rev-parse --verify HEAD)
timestamp := $(shell date +%Y%m%d%H%M)

ifeq ($(EDITION),hosted)
build-type = hosted
conf-path = conf_base.py
branch-output = build/hosted/$(current-branch)
publish-output = build/public/hosted/$(current-branch)
public-output = build/public/hosted
publish-dependency = $(public-output)/current
build-meta += -t hosted
generate-source:
	@mkdir -p $(branch-output)/source
	@rsync --recursive --times --delete source/ $(branch-output)/source/
	@sed $(SED_ARGS_FILE) 's%   Backup </backup>%%' $(branch-output)/source/index.txt
	@sed $(SED_ARGS_FILE) 's%HOSTEDONLYINCLUDE%/monitoring/tutorial/install-monitoring-server%' $(branch-output)/source/monitoring/tutorial/set-up-mms.txt
	@sed $(SED_ARGS_FILE) 's%HOSTEDINCLUDE%:: %' $(branch-output)/source/monitoring/tutorial.txt
	@rm -rf $(branch-output)/source/backup.txt $(branch-output)/source/backup/
	@echo [sphinx-prep]: updated source in $(branch-output)/source
	@-notify-send "Sphinx" "Build in progress past critical phase."
	@echo [sphinx-prep]: INFO - Build in progress past critical phase.
else
build-type = saas
conf-path = conf_base.py
branch-output = build/saas
publish-output = build/public/saas
build-meta += -t saas
generate-source:
	@mkdir -p $(branch-output)/source/
	@rsync --recursive --times --delete source/ $(branch-output)/source
	@rm -f $(branch-output)/source/monitoring/tutorial/install-monitoring-server.txt
	@sed $(SED_ARGS_FILE) 's%HOSTEDONLYINCLUDE%%' $(branch-output)/source/monitoring/tutorial/set-up-mms.txt
	@echo [sphinx-prep]: updated source in $(branch-output)/source
	@-notify-send "Sphinx" "Build in progress past critical phase."
	@echo [sphinx-prep]: INFO - Build in progress past critical phase.
endif

########## interaction and control ##########
.PHONY: help hosted saas publish all
help:
	@echo "Please use \`make <target>' where <target> is one of:"
	@echo "	 all		to stage the all mms documents. (default.)"
	@echo "	 hosted		to stage the mms-hosted documents."
	@echo "	 saas		to stage the mms saas version documents."
	@echo "	 push		to stage and deploy all mmms documents."
	@echo "	 push-hosted	to stage and deploy mms-hosted documents."
	@echo "	 push-mms	to stage and deploy mms-saas documents."
	@echo "	 <sphinx>	all standard sphinx build targets are avlible for testing."

publish all:hosted saas
hosted:
	@$(MAKE) EDITION=$@ generate-source dirhtml _publish build/public/hosted/.htaccess
	@echo [build]: $@ edition complete
saas:setup
	@$(MAKE) EDITION=$@ generate-source dirhtml _publish build/public/saas/.htaccess
	@echo [build]: $@ edition complete
setup:
	@mkdir -p $(public-output) $(publish-output) $(branch-output) $(branch-output)/source 

########## dependency lists ##########

HTML_OUTPUT = $(publish-output)/ $(publish-output)/single/ $(publish-output)/single/genindex.html
PDF_OUTPUT = $(publish-output)/mms-manual.pdf
$(publish-output): $(HTML_OUTPUT) $(PDF_OUTPUT)
_publish:$(publish-output) $(publish-dependency)

########## html migration ##########
htaccess:build/public/saas/.htaccess build/public/hosted/.htaccess
build/public/saas/.htaccess:bin/htaccess-saas.yaml bin/htaccess.py
	@$(PYTHONBIN) $(tools)/bin/htaccess.py $@ --data $<
build/public/hosted/.htaccess:bin/htaccess-hosted.yaml bin/htaccess.py 
	@$(PYTHONBIN) $(tools)/bin/htaccess.py $@ --data $<

$(public-output) $(output):
	@mkdir -p $@
	@echo [build]: created $@
$(public-output)/current:$(public-output)
	@ln -s $(primary-branch)
	@mv $(primary-branch) $@
	@echo [build]: created and migrated $@
$(publish-output)/:$(branch-output)/dirhtml/
	@mkdir -p $@
	@echo [build]: created $@.
	@rsync -a $</ $@/
	@echo [build]: migrated $< into $@.
$(publish-output)/single/:$(branch-output)/singlehtml/
	@mkdir -p $@
	@echo [build]: created $@.
	@rsync -a $</ $@/
	@echo [build]: migrated $@
	@sed $(SED_ARGS_FILE) -e 's/id="searchbox"/id="display-none"/g' \
			      -e 's/id="editions"/id="display-none"/g' $(publish-output)/single/index.html
	@echo [build]: processed $@ content.
$(publish-output)/single/genindex.html:$(publish-output)/single/ $(branch-output)/dirhtml/
	@cp $(branch-output)/dirhtml/genindex/index.html $@
	@echo [build]: migrated $@
	@sed $(SED_ARGS_FILE) -e 's@(<dt><a href=").*html#@\1./index.html#@' \
			      -e 's@(class="toctree-l1"><a class="reference internal" href=")(.*).html@\1../\2.html@' \
			      -e 's/id="searchbox"/id="display-none"/g' \
			      -e 's/id="navigation"/id="display-none"/g' \
			      -e 's/id="editions"/id="display-none"/g' $@
	@echo [build]: processed $@ content.
$(branch-output)/dirhtml/genindex/index.html:$(branch-output)/dirhtml/
$(branch-output)/dirhtml/:dirhtml
$(branch-output)/singlehtml/:singlehtml

########## system #########################
clean:
	-rm -rf $(output)/*
